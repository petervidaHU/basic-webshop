import React, { useState, useEffect } from 'react';
import { Button } from 'rebass/styled-components';
import FormRegister from '../components/form/formRegister';
import { Row } from '../theme/globalElements';
import { responseError } from './../components/responseError';
import { useDispatch, useSelector } from 'react-redux';
import { register } from './../store/actions/userActions';
import { USER_REGISTER_CLEAR } from '../store/actionTypes/userActionTypes';

const AdminSettings = () => {
    const [newAdminFormOpen, setnewAdminFormOpen] = useState(false);
    const dispatch = useDispatch();
    const [message, setMessage] = useState(null)
    const userRegisterFromStore = useSelector((state) => state.userRegister);
    const { loading, error, username } = userRegisterFromStore;
   
    useEffect(() => {
        dispatch({type: USER_REGISTER_CLEAR})
    }, [])
    
    const handleNewAdmin = () => {
        setnewAdminFormOpen(true)
    };

    const makeNewUser = async (values) => {
        console.log(values)
        try {
            dispatch(register(values));
        } catch (error) {
            setMessage(responseError(error));
        }

    }

    return (<>
        <Row col>
            <h1>Admin beállítások </h1>
            <Button
                width={[1, 1, 1 / 6]}
                onClick={handleNewAdmin}
            >
                Új admin
            </Button>
        </Row>
        {newAdminFormOpen ? (
            <Row col>
                <FormRegister
                    makeNewUser={makeNewUser}
                    admin
                />
                {loading ? (
                    <p>loading</p>
                ) : error ? (
                    <p>{error}</p>
                ) : username ? (
                    <div>{username} regisztrálva </div>)
                : null}
            </Row>
        ) : null}
    </>
    )
}

export default AdminSettings
