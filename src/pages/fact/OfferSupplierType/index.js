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

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });

  const DESCRIPTION = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });
  const OBS = props.intl.formatMessage({
    id: "Comun.observaciones",
    defaultMessage: "Observaciones",
  });

  const creationFields = [
    {
      placeHolder: CODE,
      type: "input",
      key: "codi",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      noEditable: true,
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 4),
        ...props.stringValidations.fieldExistsValidation(
          "tipusOfertesProveidor",
          "codi",
          CODE
        ),
      ],
    },
    {
      placeHolder: DESCRIPTION,
      type: "input",
      key: "descripcioTipusOfertesProveidors",
      required: true,
      breakpoints: {
        xs: 12,
        md: 9,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 50),
      ],
    },
    {
      placeHolder: OBS,
      type: "input",
      key: "observacions",
      breakpoints: {
        xs: 12,
        md: 12,
      },
      text: {
        multiline: 2,
      },
    },
  ];

  return (
    <Paper style={{ position: 'relative' }}>
      <Switch>
        <Route exact path={`${URL}`} component={() => <OfferSupplierTypeList fields={creationFields} />}></Route>
        <Route path={`${URL}/create`} component={() => <OfferSupplierTypeCreate fields={creationFields} />}></Route>
        <Route path={`${URL}/:id`} component={() => <OfferSupplierTypeCreate fields={creationFields} />}></Route>
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