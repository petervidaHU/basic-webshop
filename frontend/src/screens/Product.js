import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Box, Button } from 'rebass/styled-components';
import Layout from './../layout/layout';
import { Row } from '../theme/globalElements';
import QuantityCounter from './../components/form/QuantityCounter';
import { addToCart } from './../store/actions/cartActions';
import { color, layout, flexbox, typography, space } from 'styled-system';

const Product = ({ match, location }) => {
    const { categories,
        _id,
        description,
        images,
        name,
        regular_price,
        sale_price,
        short_description,
        slug,
        stock_status } = location.state.product;
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
    }, [match]);

    const quantitySetter = {
        increase() {
            setQuantity(prev => prev + 1)
        },
        decrease() {
            if (quantity > 1) setQuantity(prev => prev - 1)
        }
    }

    const toCartHandler = () => {
        dispatch(addToCart(_id, quantity));
        setQuantity(1);
    };

    return (
        <Layout>
            <RowProduct
                mt={[20, , 40, , 60]}
                display="flex"
                flexWrap="wrap"
                flexDirection={['column', 'row']}
            >
                <Box
                    bg="red"
                    width={[1, , , , .5, .3]}
                    height={350}
                    mr={[0,,,30]}
                >
                    image
                </Box>
                <MainDataContainer
                >
                    <h1> {name} </h1>
                    <div id="quantity">
                        <QuantityCounter setter={quantitySetter} quantity={quantity} />

                    </div>
                    <div id="prices">
                        <RegularPrice>{regular_price}</RegularPrice>
                        <SalePrice>{sale_price}</SalePrice>

                    </div>
                    <div id="buttons">
                        <Button mr={30}
                            onClick={toCartHandler}
                        >Kosárba</Button>

                    </div>
                </MainDataContainer>

            </RowProduct>
            <Row>
                <strong>Leírás</strong>
                <div>
                    {description}
                </div>

            </Row>
        </Layout>

    )
}

export default Product;

const RowProduct = styled.div`
max-width: 100vw;
${color}
${layout}
${flexbox}
${typography}
${space}
`;

const ImageContainer = styled.div`
`;

const RegularPrice = styled.div`
text-decoration: line-through;
`;

const SalePrice = styled.div`
color: red;
font-weight: bold;
`;

const MainDataContainer = styled.div`
`;

