import express from 'express';
import tokenCheck from '../middlewares/tokenCheck.js';
import roleCheck from '../middlewares/roleCheck.js';
import {
    createProduct,
    deleteProduct,
    updateProduct,
    getProducts,
    getProductById
} from '../controllers/productController.js';
import cors from 'cors';
import { corsOptions } from './corsConfig.js';

const router = express.Router();
router.use(cors());
//router.use(cors(corsOptions));

router.route('/')
    .get(getProducts)
    .post(tokenCheck, roleCheck, createProduct);

router.route('/:id')
    .get(getProductById)
    .delete(tokenCheck, roleCheck, deleteProduct)
    .put((tokenCheck, roleCheck, updateProduct));

export default router;