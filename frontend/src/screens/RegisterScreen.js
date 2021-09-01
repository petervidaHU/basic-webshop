import React, {useState, useEffect} from 'react'
import FormRegister from '../components/form/formRegister';
import Layout from './../layout/layout';
import { responseError } from './../components/responseError';
import { useDispatch, useSelector } from 'react-redux';
import { register } from './../store/actions/userActions';
import { USER_REGISTER_CLEAR } from '../store/actionTypes/userActionTypes';

const RegisterScreen = () => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState(null)
    const userRegisterFromState = useSelector((state) => state.userRegister);
    const { loading, error, username } = userRegisterFromState;

    useEffect(() => {
        dispatch({type: USER_REGISTER_CLEAR})
    }, [])

    const makeNewUser = async (values) => {
    try {
        dispatch(register(values));
    } catch (error) {
        setMessage(responseError(error));
    }
   
}
    return (
        <Layout>
            <h2>Regisztráció</h2>
            <FormRegister makeNewUser={makeNewUser}/>
            {loading ? (
                <p>loading</p>
            ) : error ? (
                <p>{error}{" - "}{message}</p>
            ) : username ? (
                <div>{username} regisztrálva és belépve</div>)
            : null}
        </Layout>
    )
}

export default RegisterScreen
