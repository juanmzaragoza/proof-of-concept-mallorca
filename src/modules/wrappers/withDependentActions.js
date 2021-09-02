import React from "react";
import {bindActionCreators, compose} from "redux";
import {connect} from "react-redux";
import { getCalculationForDependentFields } from "../../redux/genericForm";
import {getFormDataByKey} from "../../redux/genericForm/selectors";

const CAMP_DE_CANVI = 'campDeCanvi';

const withDependentActions = (PassedComponent) => {

  const WrappedComponent = (props) => {

    const buildBody = ({ fields, key, value }) => {
      const body =  {};
      fields.map((field) => {
        body[field.key] = field.key === key? value:props.getFormData(field.key);
      });
      body[CAMP_DE_CANVI] = key;
      return body;
    }

	const fireOnChangePrice = ({ key, value }) => {
      const id = 'calcularPvpMargeDescompte';
      const fields = [
       {key: 'pvpFact', react: true},
        {key: 'preuCompraTeo', react: true},
        {key: 'preuCostTeo', react: true},
        {key: 'decimalsPreu', react: true},
        {key: 'dte1', react: true},
        {key: 'dte2', react: true},
        {key: 'dte3', react: true},
        {key: 'dte4', react: true},
        {key: 'dte5', react: true},
        {key: 'pvpDte', react: true},
        {key: 'margeDte', react: true},
        {key: 'dte1Fab', react: true},
        {key: 'dte2Fab', react: true},
        {key: 'dte3Fab', react: true},
        {key: 'dte4Fab', react: true},
        {key: 'dte5Fab', react: true},
        {key: 'pvpDteFab', react: true},
        {key: 'margeDteFab', react: true},
      ];
      // call to service
      const body = buildBody({ key, value, fields });
      // TODO() at this point, we can add method and query attributes
      return props.getCalculationForDependentFields({ id, body });
    }

    const fireOnChangeUpdate = ({ key, value }) => {
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
      const body = buildBody({ key, value, fields });
      // TODO() at this point, we can add method and query attributes
      return props.getCalculationForDependentFields({ id, body });
    }
	
	const fireOnChangeCalculateMargin = ({ key, value }) => {
      const id = 'preusArticleCalcularPreusMargeAmbDescompte';
      const fields = [
       {key: 'article', react: true},
        {key: 'preuArticleTarifa', react: true},
        {key: 'descompte', react: true},
        {key: 'descompte002', react: true},
        {key: 'marge', react: true},
      ];
      // call to service
      const body = buildBody({ key, value, fields });
      // TODO() at this point, we can add method and query attributes
      return props.getCalculationForDependentFields({ id, body });
    }

    return <PassedComponent
      articles={{ fireOnChangePrice, fireOnChangeUpdate }}
	  rates={{ fireOnChangeCalculateMargin }}
      {...props} />;
  }

  const mapStateToProps = (state, props) => {
    return {
      getFormData: getFormDataByKey(state),
    };
  };

  const mapDispatchToProps = (dispatch, props) => {
    const actions = {
      getCalculationForDependentFields: bindActionCreators(getCalculationForDependentFields, dispatch),
    };
    return actions;
  };

  return compose(
    connect(mapStateToProps,mapDispatchToProps),
  )(WrappedComponent);
}

export default withDependentActions;