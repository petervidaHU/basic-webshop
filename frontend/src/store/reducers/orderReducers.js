import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_LIST_FAIL,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_REQUEST,
    ORDER_CLEAR,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,

} from '../actionTypes/orderActionTypes';

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return {
                loading: true,
            }
        case ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload,
            }
        case ORDER_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case ORDER_CLEAR:
            return {}
        default:
            return state
    }
}

export const orderListMyReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_LIST_MY_REQUEST:
            return {
                loading: true,
            }
        case ORDER_LIST_MY_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            }
        case ORDER_LIST_MY_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

export const orderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_LIST_REQUEST:
            return {
                loading: true,
            }
        case ORDER_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            }
        case ORDER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}
