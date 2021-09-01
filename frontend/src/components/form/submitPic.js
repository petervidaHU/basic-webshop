import { responseError } from './../responseError';
import axios from 'axios';

export const submitPic = async (image, type, config) => {
    const formData = new FormData();
    formData.append('file', image);

    try {
        const res = await axios.post(
            `${process.env.REACT_APP_BACKEND}api/images/?type=${type}`,
            formData,
            config
        );
        if (res.status === 200 || 201) {
            return res.data;
        }
    } catch (error) {
        return responseError(error);
    }
}