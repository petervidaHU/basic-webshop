import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productListReducer,
  productDeleteReducer,
} from './reducers/productReducers';
import { categoryListReducer } from './reducers/categoryReducers';
import { cartReducer } from './reducers/cartReducers';
import {
  userRegisterReducer,
  userLoginReducer,
  userUpdateReducer,
  userDetailsReducer,
  userListReducer,
} from './reducers/userReducers';
import { addressSaveReducer } from './reducers/addressReducers';
import {
  orderCreateReducer,
  orderListMyReducer,
  orderListReducer
} from './reducers/orderReducers';

const reducer = combineReducers({
  cart: cartReducer,
  newOrder: orderCreateReducer,
  orderList: orderListReducer,
  orderMylist: orderListMyReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userUpdate: userUpdateReducer,
  userDetails: userDetailsReducer,
  userList: userListReducer,
  productList: productListReducer,
  productDelete: productDeleteReducer,
  categoryList: categoryListReducer,
  addressSave: addressSaveReducer
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const usernameFromStorage = localStorage.getItem('username')
  ? JSON.parse(localStorage.getItem('username'))
  : null;

const tokenFromStorage = localStorage.getItem('token')
  ? JSON.parse(localStorage.getItem('token'))
  : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : null;

const billingAddressFromStorage = localStorage.getItem('billingAddress')
  ? JSON.parse(localStorage.getItem('billingAddress'))
  : null;

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : null;

const shippingMethodFromStorage = localStorage.getItem('shippingMethod')
  ? JSON.parse(localStorage.getItem('shippingMethod'))
  : null;

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    billingAddress: billingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
    shippingMethod: shippingMethodFromStorage
  },
  userLogin: {
    username: usernameFromStorage,
    token: tokenFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;