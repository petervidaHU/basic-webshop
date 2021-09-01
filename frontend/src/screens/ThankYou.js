import React, { useEffect } from 'react'
import Layout from './../layout/layout';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { color, layout, flexbox, typography, space } from 'styled-system';
import { clearOrderAfterBuy } from '../store/actions/orderActions';

const ThankYou = ({ location }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clearOrderAfterBuy())
    }, [location])

    return (
        <Layout>
            <ThankYouReally
            mt={[10,20,40,60]}
            fontSize={[5,6,7]}
            color={'primary'}
            font={'heading'}
            >
            Köszönjük a vásárlást.
            </ThankYouReally>
            A rendelés száma: {location.state.orderId}
        </Layout>

    )
}

export default ThankYou;

const ThankYouReally = styled.div`
${color}
${layout}
${flexbox}
${space}
${typography}
width: 100vw;
`;