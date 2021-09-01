import axios from 'axios';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FAIL,
} from '../actionTypes/productActionTypes';

const ask = axios.create({
  baseURL: `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/products`
});

export const listProducts = (
  category = '', keyword = '', pageNumber = '', order = '', to = ''
) => async (
  dispatch
) => {
    
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST })

      const { data } = await ask.get(
        `?keyword=${keyword}`
        + `&category=${category}`
        + `&pageNumber=${pageNumber}`
        + `&order=${order}&to=${to}`);

      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    })

    const {
      userLogin: { token },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    await axios.delete(`/api/products/${slug}`, config)

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
      dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: message,
    })
  }
}
