import axios from 'axios'
import jwt_decode from "jwt-decode";
import { CART_REMOVE_ALL } from '../actionTypes/cartActionTypes'
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_CLEAR
} from '../actionTypes/orderActionTypes';

const ask = axios.create({
  baseURL: `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/orders`
});

const config = {
  headers: {
    'Content-Type': 'application/json',
  }
};

export const newOrder = (cartToOrder) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    })

    const {
      userLogin: { token },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const { id } = jwt_decode(token);
    cartToOrder.user = id;

    const { data } = await ask.post(`/`, cartToOrder, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: CART_REMOVE_ALL,
      payload: data,
    });

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: message,
    });
  }
}

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    })

    const {
      userLogin: { token },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await ask.get(`/`, config)

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: message,
    })
  }
}

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    })

    const {
      userLogin: { token },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await ask.get(`/myorders`, config)

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message

    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload: message,
    })
  }
}

export const clearOrderAfterBuy = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CLEAR,
    })

    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('billingAddress')
    localStorage.removeItem('paymentMethod')
    localStorage.removeItem('shippingMethod')
    localStorage.removeItem('cartItems')

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message

  }
}