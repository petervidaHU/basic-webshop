import {
    ADDRESS_SAVE_REQUEST,
    ADDRESS_SAVE_SUCCESS,
    ADDRESS_SAVE_FAIL,
    CLEAR_SHIPPINGADDRESS_INPUT
} from './../actionTypes/addressActionTypes'

export const addressSaveReducer = (state = { address: null }, action) => {
    switch (action.type) {
        case CLEAR_SHIPPINGADDRESS_INPUT:
            return { address: null }
        case ADDRESS_SAVE_REQUEST:
            return { loading: true, address: null }
        case ADDRESS_SAVE_SUCCESS:
            return {
                loading: false,
                address: action.payload,
            }
        case ADDRESS_SAVE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
};