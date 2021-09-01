import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { responseError } from './../../../components/responseError';
import FormUpdateUser from './../../../components/form/formUpdateUser';
import FormAddress from './../../../components/form/formAddress';
import { useToken } from './../../components/hooks/useToken';

const EditUsers = ({ match }) => {
  const config = useToken();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [initial, setInitial] = useState({
    username: '',
    email: '',
    isAdmin: ''
  });
  const [initialShipping, setInitialShipping] = useState({});
  const [initialBilling, setInitialBilling] = useState({});
  const [message, setMessage] = useState(null)

  useEffect(() => {
    (async () => {
      if (match.params.id !== 'newproduct') {
        try {
          const { data } = await axios.get(`
                    http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/users/${match.params.id}`, config);
          console.log('dattta:', data);
          setInitial({
            username: data.username,
            email: data.email,
            isAdmin: data.isAdmin,
          })
          setInitialShipping({
            ...data.shipping
          })
          setInitialBilling({
            ...data.billing
          })
          setLoading(false);
        } catch (error) {
          setError(responseError(error));
        };
      } else {
        setLoading(false)
      }
    })();
  }, [match, message]);


  const makeNewUser = async (values) => {
    try {
      const data = await axios.post(
        `http://localhost:3000/api/users/`,
        values,
        config
      );
      if (data.status === 200 || 201) {
        setMessage('a felhasználó elmentve');
      }
    } catch (error) {
      setMessage(responseError(error));
    }
  };

  const handleUpdateUser = async (values) => {
    try {
      const data = await axios.put(
        `http://localhost:3000/api/users/${match.params.id}`,
        values,
        config
      );
      if (data.status === 200 || 201) {
        setMessage('a felhasználó módosítva');
      }
    } catch (error) {
      setMessage(responseError(error));
    }
  };

  return (
    <div>
      <h2>{match.params.id === 'newuser' ? 'Új felhasználó' : 'felhasználó módosítása'}</h2>
      {loading ? (
        <p>loading</p>
      ) : error ? (
        <p>{error}</p>
      ) : (<>
        <FormUpdateUser
          updateUser={handleUpdateUser}
          initial={initial}
        />
        <FormAddress
          initial={initialShipping}
          typeform="shipping"
        />
        <FormAddress
          initial={initialBilling}
          typeform="billing"
        />
      </>
      )}
      <div>{message}</div>
    </div>
  )
};

export default EditUsers;
