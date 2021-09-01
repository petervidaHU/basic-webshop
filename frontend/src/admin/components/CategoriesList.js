import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from 'rebass/styled-components';
import { listCategories } from '../../store/actions/categoryActions';
import AdminTable from './AdminTable';
import { useToken } from './../components/hooks/useToken';
import { useDeleteItem } from './hooks/usedeleteItem';

const CategoriesList = () => {
    const config = useToken();
    const dispatch = useDispatch();
    const history = useHistory();
    const [message, setMessage] = useState(false);
    const categoryList = useSelector((state) => state.categoryList);
    const { loading, error, categories } = categoryList;
    const [deleteConfirm, setDeleteConfirm] = useState(false)

    useEffect(() => {
        dispatch(listCategories())
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
    history.push(`/admin/categorieslist/${e.target.dataset.id}`);
};

const deleteHandler = async (e) => {
    const { data } = await useDeleteItem('categories', e.target.dataset.id, config)
    setDeleteConfirm(true)
    setMessage(data)
};

const headers = {
    name: "név",
    slug: "Slug",
};

return (
    <div>
        <h1>Kategóriák</h1>
        <Button onClick={() => history.push(`/admin/categorieslist/newcategory`)}>Új kategória</Button>
        {loading ? (
            <p>loading</p>
        ) : error ? (
            <p>{error}</p>
        ) : (
            <AdminTable
                headers={headers}
                body={categories}
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

export default CategoriesList
