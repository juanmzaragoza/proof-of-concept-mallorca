import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from "prop-types";
import * as ROUTES from "../../constants/routes";

const PrivateRoute = (props) => {
  return (
    <Fragment>
      { props.isUserAuthenticated() ? props.children : <Redirect to={ROUTES.LOGIN} /> }
    </Fragment>
  )
}

PrivateRoute.propTypes = {
  isUserAuthenticated: PropTypes.func.isRequired
}

export default PrivateRoute;