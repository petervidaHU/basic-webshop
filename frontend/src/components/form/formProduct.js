import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { MySelect, MyTextInput } from './formikFields';
import { Button } from 'rebass/styled-components';
import { useState } from 'react';
import { listCategories } from '../../store/actions/categoryActions';

const FormProduct = ({ initial, type, makeNewProduct, editOldProduct }) => {
    const dispatch = useDispatch();
    const categoryList = useSelector((state) => state.categoryList);
    const [submitting, setSubmitting] = useState(false)
    const { loading, error, categories } = categoryList;

    useEffect(() => {
        if (categories.length < 1) {
            dispatch(listCategories())
        }
    }, [])

    return (
        <>
            <Formik
                initialValues={initial}

                validationSchema={Yup.object({
                    name: Yup.string()
                        .max(100, 'Must be 100 characters or less')
                        .min(5, 'Must be 5 characters or less')
                        .lowercase()
                        .notOneOf(['admin', '/admin', 'admin/'], 'nem lehet a név admin')
                        .required('Required'),
                    slug: Yup.string()
                        .max(50, 'Must be 50 characters or less')
                        .min(5, 'Must be 5 characters or less')
                        .required('Required'),
                    description: Yup.string()
                        .max(1000, 'Must be 50 characters or less'),
                    short_description: Yup.string()
                        .max(200, 'Must be 200 characters or less'),
                    regular_price: Yup.number()
                        .min(0, 'minimum 0')
                        .required('Required'),
                    sale_price: Yup.number()
                        .min(0, 'minimum 0')
                        .required('Required'),
                    stock_status: Yup.string()
                        .required('Required')
                        .oneOf(['instock', 'outofstock'], 'required'),
                    categories: Yup.string()
                        .required('Required'),
                })}

                onSubmit={async (values) => {
                    setSubmitting(true);
                    console.log('formbol: ', values)
                    /* const {
                         userLogin: { userInfo },
                       } = getState()
                   */

                    if (type === 'new') {
                        await makeNewProduct(values);
                        //setSubmitting(false);
                    } else {
                        editOldProduct(values)
                    }
                    setSubmitting(false);
                }}
            >
                <Form>
                    <MyTextInput
                        label="Termék neve"
                        name="name"
                        type="text"
                        placeholder="product name"
                    />

                    <MyTextInput
                        label="Slug"
                        name="slug"
                        type="text"
                        placeholder="..."
                    />

                    <MyTextInput
                        label="Leírás"
                        name="description"
                        type="text"
                        placeholder="long description"
                    />

                    <MyTextInput
                        label="Rövid leírás"
                        name="short_description"
                        type="text"
                        placeholder="short description"
                    />

                    <MyTextInput
                        label="Ár"
                        name="regular_price"
                        type="number"
                        placeholder="0"
                    />

                    <MyTextInput
                        label="Akciós ár"
                        name="sale_price"
                        type="number"
                        placeholder="0"
                    />

                    <MySelect label="stock" name="stock_status">
                        <option value="">Stock status</option>
                        <option value="instock">In stock</option>
                        <option value="outofstock">Out of stock</option>
                    </MySelect>

                    <MySelect label="Kategória" name="categories">
                        <option value="">válassz</option>
                        {categories.map(cat => (
                            <option value={cat._id}>{cat.name}</option>

                        ))}
                    </MySelect>

                    <Button
                        disabled={submitting ? true : false}
                        variant={submitting ? 'disabled' : 'primary'}
                        type="submit"
                    >Submit</Button>
                </Form>
            </Formik>
        </>
    );
};

export default FormProduct;