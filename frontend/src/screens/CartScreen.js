import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'rebass/styled-components';
import { removeFromCart, removeAllFromCart } from '../store/actions/cartActions';
import { Row } from '../theme/globalElements';
import Layout from './../layout/layout';
import { useHistory } from 'react-router-dom';
import CartTable from '../components/table/CartTable';

const CartScreen = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);

    const handleDelete = (e) => {
        try {
            dispatch(removeFromCart(e.target.dataset.id))
        } catch (err) {
            console.log(err);
        }
    }

    const handleClearCart = () => {
        try {
            dispatch(removeAllFromCart())
        } catch (err) {
            console.log(err);
        }

    }

    const handleOrder = () => {
        history.push('/order')
    }

    return (
        <Layout>
            <Row first>
                <h1>Bevásárlókosarad</h1>
                <div>
                    {cartItems && cartItems.length > 0 ? (
                        <CartTable
                            editable
                            tableItems={cartItems}
                            handleDelete={handleDelete}
                        />
                    ) : <div>A kosár üres. Vásárolj!!</div>}
                </div>
            </Row>
            <Row>
                <Button
                    mx={2}
                    variant={'secondary'}
                    onClick={handleClearCart}>
                    lista törlése
                </Button>
                <Button
                    mx={2}
                    disabled={cartItems.length < 1 ? true : false}
                    variant={cartItems.length < 1 ? 'disabled' : 'primary'}
                    onClick={handleOrder}>
                    tovább a rendeléshez
                </Button>
            </Row>
            <Row>
            </Row>
        </Layout>
    )
}

export default CartScreen
