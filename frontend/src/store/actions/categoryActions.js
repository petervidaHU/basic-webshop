import axios from 'axios';
import {
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL,
} from '../actionTypes/categoriesActionTypes';

const ask = axios.create({
    baseURL: `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/categories`
    });



export const listCategories = (keyword = '', pageNumber = '') => async (
    dispatch
) => {
    try {
        dispatch({ type: CATEGORY_LIST_REQUEST })

        const { data } = await ask.get('');
       
        dispatch({
            type: CATEGORY_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: CATEGORY_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
};

