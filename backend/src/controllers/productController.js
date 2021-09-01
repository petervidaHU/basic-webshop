import asyncHandler from 'express-async-handler';
import {
    createProductService,
    deleteProductService,
    updateProductService,
    getProductsService,
    getProductByIdService
} from '../services/productServices.js';

const createProduct = async (req, res, next) => {
    const values = req.body;
    
    try {
        const newProduct = await createProductService(values);
        res.json(newProduct);
    } catch (err) {
                res.status(400);
        next(err);
    }
};

const deleteProduct = async (req, res, next) => {
    const { id } = req.params;
    
    try {
        const deletedMessage = await deleteProductService(id);
        res.status(201).json(deletedMessage);
    } catch (err) {
        res.status(404);
        next(err);
    }
};

const updateProduct = asyncHandler(async (req, res, next) => {
    const values  = req.body;
    const { id } = req.params;
    
    try {
        const updatedProduct = await updateProductService(id, values);
        res.json(updatedProduct);
    } catch (err) {
        //next(err);
        }
});

const getProducts = async (req, res, next) => {
    const {
        category = null, order = 'name', to = '1', page = '0', 
    } = req.query;
 
    try {
        const products = await getProductsService(order, to, page, category);
        res.status(201).json(products);
    } catch (err) {
        res.status(404);
        next(err);
    }
};

const getProductById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const product = await getProductByIdService(id);
        res.status(201).json(product);
    } catch (err) {
        console.log('error: ', err);
        res.status(404);
        next(err);
    }
};

export {
    createProduct,
    deleteProduct,
    updateProduct,
    getProducts,
    getProductById
};