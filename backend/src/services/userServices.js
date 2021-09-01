import Users from './../models/Users.js';
import { ValidationError, DatabaseError } from './errorClass.js';

const registerUserService = async (username, email, password, isAdmin) => {
    if (!username) {
        throw new ValidationError('A felhasználónév megadása kötelező');
    }
    if (!email) {
        throw new ValidationError('Az emailcím megadása kötelező');
    }
    if (!password) {
        throw new ValidationError('Jelszó megadása kötelező');
    }
    if (password === password.toUpperCase() || password === password.toLowerCase()) {
        throw new ValidationError('A jelszóban kis- és nagybetű is legyen!');
    }

    let alreadyExist;

    try {
        alreadyExist = await Users.findOne({ email });
    } catch (err) {
        throw new DatabaseError('Adatbázis vagy belső szerver hiba');
    }

    if (alreadyExist !== null) {
        throw new ValidationError('A felhasználó már létezik');
    }

    try {
        const newUser = await Users.create({
            username, email, password, isAdmin
        });
        const token = await newUser.createToken();
        return { token, username };
    } catch (err) {
        throw new DatabaseError('Adatbázis vagy belső szerver hiba');
    }
};

const getUsersService = async () => {
    try {
        const users = await Users.find({});
        return users;
    } catch (err) {
        throw new DatabaseError('Adatbázis vagy belső szerver hiba');
    }
};

const loginUserService = async (email, password) => {
    let userToLogin;
    try {
        userToLogin = await Users.findOne({ email }).select('+password');
    } catch (err) {
        throw new DatabaseError('Adatbázis vagy belső szerver hiba');
    }

    if (!userToLogin) throw new ValidationError('hibás emailcím');

    if ((await userToLogin.matchPassword(password))) {
        const token = userToLogin.createToken();
        const username = userToLogin.username;
        return { token, username };
    } else {
        throw new ValidationError('hibás jelszó');
    }
};

const updateUserService = async (id, values) => {
    let user;
    try {
        user = await Users.findById(id);
    } catch (err) {
        throw new DatabaseError('Adatbázis vagy belső szerver hiba');
    }

    if (user) {

        const newfields = Object.keys(values);
        newfields.forEach((field) => {
            if (field === 'shippingAddress' || field === 'billingAddress') {
                console.log('serv:', id, values[field])
                const temp = new Set(user[field]);
                temp.add(values[field]);
                user[field] = [...temp];
                console.log('user after', user)
            } else {
                user[field] = values[field];
            };
        });
        // console.log('user', user)
        try {
            await user.save();
            return user;
        } catch (err) {
            throw new DatabaseError(`A módosítás nem sikerült: ${err.message}`);
        }
    } else {
        throw new ValidationError('a felhasználó nem létezik');
    }
};

const deleteUserService = async (id) => {
    let user;
    try {
        user = await Users.findById(id);
    } catch (err) {
        throw new DatabaseError('Adatbázis vagy belső szerver hiba');
    }

    if (user) {
        await user.remove();
        return ('felhasználó törölve');
    } else {
        throw new ValidationError('a felhasználó nem létezik');
    }
};
const getUserByIdService = async (id) => {
    let user;
    console.log('iddd', id)
    try {
        user = await Users.findById(id)
            .populate('shippingAddress',
                ['name',
                    'city',
                    'company',
                    'address_1',
                    'address_2',
                    'postcode',
                    'email',
                    'phone'])
            .populate('billingAddress',
                ['name',
                    'city',
                    'company',
                    'address_1',
                    'address_2',
                    'postcode',
                    'email',
                    'phone']);
    } catch (err) {
        throw new DatabaseError('Adatbázis vagy belső szerver hiba');
    }

    if (user) {
        return user;
    } else {
        throw new ValidationError('a felhasználó nem létezik');
    }
};

export {
    registerUserService,
    getUsersService,
    loginUserService,
    updateUserService,
    deleteUserService,
    getUserByIdService,
};