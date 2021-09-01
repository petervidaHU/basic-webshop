import axios from 'axios';
import jwt_decode from "jwt-decode";
import {
  CART_REMOVE_ALL,
} from '../actionTypes/cartActionTypes';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LIST_FAIL,
  USER_LIST_SUCCESS,
  USER_LIST_REQUEST,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from '../actionTypes/userActionTypes';

const ask = axios.create({
  baseURL: `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/users`
});

const config = {
  headers: {
    'Content-Type': 'application/json',
  }
};

export const register = ({ username, email, password, isAdmin }) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })

    const { data } = await ask.post(
      '/',
      { username, email, password, isAdmin },
      config
    )

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })

    if (!isAdmin) {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      })
    }

    localStorage.setItem('token', JSON.stringify(data.token))
    localStorage.setItem('username', JSON.stringify(data.username))

  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
};

export const login = ({ email, password }) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    const { data } = await ask.post(
      '/login',
      { email, password },
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('token', JSON.stringify(data.token))
    localStorage.setItem('username', JSON.stringify(data.username))

  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateUser = (valuesArray) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    })
    const {
      userLogin: { token },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const { id } = jwt_decode(token);
    const { data } = await ask.put(`/${id}`, valuesArray, config)

    dispatch({ type: USER_UPDATE_SUCCESS })

      } catch (error) {
    console.log(error)
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message

    dispatch({
      type: USER_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('username')
  localStorage.removeItem('token')
  localStorage.removeItem('shippingAddress')
  localStorage.removeItem('billingAddress')
  localStorage.removeItem('paymentMethod')
  localStorage.removeItem('shippingMethod')
  localStorage.removeItem('cartItems')

  dispatch({ type: CART_REMOVE_ALL })
  dispatch({ type: USER_LOGOUT })

  document.location.href = '/'
}

export const getUserDetails = (incomingId = null) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    })

    const {
      userLogin: { token },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const { id: idFromToken } = jwt_decode(token);
    const id = incomingId ? incomingId : idFromToken;

    const { data } = await ask.get(`/${id}`, config)

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    })

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message

    dispatch({
      type: USER_DETAILS_FAIL,
      payload: message,
    })
  }
}

export const getMyDetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    })

    const {
      userLogin: { token },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await ask.get(`/myprofile`, config)

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    })

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message

    dispatch({
      type: USER_DETAILS_FAIL,
      payload: message,
    })
  }
}

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
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
      type: USER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message

    dispatch({
      type: USER_LIST_FAIL,
      payload: message,
    })
  }
}