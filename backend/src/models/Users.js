/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UsersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    shippingAddress: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Address' 
            }],
    billingAddress: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Address' 
            }],
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    }
},
    {
        timestamps: true,
    }
);

UsersSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UsersSchema.methods.createToken = function () {
    return jwt.sign({
        id: this._id,
        username: this.username,
        isAdmin: this.isAdmin
    },
        process.env.SECRET_KEY,
        { expiresIn: process.env.SECRET_EXP });
};

UsersSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const Users = mongoose.model('Users', UsersSchema);

export default Users;
