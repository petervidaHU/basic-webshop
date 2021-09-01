/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';

const ProductsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    short_description: {
        type: String,
        required: true,
    },
    regular_price: {
        type: Number,
        required: true,
    },
    sale_price: {
        type: Number,
        required: true,
    },
    stock_status: {
        type: String,
        enum: ['instock', 'outofstock'],
        default: 'instock',
    },
    categories: [String], 
    images: [String], 
    
});

const Products = mongoose.model('Products', ProductsSchema);

export default Products;
