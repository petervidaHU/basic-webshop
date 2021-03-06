import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_METHOD,
    CART_SAVE_BILLING_ADDRESS,
    CART_REMOVE_ALL,
    CART_REMOVE_BILLING_ADDRESS,
    CART_REMOVE_SHIPPING_ADDRESS
   } from './../actionTypes/cartActionTypes'

export const cartReducer = (
    state = { cartItems: [], shippingAddress: {}, billingAddress: {} },
    action
) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload

            const existItem = state.cartItems.find((prodInCart) => prodInCart.id === item.id)

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((prodInCart) =>
                        prodInCart.id === existItem.id ? item : prodInCart
                    ),
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((prodInCart) => prodInCart.id !== action.payload),
            }
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload,
            }
        case CART_REMOVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: {},
            }
        case CART_REMOVE_BILLING_ADDRESS:
            return {
                ...state,
                billingAddress: {},
            }
        case CART_SAVE_BILLING_ADDRESS:
            return {
                ...state,
                billingAddress: action.payload,
            }
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            }
        case CART_SAVE_SHIPPING_METHOD:
            return {
                ...state,
                shippingMethod: action.payload,
            }
        case CART_REMOVE_ALL:
            return {
                /* ...state, */
                cartItems: null,
            }
        default:
            return state
    }
}