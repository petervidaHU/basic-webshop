import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Row } from '../theme/globalElements';
import Layout from './../layout/layout';
import { Button } from 'rebass/styled-components';
import { newOrder } from './../store/actions/orderActions';
//import { getUserDetails } from '../store/actions/userActions';
import UserCheck from '../components/userCheck';
import ShippingHandler from '../components/ShippingHandler';
import BillingHandler from '../components/BillingHandler';
import PaymentHandler from '../components/PaymentHandler';
import CartBeforeOrder from '../components/CartBeforeOrder';

const OrderScreen = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [orderOK, setOrderOK] = useState(false)
    const userFromStore = useSelector((state) => state.userLogin);
    const { username } = userFromStore;
    const cartFromStore = useSelector((state) => state.cart);
    const { shippingAddress, paymentMethod, billingAddress, shippingMethod } = cartFromStore;
    const newOrderFromStore = useSelector((state) => state.newOrder)
    const { order, success, loading, error } = newOrderFromStore

    /*     useEffect(() => {
            dispatch(getUserDetails());
        }, [username])
     */

    useEffect(() => {
        setOrderOK(
            username
            && shippingMethod
            && shippingAddress
            && billingAddress
            && paymentMethod
        );
    }, [username, shippingAddress, paymentMethod, shippingMethod, billingAddress])

    useEffect(() => {
        if (order !== undefined) {
            history.push('/thank_you', { orderId: order });
        }
    }, [order, success])

    const handleOrder = () => {
        //const cartToOrder = { ...cartFromStore }
        console.log('neworder:',cartFromStore)
        dispatch(newOrder({ ...cartFromStore }));
    };

    return (
        <Layout>
            <Row col>
                <Header confirmed={username !== null}>
                    Vásárló
                </Header>
                <UserCheck />
            </Row>
            <hr />

            <Row col>
                <Header confirmed={shippingMethod}>
                    Szállítás
                </Header>
                {username && <ShippingHandler />}
            </Row>
            <hr />
            <Row col>
                <Header confirmed={billingAddress}>
                    Számlázási cím
                </Header>
                {username && <BillingHandler />}
            </Row>
            <hr />

            <Row col>
                <Header confirmed={paymentMethod !== null}>
                    Fizetés
                </Header>
                {username && <PaymentHandler />}

            </Row>
            <hr />

            <Row col>
                <CartBeforeOrder />
            </Row>

            <Row>
                <Button
                    variant={orderOK ? 'primary' : 'disabled'}
                    disabled={orderOK ? false : true}
                    onClick={handleOrder}
                >
                    Megrendelés véglegesítése
                </Button>
            </Row>
            <Row>
                {loading ? (
                    <p>loading</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <></>
                )
                }
            </Row>
        </Layout>
    )
}

export default OrderScreen

const Header = styled.h3`
background-color: ${({ confirmed }) => confirmed ? 'lightgreen' : 'lightgray'}
`;
