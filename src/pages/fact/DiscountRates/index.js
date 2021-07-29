// import React from 'react';
// import {Route, Switch} from "react-router-dom";
// import Paper from "@material-ui/core/Paper";

// import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
// import DiscountRatesList from "./DiscountRatesList";
// import DiscountRatesCreate from "./DiscountRatesCreate";
// import withHeaders from "modules/wrappers/withHeaders";
// import {DISCOUNT_RATES_FACT_URL} from "constants/routes";

// const discountRates = () => (
//   <Paper style={{ position: 'relative' }}>
//     <Switch>
//       <Route exact path={`${DISCOUNT_RATES_FACT_URL}`} component={DiscountRatesList}></Route>
//       <Route path={`${DISCOUNT_RATES_FACT_URL}/create`} component={DiscountRatesCreate}></Route>
//       <Route path={`${DISCOUNT_RATES_FACT_URL}/:id`} component={DiscountRatesCreate}></Route>
//     </Switch>
//   </Paper>
// );

// const component = {
//   routeProps: {
//     path: `${DISCOUNT_RATES_FACT_URL}`,
//     component: withHeaders(discountRates)
//   },
//   name: 'FAC_TARDES',
//   icon: <ReceiptOutlinedIcon />
// }
// export default component;


import React from 'react';
import {injectIntl} from "react-intl";
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import Paper from "@material-ui/core/Paper";
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import * as API from "redux/api";
import {setBreadcrumbHeader, setListingConfig} from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";
import DiscountRatesList from "./DiscountRatesList";
import DiscountRatesForm from "./DiscountRatesForm";
import {DISCOUNT_RATES_FACT_URL} from "constants/routes";

const URL = DISCOUNT_RATES_FACT_URL;


const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const DiscountRatesListIntl = compose(
  injectIntl,
  connect(null,mapDispatchToProps)
)(DiscountRatesList);


const DiscountRatesFormWithUrl = () => <DiscountRatesForm url={API.tarifaDescompte} />;

const discountRates = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={DiscountRatesListIntl}></Route>
      <Route path={`${URL}/create`} component={DiscountRatesFormWithUrl}></Route>
      <Route path={`${URL}/:id`} component={DiscountRatesFormWithUrl}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(discountRates)
  },
  name: 'FAC_TARDES',
  icon: <ReceiptOutlinedIcon />
}