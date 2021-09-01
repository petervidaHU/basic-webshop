import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { listProducts } from '../../store/actions/productActions';

import { Box, Button } from 'rebass/styled-components';
import { layout } from 'styled-system';
import styled from 'styled-components';
import AdminTable from './AdminTable';
import { useDeleteItem } from './hooks/usedeleteItem';
import { useToken } from './../components/hooks/useToken';

const ProductList = () => {
    const config = useToken();
    const dispatch = useDispatch();
    const history = useHistory();
    const productsList = useSelector((state) => state.productList);
    const { loading, error, products } = productsList;
    const [message, setMessage] = useState(null)
    const [deleteConfirm, setDeleteConfirm] = useState(false)

    useEffect(() => {
        dispatch(listProducts())
        if (deleteConfirm) {
            setDeleteConfirm(false)
        }

         if (message !== false) {
            setTimeout(() => {
                setMessage(false)
            }, 2000);
        } 
}, [deleteConfirm]);

    const orderHandler = (e) => {
        setOrderRule({
            order: e.target.parentNode.getAttribute('name'),
            to: e.target.getAttribute('name'),
        });
    };

    const editHandler = (e) => {
        history.push(`/admin/productslist/${e.target.dataset.id}`);
    };

    const deleteHandler = async (e) => {
        const { data } = await useDeleteItem('products', e.target.dataset.id, config)
        setDeleteConfirm(true)
        setMessage(data)
    };

    const headers = {
        name: "név",
        slug: "Slug",
        regular_price: 'Alap ár',
        sale_price: "Akciós ár",
        stock_status: "Készlet"
    };

    return (
        <div>
            <h1>Termékek</h1>

            {loading ? (
                <p>loadig</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <Button onClick={() => history.push(`/admin/productslist/newproduct`)}>Új termék</Button>
                    <AdminTable
                        headers={headers}
                        body={products}
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

export default ProductList
