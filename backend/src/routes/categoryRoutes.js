import express from 'express';
import tokenCheck from '../middlewares/tokenCheck.js';
import roleCheck from '../middlewares/roleCheck.js';
import {
  getCategories,
  createCategory,
  getCategoryById,
  deleteCategory,
  updateCategory
} from '../controllers/categoryController.js';
import cors from 'cors';

const router = express.Router();
router.use(cors());

router.route('/')
  .get(getCategories)
  .post(tokenCheck, roleCheck, createCategory);

router.route('/:id')
  .get(getCategoryById)
  .delete(tokenCheck, roleCheck, deleteCategory)
  .put((tokenCheck, roleCheck, updateCategory));

export default router;
