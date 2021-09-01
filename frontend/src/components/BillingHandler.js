import React, { useState, useEffect } from 'react';
import FormAddress from './../components/form/formAddress';
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetails, updateUser } from './../store/actions/userActions';
import { Button } from 'rebass/styled-components';
import {
    saveBillingAddress,
    removeBillingAddress,
} from '../store/actions/cartActions';
import { saveNewAddress } from './../store/actions/addressActions';
import styled from 'styled-components';
import { color, layout, flexbox } from 'styled-system';
import { CLEAR_SHIPPINGADDRESS_INPUT } from '../store/actionTypes/addressActionTypes';

const BillingHandler = () => {
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
            dispatch(updateUser({ billingAddress: address._id }));
            dispatch({ type: CLEAR_SHIPPINGADDRESS_INPUT });
        };
    }, [address])

    const handleEdit = () => {
        setEditAddress(true)
        dispatch(removeBillingAddress());
    };

    const handleSubmit = (e) => {
        dispatch(saveBillingAddress(e.target.dataset.id));
        setSubmitted(e.target.dataset.id)
    };
    console.log('teszt',user.billingAddress)
    return (
        <>
            {editAddress || !user?.billingAddress
                ? (<>
                    <h3> Számlázási cím  </h3>
                    <div>
                        <FormAddress
                            initial={null}
                            toValues={setValues}
                            editor={setEditAddress}

                        />
                    </div>
                </>
                ) : (<div>
                    A számlázási cím:
                    <AddressCardContainer
                        display="flex"
                        flexWrap='wrap'
                        alignContent='center'
                    >
                        {user.billingAddress && user.billingAddress.map(address => (
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

export default BillingHandler;

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


/*
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'rebass/styled-components';
import FormAddress from './form/formAddress';

const BillingHandler = () => {
    const [values, setValues] = useState(null)
    const [editBillingAddress, setEditBillingAddress] = useState(false);
    const cartFromStore = useSelector((state) => state.cart);
    const { billingAddress } = cartFromStore;

    const handleEditBillingAddress = () => {
        setEditBillingAddress(true)
    };

    return (
        <>
            {!billingAddress?.name || editBillingAddress
                ? (
                    <div>
                        <FormAddress
                            editor={setEditBillingAddress}
                            toValues={setValues}
                        />
                    </div>
                ) : (
                    <div>
                        A számlázási cím:
                        {Object.keys(billingAddress).map(line => (
                            <p key={line.name}>
                                <strong>{line}: </strong>{billingAddress[line]}
                            </p>
                        ))}
                        <Button onClick={handleEditBillingAddress}>Módosítom</Button>
                    </div>
                )}
        </>
    )
};

export default BillingHandler;
*/