import React, { useState, useEffect } from 'react';
import CartTable from './table/CartTable';
import { useSelector } from 'react-redux';
import { shippingPrices } from '../data/shippingPrices';

const CartBeforeOrder = () => {
    const [totalPrice, setTotalPrice] = useState(0);

    const cartFromStore = useSelector((state) => state.cart);
    const { cartItems, shippingMethod } = cartFromStore;

    useEffect(() => {
        setTotalPrice(cartItems.reduce((a, b) => {
            return a + (+b.price * b.quantity)
        }, 0));
    }, [cartItems])

    return (
        <>
            <h3> Termékek: </h3>
            <CartTable tableItems={cartItems} />
            <hr />
            <p>
                <strong>
                    A termékek ára:
                </strong>
                <span>
                    {' ' + totalPrice}
                </span>
            </p>
            {shippingMethod && (
                <p>
                    <strong>
                        A teljes fizetendő (postaköltségel együtt):
                    </strong>
                    <span>
                        {' '}{totalPrice + shippingPrices[shippingMethod]}
                    </span>
                </p>
            )}
        </>
    )
};

export default CartBeforeOrder;
