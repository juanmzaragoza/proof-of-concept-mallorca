import React from "react";
import {bindActionCreators, compose} from "redux";
import {connect} from "react-redux";
import { getCalculationForDependentFields } from "../../redux/genericForm";
import {getFormDataByKey} from "../../redux/genericForm/selectors";

const CAMP_DE_CANVI = 'campDeCanvi';

const withDependentActionsTest = (PassedComponent) => {

  const WrappedComponentMargin = (props) => {

    const buildBody = ({ fields, key, value }) => {
      const body =  {};
      fields.map((field) => {
        body[field.key] = field.key === key? value:props.getFormData(field.key);
      });
      body[CAMP_DE_CANVI] = key;
      return body;
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
    preusArticle={{ fireOnChangeCalculateMargin }}
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
  )(WrappedComponentMargin);
}

export default withDependentActionsTest;