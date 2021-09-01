import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../layout/layout';
import { listProducts } from './../store/actions/productActions';
import styled from 'styled-components';
import { Card, Text } from 'rebass/styled-components';
import { useHistory } from 'react-router-dom';
import Forofor from './forofor';
import { Row } from './../theme/globalElements'
import GoogleMap from './../components/map/googleMap';


const CategoryScreen = ({ match, location }) => {
    if (!location.state) return (<Forofor />)

    const dispatch = useDispatch();
    const history = useHistory();
    const { categoryName, categoryDesc, categorySlug, categoryId } = location.state;
    const productListFromState = useSelector((state) => state.productList);
    const { loading, error, products, page, pages } = productListFromState;
    const category = categoryId;

    useEffect(() => {
        try {
            dispatch(listProducts(category));
        } catch (err) {
            console.log(err);
        }

    }, [])

    const klikkHandler = (product) => {
        history.push({
            pathname: `${categorySlug}/${product.slug}`,
            state: { product: product }
        });
    }
    const klikk = (pr) => {
        console.log(pr)
    }

    return (
        <Layout >
            <Row id="row" col>
                <h2>
                    {categoryName}
                </h2>
                <div>
                    {categoryDesc}
                </div>
            </Row>
            <Row>
                {loading ? (
                    <p>loading</p>
                ) : error ? (
                    <p>error</p>
                ) : (<Cont id="cont">
                    {products.length > 0
                        ? products.map((product) => (
                            <Card key={product._id}
                                my={['1rem', '2rem', '2rem']}
                                width={[1, 1, 1 / 3, 1 / 4, 1 / 5]}
                                mx={[0, '1rem', '2rem', '2rem']}
                                onClick={klikkHandler.bind(null, product)}
                            >
                                <h3>{product.name}</h3>
                                <Text>{product.description}</Text>
                            </Card>
                        ))
                        : <p>Ebben a kategóriában nincs termék </p>}
                </Cont>)}
            </Row>
        </Layout>
    )
};

export default CategoryScreen

const Cont = styled.div`
display: inline-flex;
flex-wrap: wrap;
gap: 12px;
`;
