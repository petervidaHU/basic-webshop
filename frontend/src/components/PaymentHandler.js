import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { savePaymentMethod } from './../store/actions/cartActions';

const PaymentHandler = () => {
    const dispatch = useDispatch();

    const cartFromStore = useSelector((state) => state.cart);
    const { paymentMethod } = cartFromStore;

    const paymentMethods = {
        null: (<></>),
        cash: (<p>Utánvétes fizetés</p>),
        card: (<p>Kérlek menj el a legközelebbi bankautomatába,
            vegyél ki készpénzt, rakd be egy borítékba,
            és küld el nekünk, vagy hozd el személyesen.</p>)
    };

    const handleRadioPayment = (e) => {
        dispatch(savePaymentMethod(e.target.value))
    };
    return (
        <>
            <label htmlFor="cash">
                <input
                    name="payment"
                    id="cash"
                    type="radio"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={handleRadioPayment}
                />
                Utánvétes fizetés
            </label>
            <label htmlFor="card">
                <input
                    name="payment"
                    id="card"
                    type="radio"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={handleRadioPayment}
                />
                Kártyás fizetés
            </label>
            {paymentMethods[paymentMethod]}
        </>
    )
};

export default PaymentHandler;
