import {
    createAddressService,
    deleteAddressService,
    getAddressByIdService,
    updateAddressService
} from '../services/addressServices.js';

const createAddress = async (req, res, next) => {
    const values = req.body;

    try {
        const newAddress = await createAddressService(values);
        res.status(201).json(newAddress);
        
    } catch (err) {
         next(err);
    }
};

const deleteAddress = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deletedMessage = await deleteAddressService(id);
        res.status(201).json(deletedMessage);
    } catch (err) {
        res.status(404);
        next(err);
    }
};

const updateAddress = async (req, res, next) => {
    const { id, type } = req.params;
    const values = req.body;

    try {
        const updatedAddress = await updateAddressService(type, id, values);
        res.status(201).json(updatedAddress);
    } catch (err) {
        res.status(404);
        next(err);
    }
};

const getAddressById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const address = await getAddressByIdService(id);
        res.status(201).json(address);
    } catch (err) {
        res.status(404);
        next(err);
    }
};

export {
    createAddress,
    deleteAddress,
    getAddressById,
    updateAddress
}