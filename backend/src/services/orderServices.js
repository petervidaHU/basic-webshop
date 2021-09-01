import Orders from './../models/Orders.js';
import { ValidationError, DatabaseError } from './errorClass.js';

const addNewOrderService = async (
    cartItems, shippingAddress, paymentMethod, shippingMethod, user
) => {
    const fields = {
        orderedItems: cartItems,
        shippingAddress,
        user,
        paymentMethod,
        shippingMethod
    };

    console.log('filed:', fields);
    if (fields.orderedItems?.length < 1) {
        throw new ValidationError('A kosár nem lehet üres!');
    }
    if (!fields.shippingAddress) {
        throw new ValidationError('A szállítási cím megadása kötelező!');
    }
    if (!user) {
        throw new ValidationError('A vásárló megadása kötelező!');
    }
    if (!paymentMethod) {
        throw new ValidationError('A fizetési mód megadása kötelező!');
    }
    if (!shippingMethod) {
        throw new ValidationError('A szállítási mód megadása kötelező!');
    }

    try {
        const newOrder = await Orders.create({ ...fields });
        return newOrder._id;
    } catch (err) {
        throw new DatabaseError('Adatbázis vagy belső szerver hiba');
    };
};

const getOrderByIdService = async (id) => {
    let order;
    try {
        order = await Orders.findById(id)
            .populate('shippingAddress',
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

    if (order) {
        return order;
    } else {
        throw new ValidationError('Ez a rendelés id nem létezik');
    }

};

const getMyOrdersService = async (id) => {
    console.log('icccd:',id)
    try {
        const orders = await Orders.find({ "user": id }).populate('user', 'username');
        return orders;
    } catch (err) {
        throw new DatabaseError('Adatbázis vagy belső szerver hiba');
    }
};

const getOrdersService = async () => {
    try {
        const orders = await Orders.find({}).populate('user', 'username ');
        return orders;
    } catch (err) {
        throw new DatabaseError('Adatbázis vagy belső szerver hiba');
    }
};

const updateOrderService = async (id, values) => {
    let order;
    try {
        order = await Orders.findById(id);
    } catch (err) {
        throw new DatabaseError('first Adatbázis vagy belső szerver hiba');
    }

    if (order) {
        const newfields = Object.keys(values);
        newfields.forEach((field) => {
            order[field] = values[field];
        });

        //validateCategory(category.name, category.slug)

        try {
            await order.save();
            return order;
        } catch (err) {
            throw new DatabaseError('Adatbázis vagy belső szerver hiba');
        }
    } else {
        throw new ValidationError('a rendelés nem létezik');
    }


};

const deleteOrderService = async (id) => {
    let order;
    try {
        order = await Orders.findById(id);
    } catch (err) {
        throw new DatabaseError('Adatbázis vagy belső szerver hiba');
    }

    if (order) {
        await order.remove();
        return ('a rendelés törölve');
    } else {
        throw new ValidationError('A rendelés nem létezik');
    }
};

export {
    addNewOrderService,
    getOrderByIdService,
    getMyOrdersService,
    getOrdersService,
    updateOrderService,
    deleteOrderService
}