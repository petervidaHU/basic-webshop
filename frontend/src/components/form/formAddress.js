import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { MyCheckbox, MySelect, MyTextInput } from './formikFields';
import { Button } from 'rebass/styled-components';
import { useState } from 'react';
import { saveAddress } from '../saveAddress';
import { useDispatch } from 'react-redux';


const FormAddress = ({ initial, toValues, editor }) => {
    const dispatch = useDispatch();
    const [submitting, setSubmitting] = useState(false)
    return (
        <>
            <Formik
                initialValues={initial ? initial : {}}

                validationSchema={Yup.object({
                    name: Yup.string()
                        .max(100, 'Must be 100 characters or less')
                        .min(5, 'Must be 5 characters or less')
                        .required('Required'),
                    company: Yup.string()
                        .max(50, 'Must be 50 characters or less')
                        .min(5, 'Must be 5 characters or less')
                        .required('Required'),
                    city: Yup.string()
                        .max(100, 'Must be 100 characters or less')
                        .min(1, 'Must be 5 characters or less')
                        .required('Required'),
                    address_1: Yup.string()
                        .max(100, 'Must be 100 characters or less')
                        .min(4, 'Must be 5 characters or less')
                        .required('Required'),
                    address_2: Yup.string()
                        .max(100, 'Must be 100 characters or less'),
                    postcode: Yup.number()
                        .min(4, 'minimum 4 karakter')
                        .required('Required'),
                    email: Yup.string()
                        .email(),
                    phone: Yup.string()
                        .min(6, 'legalább 6 karakter'),
                })}

                onSubmit={async (values) => {
                    setSubmitting(true);

                    toValues(values)
                    if (editor) { editor(false) };

                    setSubmitting(false);
                }}
            >
                <Form>
                    <MyTextInput
                        label="Név"
                        name="name"
                        type="text"
                        placeholder="product name"
                    />

                    <MyTextInput
                        label="Cég"
                        name="company"
                        type="text"
                        placeholder="cégnév (nem kötelező)"
                    />

                    <MyTextInput
                        label="Város"
                        name="city"
                        type="text"
                        placeholder="település"
                    />

                    <MyTextInput
                        label="Cím"
                        name="address_1"
                        type="text"
                        placeholder="lakcím"
                    />

                    <MyTextInput
                        label="Cím folytatás"
                        name="address_2"
                        type="text"
                        placeholder="lakcím folytatás "
                    />


                    <MyTextInput
                        label="Irányítószám"
                        name="postcode"
                        type="text"
                        placeholder="irányítószám"
                    />

                    <MyTextInput
                        label="Email cím"
                        name="email"
                        type="email"
                        placeholder="@"
                    />

                    <MyTextInput
                        label="Telefonszám"
                        name="phone"
                        type="text"
                        placeholder="halló?"
                    />

                    <Button
                        disabled={submitting ? true : false}
                        variant={submitting ? 'disabled' : 'primary'}
                        type="submit"
                    >Ment</Button>
                </Form>
            </Formik>
        </>
    );
};

export default FormAddress;