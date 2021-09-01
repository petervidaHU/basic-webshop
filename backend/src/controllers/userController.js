import {
    registerUserService,
    getUsersService,
    loginUserService,
    updateUserService,
    deleteUserService,
    getUserByIdService,
} from '../services/userServices.js';

const registerUser = async (req, res, next) => {
    const { username, email, password, isAdmin } = req.body;
    try {
        const newUser = await registerUserService(username, email, password, isAdmin);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400);
        next(err);
    }

};

const getUsers = async (req, res, next) => {
    try {
        const users = await getUsersService();
        console.log('controllerben: ', users)
        res.status(201).json(users);
    } catch (err) {
        res.status(404);
        next(err);
    }

};

const loginUser = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const token = await loginUserService(email, password);
        res.status(201).json(token);
    } catch (err) {
        res.status(401);
        next(err);
    }

};

const updateUser = async (req, res, next) => {
    const { id } = req.params.id ? req.params : req.user;
console.log('cont: ',id)
console.log('cont: ',req.body)
    try {
        const updatedUser = await updateUserService(id, req.body);
        res.status(201).json(updatedUser);
    } catch (err) {
        res.status(404);
        next(err);
    }
};

const deleteUser = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deletedMessage = await deleteUserService(id);
        res.status(201).json(deletedMessage);
    } catch (err) {
        res.status(404);
        next(err);
    }
};

const getUserById = async (req, res, next) => {
    const { id } = req.params.id ? req.params : req.user;

    try {
        const user = await getUserByIdService(id);
        res.status(201).json(user);
    } catch (err) {
        res.status(404);
        next(err);
    }
};

export {
    registerUser,
    getUsers,
    loginUser,
    updateUser,
    deleteUser,
    getUserById,
}