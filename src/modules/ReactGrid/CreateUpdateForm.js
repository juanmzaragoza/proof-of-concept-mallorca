import React, {useEffect, useState} from 'react';
import {bindActionCreators,compose} from "redux";
import {connect} from "react-redux";
import {useParams, useRouteMatch} from "react-router-dom";
import PropTypes from "prop-types";
import {injectIntl} from "react-intl";

import GenericForm from "modules/GenericForm";
import { withAbmServices } from "modules/wrappers";

import {setBreadcrumbHeader, setFireSaveFromHeader, setFormConfig} from "redux/pageHeader";
import {getFireSave} from "redux/pageHeader/selectors";
import {getFormDataByKey, getFormErrors, getIsDataLoaded} from "redux/genericForm/selectors";
import {setFormDataByKey, resetAllGenericForm} from "redux/genericForm";
import {getLoading} from "redux/app/selectors";

const CreateUpdateForm = ({
      title, //props
      formConfiguration,
      url,
      actions, //redux
      submitFromOutside,
      formErrors,
      getFormData,
      loading,
      actions: {setFormConfig, setBreadcrumbHeader, setSubmitFromOutside, setFormData},
      enqueueSnackbar, //withSackBar
      services, //withServices
      ...props }) => {
  const [editMode, setEditMode] = useState(false);

  const { id } = useParams();
  const match = useRouteMatch();

  const isEditable = () => {
    return !!id;
  };

  const getBaseUrl = () => `/${match.path.split('/')[1]}`;

  useEffect(() => {
    setFormConfig({
      title: title
    });
    setBreadcrumbHeader([{title: title, href: getBaseUrl()}, {
      title: props.intl.formatMessage({id: "Comun.nuevo", defaultMessage: "Nuevo"})
    }]);
    return () => actions.reset();
  },[]);

  useEffect(() => {
    if(isEditable()){
      setBreadcrumbHeader([{title: title, href: getBaseUrl()}, {
        title: props.intl.formatMessage({id: "Comun.modificar", defaultMessage: "Modificar"})
      }]);
      setEditMode(true);
      services.getById(id);
    }
  },[id]);

  useEffect(() => {
    if(submitFromOutside){
      setSubmitFromOutside(false);
    }
  },[submitFromOutside]);

  const handleSubmit = (data) => {
    if(isEditable()){
      update(data);
    } else{
      create(data);
    }
  };

  const create = (data) => services.create(data);

  const update = (data) => services.update(id, data);

  return (
    <GenericForm
      loading={loading}
      editMode={editMode}
      setFormData={setFormData}
      getFormData={getFormData}
      formErrors={formErrors}
      formComponents={formConfiguration}
      submitFromOutside={submitFromOutside}
      onSubmit={(data) => handleSubmit(data)}
      fieldsContainerStyles={{padding: '10px 40px 40px 40px'}}
      formDataLoaded={props.formDataLoaded} />
  );

};

CreateUpdateForm.propTypes = {
  title: PropTypes.string,
  formConfiguration: PropTypes.arrayOf(PropTypes.shape({
    placeHolder: PropTypes.string,
    type: PropTypes.string,
    key: PropTypes.string,
    required: PropTypes.bool,
    breakpoints: PropTypes.shape({
      xs: PropTypes.number,
      sm: PropTypes.number,
      md: PropTypes.number,
      lg: PropTypes.number,
    })
  })),
  url: PropTypes.string.isRequired,
  actions: PropTypes.any,
  submitFromOutside: PropTypes.bool
};

const mapStateToProps = (state, props) => {
  return {
    submitFromOutside: getFireSave(state),
    formErrors: getFormErrors(state),
    getFormData: getFormDataByKey(state),
    loading: getLoading(state),
    formDataLoaded: getIsDataLoaded(state)
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setFormConfig: bindActionCreators(setFormConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
    setSubmitFromOutside: bindActionCreators(setFireSaveFromHeader, dispatch),
    setFormData: bindActionCreators(setFormDataByKey, dispatch),
    reset: bindActionCreators(resetAllGenericForm, dispatch),
  };
  return { actions };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl,
  withAbmServices
)(CreateUpdateForm);