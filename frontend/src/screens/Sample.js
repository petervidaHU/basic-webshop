import React from 'react'
import Layout from '../layout/layout'
import { Row } from '../theme/globalElements'

const ToLeft = () => (
    <div style={{ backgroundColor: 'red' }}>
        left sidebar
    </div>
);
const ToRight = () => (
    <div style={{ backgroundColor: 'pink', minWidth: '100%' }}>
        right sidebar
    </div>
);

const Sample = () => {
    return (
        <div>
            <Layout
                leftSide
                leftSideChildren={ToLeft}
                rightSide
                rightSideChildren={ToRight}
            >
                <Row
                    bg={['primary', 'accent', 'red', 'blue', 'green']}
                    height={'60%'}
                >
                    Ez egy hosszú sor, ami breakpontonként változtatja a szinét</Row>
            </Layout>
        </div>
    )
}

export default Sample
