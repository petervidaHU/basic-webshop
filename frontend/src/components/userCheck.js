import React, { useState } from 'react';
import FormRegister from '../components/form/formRegister';
import LoginPage from '../components/form/LoginPage';
import { useSelector, useDispatch } from 'react-redux';
import { register } from './../store/actions/userActions';
import { responseError } from './responseError';

const UserCheck = () => {
    const dispatch = useDispatch();
    const [handler, setHandler] = useState(null)
    const userFromStore = useSelector((state) => state.userLogin);
    const { username } = userFromStore;
    const [message, setMessage] = useState(null)

    const handleSwitch = (e) => {
        setHandler(e.target.dataset.value)
    };

    const makeNewUser = async (values) => {
        try {
            dispatch(register(values));
        } catch (error) {
            setMessage(responseError(error));
        }

    }

    return (<>
        {username
            ? <span> <strong>bejelentkezve: </strong>{username}</span>
            : (
                <>
                    <div>
                        A vásárláshoz be kell jelentkeznie, vagy regisztrálni az oldalon:
                    </div>
                    <div>
                        <span data-value="login" onClick={handleSwitch}>belépek</span>
                        <span data-value="regist" onClick={handleSwitch}>   regisztrálok</span>
                    </div>
                    {handler === "regist" ? <FormRegister makeNewUser={makeNewUser} /> : <LoginPage />}
                </>
            )}
        {message && message}
    </>)
};

export default UserCheck;
