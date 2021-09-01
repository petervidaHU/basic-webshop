import React, { useState, useEffect } from 'react';
import FormProduct from '../../../components/form/formProduct';
import axios from 'axios';
import { responseError } from './../../../components/responseError';
import { useToken } from './../../components/hooks/useToken';

const EditProduct = ({ match }) => {
    const config = useToken();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [initial, setInitial] = useState({
        name: '',
        slug: '',
        description: '',
        short_description: '',
        regular_price: '',
        sale_price: '',
        stock_status: '',
    });
    const [message, setMessage] = useState(null)

    useEffect(() => {
        (async () => {
            if (match.params.id !== 'newproduct') {
                try {
                    const { data } = await axios.get(`
                    http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/products/${match.params.id}`, config);
                    setInitial({
                        name: data.name,
                        slug: data.slug,
                        description: data.description,
                        short_description: data.short_description,
                        regular_price: data.regular_price,
                        sale_price: data.sale_price,
                        stock_status: data.stock_status,
                    })
                    setLoading(false);
                } catch (error) {
                    setError(responseError(error));
                };
            } else {
                setLoading(false)
            }
        })();
    }, [match, message]);

    const makeNewProduct = async (values) => {
        try {
            const data = await axios.post(
                `${process.env.REACT_APP_BACKEND}api/products`,
                values,
                config
            );
            if (data.status === 200 || 201) {
                setMessage('a termék elmentve');
            }
        } catch (error) {
            setMessage(responseError(error));
        }
    };

    const editOldProduct = async (values) => {
        try {
            const data = await axios.put(
                `${process.env.REACT_APP_BACKEND}${match.params.id}`,
                values,
                config
            );
            if (data.status === 200 || 201) {
                setMessage('a termék elmentve');
            }
        } catch (error) {
            setMessage(responseError(error));
        }
    };

    return (
        <div>
            <h2>{match.params.id === 'newproduct' ? 'Új termék' : 'Termék módosítása'}</h2>
            {loading ? (
                <p>loading</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <FormProduct
                    makeNewProduct={makeNewProduct}
                    editOldProduct={editOldProduct}
                    initial={initial}
                    type={match.params.id === 'newproduct' ? 'new' : 'update'}
                />
            )}
            <div>{message}</div>
        </div>
    )
};

export default EditProduct;
