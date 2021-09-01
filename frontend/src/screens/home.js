import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { color, layout, flexbox } from 'styled-system';
import Layout from '../layout/layout';
import { Row } from '../theme/globalElements';

const Home = () => {
    return (
        <Layout>
            <Row>
                <Link to="/sample">A layout elemek bemutatása</Link>
            </Row>
            
        </Layout>
    )
}

const Box = styled.div`
${color}
${layout}
${flexbox}
`;

const Flex = styled.div`
display: flex;
height: 100vh;
${flexbox}
`;
export default Home
