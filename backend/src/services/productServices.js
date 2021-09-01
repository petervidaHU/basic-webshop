import Products from './../models/Products.js';
import { ValidationError, DatabaseError } from './errorClass.js';

const createProductService = async (values) => {
    let alreadyExist;

    if (values.slug) {
        try {
            alreadyExist = await Products.findOne({ slug: values.slug });
        } catch (err) {
            throw new DatabaseError('Adatbázis vagy belső szerver hiba');
        }
    } else {
        throw new ValidationError('Slug megadása kötelező');
    };

    if (alreadyExist) {
        throw new ValidationError('ez a slug már létezik');
    };
    try {
        /*
        const product = new Products({
            name: 'Sample name',
            slug: '33333333333',
            regular_price: 0,
            sale_price: 0,
            image: ['/images/sample.jpg'],
            categories: ['Sample category'],
            stock_status: 'instock',
            description: 'Sample description',
            short_description: 'Sample description',
        })*/
        //newProduct = await product.save();

        const newProduct = await Products.create({ ...values });
        return newProduct;

    } catch (err) {
        throw new DatabaseError('Adatbázis vagy belső szerver hiba');
    }

};

const deleteProductService = async (id) => {
    let product;
    try {
        product = await Products.findById(id);
    } catch (err) {
        throw new DatabaseError('Adatbázis vagy belső szerver hiba');
    }

    if (product) {
        await product.remove();
        return ('a termék törölve');
    } else {
        throw new ValidationError('a termék nem létezik');
    }
};


const updateProductService = async (id, values) => {
    let product;
    try {
        product = await Products.findById(id);
    } catch (err) {
        throw new DatabaseError('Adatbázis vagy belső szerver hiba');
    }

    if (product) {
        product.name = values.name || product.name,
            product.slug = values.slug || product.slug,
            product.description = values.description || product.description,
            product.short_description = values.short_description || product.short_description,
            product.regular_price = values.regular_price || product.regular_price,
            product.sale_price = values.sale_price || product.sale_price,
            product.stock_status = values.stock_status || product.stock_status,
            product.categories = values.categories || product.categories,
            product.images = values.images || product.images

        try {
            const data = await product.save();
            return data;
        } catch (err) {
            throw new DatabaseError('Adatbázis vagy belső szerver hiba');
        }
        
        
    } else {
        throw new ValidationError(`A termék nem található`);
    };
};

const getProductsService = async (order, to, page, category) => {
    const filter = {};
    if (category) filter.categories = category;

    let product;

    try {
        product = await Products.find(filter);
    } catch (err) {
        throw new DatabaseError('Adatbázis vagy belső szerver hiba');
    }

    return product;
};

const getProductByIdService = async (id) => {

    let product;
    try {
        product = await Products.findById(id);
    } catch (err) {
        throw new DatabaseError('Adatbázis vagy belső szerver hiba');
    }

    if (product) {
        return product;
    } else {
        throw new ValidationError('A termék nem létezik');
    }
};

export {
    createProductService,
    deleteProductService,
    updateProductService,
    getProductsService,
    getProductByIdService
};