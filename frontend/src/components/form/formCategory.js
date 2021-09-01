import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { MyTextInput } from './formikFields';
import { Button } from 'rebass/styled-components';
import { useState } from 'react';

const FormCategory = ({ initial, type, makeNewCategory, editOldCategory, changeValue, image, saveImage, config }) => {
    const [submitting, setSubmitting] = useState(false);

    return (
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
            })}

            onSubmit={async (values) => {
                setSubmitting(true);

                let uploadedImgeURL = null;

                if (image) {
                    uploadedImgeURL = await saveImage(image, 'category', config);
                };

                if (uploadedImgeURL) {
                    values.image = uploadedImgeURL;
                }

                if (type === 'new') {
                    await makeNewCategory(values);
                } else {
                    await editOldCategory(values)
                }

                setSubmitting(false);
            }}
        >
            <Form>
                <MyTextInput
                    label="Kategória neve"
                    name="name"
                    type="text"
                    placeholder="kat neve"
                />

                <MyTextInput
                    label="Slug"
                    name="slug"
                    type="text"
                    placeholder="..."
                />

                <MyTextInput
                    label="Description"
                    name="description"
                    type="text"
                    placeholder="long description"
                />

                <MyTextInput
                    label="image"
                    name="image3"
                    type="file"
                    onChange={(e) => {
                        changeValue(e);
                    }}
                    accept="image/*"

                />

                <Button
                    disabled={submitting ? true : false}
                    variant={submitting ? 'disabled' : 'primary'}
                    type="submit"
                >Ment</Button>
            </Form>
        </Formik>
    );
};

export default FormCategory;