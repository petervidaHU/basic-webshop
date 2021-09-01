import React, { useState } from 'react';
import { responseError } from '../responseError';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './../../store/actions/userActions';
import FormLogin from './formLogin';

const Login = () => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState(null);
    const userLoginFromState = useSelector((state) => state.userLogin);
    const { loading, error, username } = userLoginFromState;

    const loginHandler = async (values) => {
        // console.log(values)
        try {
            dispatch(login(values));
        } catch (error) {
            setMessage(responseError(error));
        }

    }

    return (
        <>
            <FormLogin loginHandler={loginHandler} />
            {loading ? (
                <p>loading</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>{username && 'belépve'} </div>
            )}
            <div>{message && message}</div>
        </>
    )
}

export default Login
