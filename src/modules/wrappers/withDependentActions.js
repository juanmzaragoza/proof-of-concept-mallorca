import React, {useState} from "react";
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
      const id = 'articlesCalcPrice';
      const fields = [
        {key: 'pvpFact', react: true},
        {key: 'preuIva', react: true},
        {key: 'decimalsPreuIva', react: true},
        {key: 'decimalsPreu', react: true},
        {key: 'iva', react: true},
      ];
      // call to service
      const body = buildBody({ key, value, fields });
      return props.getCalculationForDependentFields({ id, body });
    }

    return <PassedComponent
      articles={{ fireOnChangePrice }}
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