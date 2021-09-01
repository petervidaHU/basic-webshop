import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MemoizedGoogleMap } from './map/googleMap';
import { shippingPrices } from '../data/shippingPrices'
import { saveShippingMethod } from './../store/actions/cartActions';
import HomeDelivery from './HomeDelivery';

const ShippingHandler = () => {
    const dispatch = useDispatch();
    const [shippingRadio, setShippingRadio] = useState('default');
    const cartFromStore = useSelector((state) => state.cart);
    const { shippingMethod } = cartFromStore;

    const shippingMethods = {
        default: (<></>),
        null: (<></>),
        MPL_automata: <MemoizedGoogleMap />,
        homedelivery: <HomeDelivery />
    };

    const handleRadioShipping = (e) => {
        shippingMethod && dispatch(saveShippingMethod(null))
        setShippingRadio(e.target.value)
    };

    return (<>
        <label htmlFor="homedelivery">
        <input
            name="shippingMethod"
            id="homedelivery"
            type="radio"
            value="homedelivery"
            checked={shippingRadio === 'homedelivery' || shippingMethod === 'homedelivery'}
            onChange={handleRadioShipping}
        />
        Házhoz szállítás - {shippingPrices.homedelivery} Ft
    </label>
    <label htmlFor="MPL_automata">
        <input
            name="shippingMethod"
            id="MPL_automata"
            type="radio"
            value="MPL_automata"
            checked={shippingRadio === 'MPL_automata' || shippingMethod === 'MPL_automata'}
            onChange={handleRadioShipping}
        />
        Postaautomata - {shippingPrices.MPL_automata} Ft
    </label>
    {shippingMethods[shippingRadio || shippingMethod]}
   </> )
}

export default ShippingHandler;
