import express from 'express';
import tokenCheck from '../middlewares/tokenCheck.js';
import roleCheck from '../middlewares/roleCheck.js';
import {
    registerUser,
    getUsers,
    loginUser,
    updateUser,
    deleteUser,
    getUserById,
} from '../controllers/userController.js';
import cors from 'cors';

const router = express.Router();
router.use(cors());

router.route('/')
    .post(registerUser)
    .get(tokenCheck, roleCheck, getUsers);

router.route('/login')
    .post(loginUser);

router.route('/myprofile')
    .get(tokenCheck,getUserById)
    .put(tokenCheck, updateUser);

router.route('/:id')
    .delete(tokenCheck, roleCheck, deleteUser)
    .get(getUserById)
    .put(tokenCheck, /*roleCheck,*/ updateUser);

export default router;