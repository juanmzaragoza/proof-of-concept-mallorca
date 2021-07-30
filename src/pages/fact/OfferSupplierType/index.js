import React from 'react';
import {Route, Switch} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import OfferSupplierTypeList from "./OfferSupplierTypeList";
import OfferSupplierTypeCreate from "./OfferSupplierTypeCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {OFFER_SUPP_TYPE_FACT_URL} from "constants/routes";

const URL = OFFER_SUPP_TYPE_FACT_URL;

const OfferSupplierType = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={OfferSupplierTypeList}></Route>
      <Route path={`${URL}/create`} component={OfferSupplierTypeCreate}></Route>
      <Route path={`${URL}/:id`} component={OfferSupplierTypeCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(OfferSupplierType)
  },
  name: 'FAC_TIPOFEPRO',
  icon: <LocalOfferOutlinedIcon />
}
export default component;