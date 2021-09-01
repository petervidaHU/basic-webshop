import {
    getCategoriesService,
    createCategoryService,
    getCategoryByIdService,
    deleteCategoryService,
    updateCategoryService
} from '../services/categoryServices.js';

const createCategory = async (req, res, next) => {
    const newCategoryData  = req.body;

    try {
        const newCategory = await createCategoryService(newCategoryData);
        res.status(201).json(newCategory);
    } catch (err) {
        //res.status(400);
        next(err);
    }
};

const deleteCategory = async (req, res, next) => {
    const id = req.params.id;

    try {
        const deletedMessage = await deleteCategoryService(id);
        res.status(201).json(deletedMessage);
    } catch (err) {
        res.status(404);
        next(err);
    }
};

const updateCategory = async (req, res, next) => {
    const values = req.body;
    const { id } = req.params;

    try {
        const updatedCategory = await updateCategoryService(id, values);
        res.status(201).json(updatedCategory);
    } catch (err) {
        res.status(404);
        next(err);
    }
};

const getCategories = async (req, res, next) => {

    try {
        const categories = await getCategoriesService();
        res.status(201).json(categories);
    } catch (err) {
        res.status(404);
        next(err);
    }
};

const getCategoryById = async (req, res, next) => {
    const id = req.params.id;

    try {
        const category = await getCategoryByIdService(id);
        res.status(201).json(category);
    } catch (err) {
        res.status(404);
        next(err);
    }
};

export {
    getCategories,
    createCategory,
    getCategoryById,
    deleteCategory,
    updateCategory
};