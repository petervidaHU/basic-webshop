import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AdminTable from './AdminTable';
import { listUsers } from './../../store/actions/userActions';
import { useToken } from './../components/hooks/useToken';
import { useDeleteItem } from './hooks/usedeleteItem';

const UsersList = () => {
    const config = useToken();
    const dispatch = useDispatch();
    const history = useHistory();
    const [message, setMessage] = useState(null)
    const userListFromStore = useSelector((state) => state.userList);
    const { loading, error, users } = userListFromStore;
    const [deleteConfirm, setDeleteConfirm] = useState(false)

    useEffect(() => {
        dispatch(listUsers())
        if (deleteConfirm) {
            setDeleteConfirm(false)
        }

         if (message !== false) {
            setTimeout(() => {
                setMessage(false)
            }, 2000);
        } 
}, [deleteConfirm]);

    const orderHandler = (e) => {
        setOrderRule({
            order: e.target.parentNode.getAttribute('name'),
            to: e.target.getAttribute('name'),
        });
    };

    const editHandler = (e) => {
        history.push(`/admin/userslist/${e.target.dataset.id}`);
    };

    const deleteHandler = async (e) => {
        const { data } = await useDeleteItem('users', e.target.dataset.id, config)
        setDeleteConfirm(true)
        setMessage(data)
    };

    const headers = {
        _id: "id",
        username: "név",
        email: "email",
        admin: "isAdmin",
    };

    return (
        <div>
            <h1>Felhasználók</h1>

            {loading ? (
                <p>loading</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <AdminTable
                    headers={headers}
                    body={users}
                    orderHandler={orderHandler}
                    editHandler={editHandler}
                    deleteHandler={deleteHandler}
                />
            )
            }
            {message && message}
        </div>
    )
}

export default UsersList
