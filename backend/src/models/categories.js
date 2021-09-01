/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';

const CategoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
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
});

const Categories = mongoose.model('Categories', CategoriesSchema);

export default Categories;
