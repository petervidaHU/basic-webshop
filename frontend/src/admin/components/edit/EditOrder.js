import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { responseError } from './../../../components/responseError';
import { useToken } from './../../components/hooks/useToken';
import { Row } from '../../../theme/globalElements'
import { Button } from 'rebass/styled-components';

const EditOrder = ({ match }) => {
    const [message, setMessage] = useState(null);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState('');
    const [order, setorder] = useState(null);
    const [loading, setLoading] = useState(true);
    const config = useToken();

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`
                    http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/orders/${match.params.id}`, config);
                setorder(data)
                setLoading(false);
            } catch (error) {
                setError(responseError(error));
            };
            setMessage(null);
        }
        )();
    }, [match, message]);

    const handleChangeStatus = async (e) => {
        const body = {
            id: e.target.dataset.id,
            values: {
                status: status
            }
        };

        try {
            const { data } = await axios.put(`
                http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/orders/${match.params.id}`,
                body,
                config);
            setMessage('státusz frissítve')

        } catch (error) {
            setError(responseError(error));
        };
    }

    const showOrder = (order) => {
        if (!order._id) return <p>Valami hiba történt! </p>;
        console.log(status)
        return (<>
            <h2> A rendelés részletei</h2>
            <hr />
            <div>
                <p>státusz: {order.status} </p>
                <p>módosít:
                    <select value={status} onChange={(e) => { setStatus(e.target.value) }}>
                        {['válassz!',
                            'new order',
                            'waiting for pay',
                            'processing',
                            'shipped',
                            'delivered',
                            'problem',
                            'need attention']
                            .map(item => (<option key={item} value={item ? item : ''}>{item} </option>))}
                    </select>
                    <Button data-id={order._id} variable="primary" onClick={handleChangeStatus}>Módosít </Button>
                    {error && error}
                    {message && message}
                </p>
            </div>
            <hr />
            <div>
                <p>A rendelés azonosítója: {order._id}</p>
                <p>A rendelés ideje: {order.createdAt}</p>
                <p>Fizetési mód: {order.paymentMethod}</p>
                <p>Szállítási mód: {order.shippingMethod}</p>
            </div>
            <table>
                <thead>
                    <tr>
                        <td>id </td>
                        <td>name </td>
                        <td>price </td>
                        <td>quantity </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {order.orderedItems.map(item => (<>
                            <td>{item._id} </td>
                            <td>{item.name} </td>
                            <td>{item.price} Ft </td>
                            <td>{item.quantity}</td>
                        </>))}
                    </tr>
                </tbody>
            </table>
            <p>Fizetendő: {order.totalPrice} Ft</p>
            <p>Szállítási cím:  </p>
            <p>{Object.keys(order.shippingAddress).map(line => (
                <p> {line} - {order.shippingAddress[line]} </p>
            ))}  </p>
        </>)
    }
    console.log('order:', order);
    return (
        <Row>
            {loading
                ? <div>loading...</div>
                : showOrder(order)}

        </Row>
    )
}

export default EditOrder
