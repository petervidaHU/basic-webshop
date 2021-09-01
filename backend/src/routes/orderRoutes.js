import express from 'express';
import cors from 'cors';
import tokenCheck from '../middlewares/tokenCheck.js';
import roleCheck from '../middlewares/roleCheck.js';
import {
    addNewOrder,
    getOrders,
    deleteOrder,
    getMyOrders,
    getOrderById,
    updateOrder,
} from '../controllers/orderController.js'

const router = express.Router();
router.use(cors());

router.route('/')
    .post(tokenCheck, addNewOrder)
    .get(tokenCheck, roleCheck, getOrders)

router.route('/myorders')
    .get(tokenCheck, getMyOrders)
    
router.route('/:id')
    .get(tokenCheck, getOrderById)
    .delete(tokenCheck, roleCheck, deleteOrder)
    .put(tokenCheck, updateOrder)


export default router