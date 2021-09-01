import Categories from './../models/Categories.js';
import { ValidationError, DatabaseError } from './errorClass.js';

const validateCategory = (name, slug) => {
    if (!name) {
        throw new ValidationError('Nincs név!');
    }
    if (!slug) {
        throw new ValidationError('Nincs slug!');
    }
}

const createCategoryService = async (newCategoryData) => {
    const { name, slug } = newCategoryData;

    validateCategory(name, slug)

    let alreadyExist;

    if (name) {
        alreadyExist = await Categories.findOne({ name: name });
    } else {
        throw new DatabaseError('Adatbázis vagy belső szerver hiba');
    };

    if (alreadyExist) {
        throw new ValidationError('Ez a ketegórianév már foglalt!');
    };

    if (slug) {
        alreadyExist = await Categories.findOne({ slug: slug });
    } else {
        throw new DatabaseError('Adatbázis vagy belső szerver hiba');
    };

    if (alreadyExist) {
        throw new ValidationError('Ez a slug már foglalt!');
    };

    let newCategory

    try {
        newCategory = await Categories.create({
            ...newCategoryData
        });
    } catch (err) {
        throw new DatabaseError('Adatbázis vagy belső szerver hiba');
    }

    return newCategory;
};

const deleteCategoryService = async (id) => {
    let category;
    try {
        category = await Categories.findById(id);
    } catch (err) {
        throw new DatabaseError('Adatbázis vagy belső szerver hiba');
    }
    if (category) {
        await category.remove();
        return ('a kategória törölve');
    } else {
        throw new ValidationError('a kategória nem létezik');
    }
};

const updateCategoryService = async (id, values) => {
    let category;
    try {
        category = await Categories.findById(id);
    } catch (err) {
        throw new DatabaseError('Adatbázis vagy belső szerver hiba');
    }

    if (category) {
        const newfields = Object.keys(values);
        newfields.forEach((field) => {
            category[field] = values[field];
        });

        validateCategory(category.name, category.slug)

        try {
            await category.save();
            return category;
        } catch (err) {
            throw new DatabaseError('Adatbázis vagy belső szerver hiba');
        }
    } else {
        throw new ValidationError('a kategória nem létezik');
    }
};

const getCategoriesService = async () => {
    try {
        const category = await Categories.find({});
        return category;
    } catch (err) {
        throw new DatabaseError('Adatbázis vagy belső szerver hiba');
    }
};

const getCategoryByIdService = async (id) => {
    let category;
    try {
        category = await Categories.findById(id);
    } catch (err) {
        throw new DatabaseError('Adatbázis vagy belső szerver hiba');
    }

    if (category) {
        return category;
    } else {
        throw new ValidationError('a kategória nem létezik');
    }
};

export {
    createCategoryService,
    deleteCategoryService,
    updateCategoryService,
    getCategoriesService,
    getCategoryByIdService
};