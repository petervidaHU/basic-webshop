import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { responseError } from './../../../components/responseError';
import FormCategory from './../../../components/form/formCategory';
import { useToken } from './../../components/hooks/useToken';
import { submitPic } from './../../../components/form/submitPic';

const EditCategories = ({ match }) => {
    const config = useToken();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [initial, setInitial] = useState({
        name: '',
        slug: '',
        description: '',
    });
    const [message, setMessage] = useState(null)
    const [uploadFile, setUploadFile] = useState(null)

    useEffect(() => {
        (async () => {
            if (match.params.id !== 'newcategory') {
                try {
                    const { data } = await axios.get(`
                    http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/categories/${match.params.id}`, config);

                    setInitial({
                        name: data.name,
                        slug: data.slug,
                        description: data.description
                    })
                    setLoading(false);
                } catch (error) {
                    setError(responseError(error));
                };
            } else {
                setLoading(false)
            }
        })();
    }, [match, message]);

    const makeNewCategory = async (values) => {
        try {
            const data = await axios.post(
                `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/categories/`,
                values,
                config
            );
            if (data.status === 200 || 201) {
                setMessage('a kategória elmentve');
                return data;
            }
        } catch (error) {
            setMessage(responseError(error));
        }

    };

    const editOldCategory = async (values) => {
        try {
            const data = await axios.put(
                `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/categories/${match.params.id}`,
                values,
                config
            );
            if (data.status === 200 || 201) {
                setMessage('a kategória elmentve');
            }
        } catch (error) {
            setMessage(responseError(error));
        }
    };

     const changeOfFileInput = (e) => {

        if (!e.target.files) { return }
        const file = e.target.files[0];
console.log('target',process.env)
        if (!file.type.startsWith('image/')) {
            return;
        }

        if (file.size > 2000000) {
            return;
        }

        setUploadFile(e.target.files[0])
    };
 
    return (
        <div>
            <h2>{match.params.id === 'newcategory' ? 'Új kategória' : 'kategória módosítása'}</h2>
            {loading ? (
                <p>loading</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <FormCategory
                    config={config}
                    changeValue={changeOfFileInput}
                    image={uploadFile}
                    saveImage={submitPic}
                    makeNewCategory={makeNewCategory}
                    editOldCategory={editOldCategory}
                    initial={initial}
                    type={match.params.id === 'newcategory' ? 'new' : 'update'}
                />
            )}
            <div>{message}</div>
            <div>
            </div>
        </div>
    )
};


export default EditCategories
