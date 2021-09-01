import React, { useState, useEffect } from 'react';
import FormAddress from './../components/form/formAddress';
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetails, updateUser } from './../store/actions/userActions';
import { Button } from 'rebass/styled-components';
import {
    saveShippingAddress,
    removeShippingAddress,
    saveShippingMethod
} from '../store/actions/cartActions';
import { saveNewAddress } from './../store/actions/addressActions';
import styled from 'styled-components';
import { color, layout, flexbox } from 'styled-system';
import { CLEAR_SHIPPINGADDRESS_INPUT } from '../store/actionTypes/addressActionTypes';

const HomeDelivery = () => {
    const [submitted, setSubmitted] = useState(null)
    const dispatch = useDispatch();
    const [editAddress, setEditAddress] = useState(false)
    const [values, setValues] = useState(null)
    const userFromStore = useSelector((state) => state.userDetails);
    const { user } = userFromStore;
    const userUpdateFromStore = useSelector((state) => state.userUpdate);
    const { success } = userUpdateFromStore;
    const addressFromStore = useSelector(state => state.addressSave);
    const { address } = addressFromStore;

    useEffect(() => {
        dispatch(getUserDetails())
    }, [success]);

    useEffect(() => {
        if (values) {
            dispatch(saveNewAddress(values));
        };
    }, [values])

    useEffect(() => {
        if (address) {
            dispatch(updateUser({ shippingAddress: address._id }));
            dispatch({ type: CLEAR_SHIPPINGADDRESS_INPUT });
        };
    }, [address])

    const handleEdit = () => {
        setEditAddress(true)
        dispatch(removeShippingAddress());
        dispatch(saveShippingMethod(null));
    };

    const handleSubmit = (e) => {
        dispatch(saveShippingMethod('homedelivery'));
        dispatch(saveShippingAddress(e.target.dataset.id));
        setSubmitted(e.target.dataset.id)
    };
    console.log(user)
    return (
        <>
            {editAddress || user?.shippingAddress?.length < 1
                ? (<>
                    <h3> Szállítási cím  </h3>
                    <div>
                        <FormAddress
                            initial={null}
                            toValues={setValues}
                            editor={setEditAddress}

                        />
                    </div>
                </>
                ) : (<div>
                    A szállítási cím:
                    <AddressCardContainer
                        display="flex"
                        flexWrap='wrap'
                        alignContent='center'
                    >
                        {user.shippingAddress && user.shippingAddress.map(address => (
                            <AddressCard
                                isSubmit={submitted === address._id}
                                width={[1, 1, 1 / 2, 1 / 3, 1 / 5]}
                                justifyContent={['center', 'center', 'stretch']}
                                key={address._id}>
                                <p>név: {address.name}</p>
                                {address.company && (<p>cég: {address.company}</p>)}
                                <p>város: {address.city}</p>
                                <p>cím1: {address.address_1}</p>
                                {address.address_2 && (<p>cím2: {address.address_2}</p>)}
                                <p>ir szám: {address.postcode}</p>
                                <p>telefon: {address.phone}</p>
                                <p>email: {address.email}</p>
                                <Button
                                    data-id={address._id}
                                    onClick={handleSubmit}
                                    variant={submitted === address._id ? 'disabled' : 'primary'}
                                    disabled={submitted === address._id ? true : false}
                                >
                                    Ezt választom
                                </Button>
                            </AddressCard>
                        ))
                        }
                    </AddressCardContainer>

                    <Button onClick={handleEdit}>Módosítom / új címet adok meg</Button>
                </div>
                )}
        </>
    )
}

export default HomeDelivery;

const AddressCardContainer = styled.div`
  ${color}
  ${layout}
  ${flexbox}
`;

const AddressCard = styled.div`
  ${color}
  ${layout}
  ${flexbox}
  background-color: ${({ isSubmit }) => isSubmit ? 'lightgreen' : 'lightgrey'};
  padding: .4rem;
  margin: 1rem;
  font-size: 0.6rem;
  color:darkslategray;
  &:hover {
      background-color: lightsalmon;
  }
`;
