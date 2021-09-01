import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { MyCheckbox, MySelect, MyTextInput } from './formikFields';
import { Button } from 'rebass/styled-components';
import { useState } from 'react';

const FormLogin = ({ loginHandler }) => {
    const [submitting, setSubmitting] = useState(false)
    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}

                validationSchema={Yup.object({
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

                onSubmit={async (values, { resetForm }) => {
                    setSubmitting(true);
                    await loginHandler(values)
                    resetForm()
                    setSubmitting(false);
                }}
            >
                <Form>
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
                    >belépés</Button>
                </Form>
            </Formik>
        </>
    );
};

export default FormLogin;