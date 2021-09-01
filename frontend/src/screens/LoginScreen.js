import React from 'react'
import Layout from './../layout/layout';
import { Row } from '../theme/globalElements';
import LoginPage from '../components/form/LoginPage';

const LoginScreen = () => {



    return (
        <Layout>
            <Row col>
                <h2>Bejelentkezés</h2>
                <LoginPage />
            </Row>
            
        </Layout>
    )
}

export default LoginScreen
