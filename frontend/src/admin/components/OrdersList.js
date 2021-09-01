import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Button } from 'rebass/styled-components';
import { layout } from 'styled-system';
import styled from 'styled-components';
import AdminTable from './AdminTable';
import { listOrders } from '../../store/actions/orderActions';
import { useDeleteItem } from './hooks/usedeleteItem';
import { useToken } from './../components/hooks/useToken';

const OrdersList = () => {
    const config = useToken();
    const dispatch = useDispatch();
    const history = useHistory();
    const [message, setMessage] = useState(false)
    const ordrListFromStore = useSelector((state) => state.orderList);
    const { loading, error, orders } = ordrListFromStore;

    useEffect(() => {
        dispatch(listOrders())
      //  setConfirm(false);
    }, [message]);

    const orderHandler = (e) => {
        setOrderRule({
            order: e.target.parentNode.getAttribute('name'),
            to: e.target.getAttribute('name'),
        });
    };

    const editHandler = (e) => {
        history.push(`/admin/orderslist/${e.target.dataset.id}`);
    };

    const deleteHandler = async (e) => {
        const { data } = await useDeleteItem('orders', e.target.dataset.id, config)
        setMessage(data)
    };

    const headers = {
        _id: "id",
        user: "vásárló név",
        totalPrice: "végösszeg",
        status: "status",
    };

    return (
        <div>
            <h1>Rendelések</h1>

            {loading ? (
                <p>loadig</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <AdminTable
                        headers={headers}
                        body={orders}
                        orderHandler={orderHandler}
                        editHandler={editHandler}
                        deleteHandler={deleteHandler}
                    />
                </>
            )
            }
            {message && message}
        </div>
    )
};

export default OrdersList
