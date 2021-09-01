import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({
    deleted: {
        type: Boolean,
        default: false,
    },
    used: {
        type: Boolean,
        default: false,
    },
    name: {
        type: String,
        required: true,
    },
    company: String,
    address_1: {
        type: String,
        required: true,
    },
    address_2: String,
    city: {
        type: String,
        required: true,
    },
    postcode: {
        type: String,
        required: true,
    },
    email: String,
    phone: String,
},
    {
        timestamps: true,
    }
);

const Address = mongoose.model('Address', AddressSchema);

export default Address;
