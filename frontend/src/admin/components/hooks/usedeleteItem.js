import axios from 'axios';

export async function useDeleteItem(type, victimId,config) {
        if (window.confirm('Are you sure')) {
        let message = {};
        try {
            message = await axios.delete(
                `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/${type}/${victimId}`, config);

        } catch (err) {
            message.data = (err.message)
        }
        return message
    }
    return message.data = 'canceled'
};