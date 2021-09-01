import express from 'express';
import tokenCheck from '../middlewares/tokenCheck.js';
import roleCheck from '../middlewares/roleCheck.js';
import {
    createAddress,
    deleteAddress,
    getAddressById,
    updateAddress
} from '../controllers/addressController.js';
import cors from 'cors';

const router = express.Router();
router.use(cors());

router.route('/')
    .post(/*tokenCheck, roleCheck, */createAddress);

router.route('/:id')
    .get(/*tokenCheck, roleCheck,*/ getAddressById)
    .delete(tokenCheck, roleCheck, deleteAddress)

router.route('/:type/:id')
    .put(tokenCheck, roleCheck, updateAddress);

export default router;
