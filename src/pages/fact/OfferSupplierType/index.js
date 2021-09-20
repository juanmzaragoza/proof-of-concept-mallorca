import React from 'react';
import {Route, Switch} from "react-router-dom";
import { compose } from "redux";
import Paper from "@material-ui/core/Paper";
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';

import OfferSupplierTypeList from "./OfferSupplierTypeList";
import OfferSupplierTypeCreate from "./OfferSupplierTypeCreate";

import {
  withValidations,
  withHeaders
} from "modules/wrappers";
import {OFFER_SUPP_TYPE_FACT_URL} from "constants/routes";

const URL = OFFER_SUPP_TYPE_FACT_URL;

const OfferSupplierType = (props) => {
  return (
    <Paper style={{ position: 'relative' }}>
      <Switch>
        <Route exact path={`${URL}`} component={() => <OfferSupplierTypeList />}></Route>
        <Route path={`${URL}/create`} component={() => <OfferSupplierTypeCreate />}></Route>
        <Route path={`${URL}/:id`} component={() => <OfferSupplierTypeCreate />}></Route>
      </Switch>
    </Paper>
  )
};

const component = {
  routeProps: {
    path: `${URL}`,
    component: compose(
      withValidations,
      withHeaders
    )(OfferSupplierType)
  },
  name: 'FAC_TIPOFEPRO',
  icon: <LocalOfferOutlinedIcon />
}
export default component;