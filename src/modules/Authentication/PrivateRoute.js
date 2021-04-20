import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import * as ROUTES from "../../constants/routes";

const PrivateRoute = (props) => {
  const isUserAuthenticated = () =>{
    return true;
  };

  return (
    <Fragment>
      { isUserAuthenticated() ? props.children : <Redirect to={ROUTES.LOGIN} /> }
    </Fragment>
  )
}

export default PrivateRoute;