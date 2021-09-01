import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { MyCheckbox, MySelect, MyTextInput } from './formikFields';
import { Button } from 'rebass/styled-components';
import { useState } from 'react';

const FormUpdateUser = ({ initial, updateUser }) => {
    const [submitting, setSubmitting] = useState(false)
    return (
        <>
            <Formik
                initialValues={initial ? initial : {
                    username: '',
                    email: '',
                    password
                }}

                validationSchema={Yup.object({
                    username: Yup.string()
                        .max(110, 'Must be 110 characters or less')
                        .min(2, 'Must be 2 characters or less')
                        .required('Required'),
                    email: Yup.string()
                        .email()
                        .required('Required'),
                    password: Yup.string()
                    .required('Kérlek adj meg egy jelszót')
                    .matches(
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number"
                      ),                    
                })}
                
                onSubmit={async (values, {resetForm}) => {
                    setSubmitting(true);
                    await updateUser(values)
                    resetForm()
                    setSubmitting(false);
                }}
            >
                <Form>
                    <MyTextInput
                        label="Név"
                        name="username"
                        type="text"
                        placeholder="név"
                    />

                    <MyTextInput
                        label="Email"
                        name="email"
                        type="text"
                        placeholder="email@email.hu"
                    />

                    <MyTextInput
                        label="Jelszó"
                        name="password"
                        type="password"
                        placeholder="jelszó"
                    />
                   
                    <Button
                        disabled={submitting ? true : false}
                        variant={submitting ? 'disabled' : 'primary'}
                        type="submit"
                    >módosítás elmentése</Button>
                </Form>
            </Formik>
        </>
    );
};

export default FormUpdateUser;