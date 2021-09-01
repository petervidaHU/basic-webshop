/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import AdminLayout from '../admin/AdminLayout';
import jwt_decode from "jwt-decode";

const ProtectedRoute = ({ component: Component, match, ...moreProps }) => {
  const [trigger, setTrigger] = useState(false);
  const [redirecter, setRedirecter] = useState(false);
  const { token } = useSelector((state) => state.userLogin);
  const [admin, setAdmin] = useState(null)
  
  if (token === null) {
    return (
      <Redirect to={{ pathname: '/login' }} />
    )
  };

  useEffect(() => {
    setAdmin(jwt_decode(token).isAdmin)
  }, [token])

  useEffect(() => {
    let timerForRedirect;
    if (trigger) {
      timerForRedirect = setTimeout(() => {
        setRedirecter(true);
      }, 1000);
    }
    return () => clearTimeout(timerForRedirect);
  }, [trigger]);

  if (admin === true) {
    return (
      <Route
        {...moreProps}
        render={(props) => <AdminLayout><Component {...props} /></AdminLayout>}
      />
    );
  }
  if (!trigger) setTrigger(true);

  return (
    <>
      {trigger && (<h1> redirecting!</h1>)}
      {redirecter && (<Redirect to={{ pathname: '/login' }} />)}
    </>
  );
};

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
};
