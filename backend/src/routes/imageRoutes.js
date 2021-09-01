import express from 'express';
import tokenCheck from '../middlewares/tokenCheck.js';
import roleCheck from '../middlewares/roleCheck.js';
import {
    uploadController
} from '../controllers/imageController.js';
import cors from 'cors';
// import imageOptimalize from '../middlewares/imageOptimalize.js'; 

const router = express.Router();
router.use(cors());

router.route('/')
    .post(tokenCheck, roleCheck, /*imageOptimalize, */uploadController);

export default router;