import mongoose from 'mongoose'
import Products from './../models/Products.js';

const OrderSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Users',
            },
        orderedItems: [
            {
                name: { type: String, required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Product',
                },
            },
        ],
        paymentMethod: {
            type: String,
            required: true,
        },
        shippingMethod: {
            type: String,
            required: true,
        },
        shippingAddress: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Address' 
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0,
        },
        isPaid: {
            type: Boolean,
            required: true,
            default: false,
        },
        status: {
            type: String,
            enum: ['new order',
                'waiting for pay',
                'processing',
                'shipped',
                'delivered',
                'problem',
                'need attention'],
            default: 'new order',
        },
    },

    {
        timestamps: true,
    }
);

OrderSchema.pre('save', async function (next) {
      this.totalPrice = await this.orderedItems.reduce(async (acc, item) => {
        const dd = await Products.findById(item.id);
        return await acc + +(dd.sale_price * item.quantity)
    }, 0)
    next()
});

const Orders = mongoose.model('Orders', OrderSchema)

export default Orders
