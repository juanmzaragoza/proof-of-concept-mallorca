import React, {useEffect, useState} from 'react';
import {bindActionCreators,compose} from "redux";
import {connect} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import PropTypes from "prop-types";
import {injectIntl} from "react-intl";

import GenericForm from "modules/GenericForm";
import { withAbmServices } from "modules/wrappers";

import Axios from "../../Axios";

import {setBreadcrumbHeader, setFireSaveFromHeader, setFormConfig} from "redux/pageHeader";
import {getFireSave} from "redux/pageHeader/selectors";
import {getFormData, getFormErrors} from "../../redux/genericForm/selectors";
import {setFormData} from "../../redux/genericForm";

const CreateUpdateForm = ({
      title, //props
      formConfiguration,
      url,
      actions, //redux
      submitFromOutside,
      formErrors,
      formData,
      actions: {setFormConfig, setBreadcrumbHeader, setSubmitFromOutside, setFormData},
      enqueueSnackbar, //withSackBar
      services, //withServices
      ...props }) => {
  const history = useHistory();
  const [editMode, setEditMode] = useState(false);

  const { id } = useParams();

  const isEditable = () => {
    return !!id;
  };

  useEffect(() => {
    setFormConfig({
      title: title
    });
    setBreadcrumbHeader([{title: title, href: "/"}, {title: "Nuevo"}]);
  },[]);

  useEffect(() => {
    if(isEditable()){
      setBreadcrumbHeader([{title: title, href: "/"}, {title: "Modificar"}]);
      setEditMode(true);
      const queryString = `${url}/${id}`;
      Axios.get(queryString,{
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }),
      })
        .then(({status, data, ...rest}) => {
          setFormData(data);
        })
        .catch(error => {
          const status = error.response.status;
          if(status === 400){
            enqueueSnackbar(props.intl.formatMessage({
              id: "ReactGrid.error.algo_salio_mal",
              defaultMessage: "Ups! Algo ha salido mal :("
            }), {variant: 'error'});
          }
          history.goBack();
        });
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
      editMode={editMode}
      setFormData={setFormData}
      formData={formData}
      formErrors={formErrors}
      formComponents={formConfiguration}
      submitFromOutside={submitFromOutside}
      onSubmit={(data) => handleSubmit(data)}
      fieldsContainerStyles={{padding: '10px 40px 40px 40px'}}/>
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
    formData: getFormData(state)
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setFormConfig: bindActionCreators(setFormConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
    setSubmitFromOutside: bindActionCreators(setFireSaveFromHeader, dispatch),
    setFormData: bindActionCreators(setFormData, dispatch),
  };
  return { actions };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl,
  withAbmServices
)(CreateUpdateForm);