import axios from 'axios';
import {
    ADDRESS_SAVE_REQUEST,
    ADDRESS_SAVE_SUCCESS,
    ADDRESS_SAVE_FAIL
} from '../actionTypes/addressActionTypes';

const ask = axios.create({
    baseURL: `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/address`
});

const config = {
    headers: {
        'Content-Type': 'application/json',
    }
};

export const saveNewAddress = (values) => async (dispatch) => {
    try {
        dispatch({
            type: ADDRESS_SAVE_REQUEST,
        })

        const { data } = await ask.post(
            '/',
            values,
            config
        )

        dispatch({
            type: ADDRESS_SAVE_SUCCESS,
            payload: data,
        })

       
    } catch (error) {
        dispatch({
            type: ADDRESS_SAVE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
};
