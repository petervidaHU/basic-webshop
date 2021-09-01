import axios from 'axios'
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_REMOVE_ALL,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_REMOVE_SHIPPING_ADDRESS,
    CART_REMOVE_BILLING_ADDRESS,
    CART_SAVE_BILLING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_METHOD,
} from '../actionTypes/cartActionTypes'

const ask = axios.create({
    baseURL: `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/products`
});

export const addToCart = (slug, quantity) => async (dispatch, getState) => {
    const { data } = await ask.get(`/${slug}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            id: data._id,
            name: data.name,
            //image: data.image,
            price: data.sale_price || regular_price,
            quantity,
        },
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeAllFromCart = (id) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ALL })

    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('billingAddress');
    localStorage.removeItem('paymentMethod');
    localStorage.removeItem('shippingMethod');
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const removeShippingAddress = () => (dispatch) => {
    dispatch({
        type: CART_REMOVE_SHIPPING_ADDRESS
    })

    localStorage.removeItem('shippingAddress')
}
export const removeBillingAddress = () => (dispatch) => {
    dispatch({
        type: CART_REMOVE_BILLING_ADDRESS
    })

    localStorage.removeItem('billingAddress')
}

export const saveBillingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_BILLING_ADDRESS,
        payload: data,
    })

    localStorage.setItem('billingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}

export const saveShippingMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_METHOD,
        payload: data,
    })

    localStorage.setItem('shippingMethod', JSON.stringify(data))
}
