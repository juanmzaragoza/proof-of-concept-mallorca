import React from "react";
import {compose} from "redux";
import {injectIntl} from "react-intl";
import {withSnackbar} from "notistack";
import * as API from "../../redux/api";
import Axios, {errorTypes} from "../../Axios";

const CAMP_DE_CANVI = 'campDeCanvi';

const withDependentActions = (PassedComponent) => {

  const WrappedComponent = (props) => {

    const doRequest = ({ id, key, getFormData, fields }) => {

      const buildBody = ({ fields }) => {
        const body =  {};
        fields.map((field) => {
          body[field.key] = getFormData(field.key);
        });
        body[CAMP_DE_CANVI] = key;
        return body;
      }

      return new Promise((resolve, reject) => {
        const body = buildBody({key, fields});
        Axios.post(`${API[id]}`, body)
          .then(({data}) => data)
          .then((data) => {
            resolve(data);
          })
          .catch((e) => {
            const status = e.response?.status;
            if(!errorTypes[status]) {
              props.enqueueSnackbar(props.intl.formatMessage({
                id: "withDependentActions.onRequest.error",
                defaultMessage: "No se pudo realizar el cálculo correctamente"
              }), {variant: 'error'});
            }
            reject(e);
          });
      });
    }

    // const fireOnChangePrice = ({ key, getFormData }) => {
    //   const id = 'articlesCalcPrice';
    //   const fields = [
    //     {key: 'pvpFact', react: true},
    //     {key: 'preuIva', react: true},
    //     {key: 'decimalsPreuIva', react: true},
    //     {key: 'decimalsPreu', react: true},
    //     {key: 'iva', react: true},
    //   ];
    //   // call to service
    //   return doRequest({ id, key, getFormData, fields });
    // }

    const fireOnChangeUpdate = ({ key, getFormData }) => {
      const id = 'articlesUpdatePrice';
      const fields = [
        {key: 'codi', react: true},
        {key: 'preuCompra', react: true},
        {key: 'dte1Compra', react: true},
        {key: 'dte2Compra', react: true},
        {key: 'preuCompraTeo', react: true},
        {key: 'dataActualitzacioPreu', react: true},
        {key: 'pvpFact', react: true},
        {key: 'preuIva', react: true},
        {key: 'preuCostTeo', react: true},
        {key: 'marge', react: true},
        {key: 'decimalsPreu', react: true},
        {key: 'decimalsPreuIva', react: true},
        {key: 'iva', react: true},
      ];
    // call to service
    return doRequest({ id, key, getFormData, fields });
  }

    const fireOnChangeCalculateMargin = ({ key, getFormData }) => {
      const id = 'preusArticleCalcularPreusMargeAmbDescompte';
      const fields = [
        {key: 'article', react: true},
        {key: 'preuArticleTarifa', react: true},
        {key: 'descompte', react: true},
        {key: 'descompte002', react: true},
        {key: 'marge', react: true},
      ];
      // call to service
      return doRequest({ id, key, getFormData, fields });
    }

    return <PassedComponent
      // articles={{ fireOnChangePrice, fireOnChangeUpdate }}
      articles={{ fireOnChangeUpdate }}
      rates={{ fireOnChangeCalculateMargin }}
      {...props} />;
  }

  return compose(
    withSnackbar,
    injectIntl
  )(WrappedComponent);
}

export default withDependentActions;