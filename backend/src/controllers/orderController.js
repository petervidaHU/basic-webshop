import {
    addNewOrderService,
    getOrderByIdService,
    getMyOrdersService,
    getOrdersService,
    updateOrderService,
    deleteOrderService
} from './../services/orderServices.js';

const addNewOrder = async (req, res, next) => {
    const {
        cartItems,
        shippingAddress,
        billingAddress,
        paymentMethod,
        shippingMethod,
        user
    } = req.body;

    try {
        const newOrder = await addNewOrderService(
            cartItems, shippingAddress, paymentMethod, shippingMethod, user
        );
        res.json(newOrder);
    } catch (err) {
        res.status(400);
        next(err);
    }
};

const getOrders = async (req, res, next) => {
    try {
        const orders = await getOrdersService();
        res.json(orders);
    } catch (err) {
        res.status(400);
        next(err);
    }
};

const getMyOrders = async (req, res, next) => {
    const { id } = req.user;
    try {
        const orders = await getMyOrdersService(id);
        res.json(orders);
    } catch (err) {
        res.status(400);
        next(err);
    }
};

const getOrderById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const Order = await getOrderByIdService(id);
        res.json(Order);
    } catch (err) {
        res.status(400);
        next(err);
    }
};

const updateOrder = async (req, res, next) => {
    const { id } = req.body;
    const { values } = req.body

    try {
        const Order = await updateOrderService(id, values);
        res.json(Order);
    } catch (err) {
        res.status(400);
        next(err);
    }
};

const deleteOrder = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deletedMessage = await deleteOrderService(id);
        res.status(201).json(deletedMessage);
    } catch (err) {
        res.status(404);
        next(err);
    }
};

export {
    addNewOrder,
    getOrderById,
    getMyOrders,
    getOrders,
    updateOrder,
    deleteOrder
}