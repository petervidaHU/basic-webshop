import Address from './../models/Address.js';
import { ValidationError, DatabaseError } from './errorClass.js';

const validateAddress = (type = null, values) => {
     const {
        name,
        company,
        address_1,
        address_2,
        city,
        postcode,
        email,
        phone
    } = values;
 
    if (!name) {
        throw new ValidationError('Nincs név!');
    }
    if (!address_1) {
        throw new ValidationError('Nincs cím!');
    }
    if (!city) {
        throw new ValidationError('Nincs város!');
    }
    if (!postcode) {
        throw new ValidationError('Nincs irányítószám!');
    }
    if (type === 'shipping' && !email) {
        throw new ValidationError('Nincs emailcím!');
    }
    if (type === 'shipping' && !phone) {
        throw new ValidationError('Nincs telefonszám!');
    }
};

const getAddressFromDatabase = async (id) => {
    try {
        const address = await Address.findById(id);
        if (!address) {
            throw new ValidationError('a cím nem létezik');
        }
        return address;
    } catch (error) {
        throw new DatabaseError('Adatbázis vagy belső szerver hiba');
    }
};

const createAddressService = async (values) => {
   
    try {
        const newAddress = await Address.create({
            ...values
        });
        return newAddress;
    } catch (err) {
        throw new DatabaseError('Adatbázis vagy belső szerver hiba');
    }

};

const deleteAddressService = async (id) => {
    const address = await getAddressFromDatabase(id);
    address.remove();
    return ('a cím törölve');
};

const updateAddressService = async (type, id, values) => {
    
    let address = await getAddressFromDatabase(id);
    if (address) {
        const newfields = Object.keys(values);
        newfields.forEach((field) => {
            address[field] = values[field];
        });
        
        validateAddress(type, values)
        try {
            await address.save();
            return address;
        } catch (err) {
            throw new DatabaseError('Adatbázis vagy belső szerver hiba');
        }
    } else {
        throw new ValidationError('a cím nem létezik');
    }
};

const getAddressByIdService = async (id) => {
    return await getAddressFromDatabase(id)
};

export {
    createAddressService,
    deleteAddressService,
    getAddressByIdService,
    updateAddressService
};