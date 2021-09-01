import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../layout/layout';
import styled from 'styled-components';
import { Card, Text } from 'rebass/styled-components';
import { useHistory } from 'react-router-dom';
import Forofor from './forofor';
import { Row } from './../theme/globalElements'
import { getMyDetails } from '../store/actions/userActions';
import { listMyOrders } from './../store/actions/orderActions';

const MyProfileScreen = () => {
    const dispatch = useDispatch();
    const userDetailsFromStore = useSelector((state) => state.userDetails);
    const { loading: loadinguser, error, user } = userDetailsFromStore;
    const myOrdersFromStore = useSelector((state) => state.orderMylist);
    console.log('myOrdersFromStore', myOrdersFromStore)
    const { loading: loadingMyOrders, error: errorMyOrders, orders } = myOrdersFromStore;

    useEffect(() => {
        try {
            dispatch(getMyDetails());
        } catch (err) {
            console.log(err);
        }
    }, []);

    useEffect(() => {
        try {
            dispatch(listMyOrders());
        } catch (err) {
            console.log(err);
        }
    }, []);

    const showMyOrders = (orders) => {
        if (orders.length < 1) {
            return null
        };
        return orders.map(order => (<>
            <p>rendelés azonosítója: {order._id}</p>
            <p>rendelés teljes összege: {order.totalPrice}</p>
            <p>rendelés szállítási mód: {order.shippingMethod}</p>
            <p>rendelés fizetési mód: {order.paymentMethod}</p>
            <p>rendelés fizetve: {order.isPaid}</p>
            <p>rendelés státusza: {order.status}</p>
            <hr />
        </>))
    }

    return (
        <Layout >
            <Row col>
                <h2>
                    Profilom
                </h2>
                {loadinguser ? (
                    <p>loading</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (<>
                    <div>név: {user.username}</div>
                    <div>email: {user.email}</div>
                </>
                )
                }

            </Row>
            <Row col>
                <h2>
                    rendeléseim
                </h2>
                {loadingMyOrders ? (
                    <p>loading</p>
                ) : errorMyOrders ? (
                    <p>{errorMyOrders}</p>
                ) : (<>
                    <div>rendelések száma: {orders.length}</div>
                    {showMyOrders(orders)}
                </>
                )
                }

            </Row>
        </Layout>
    )
};

export default MyProfileScreen
/*
 
*/