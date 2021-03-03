import React, {useEffect, useState} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import PropTypes from "prop-types";
import {withSnackbar} from "notistack";
import {injectIntl} from "react-intl";

import GenericForm from "../GenericForm";
import Axios from "../../Axios";

import {setFormConfig} from "redux/pageHeader";

const CreateUpdateForm = ({ actions, title, enqueueSnackbar, formConfiguration, url, ...props }) => {
  const history = useHistory();
  const [submitFromOutside, setSubmitFromOutside] = useState(false);
  const [formData, setFormData] = useState();
  const [formErrors, setFormErrors] = useState({});
  const [editMode, setEditMode] = useState(false);

  const { id } = useParams();

  const isEditable = () => {
    return !!id;
  };

  useEffect(() => {
    actions.setFormConfig({
      title: title,
      onClick: () => setSubmitFromOutside(true)
    })
  },[]);

  useEffect(() => {
    if(isEditable()){
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

  const create = (data) => {
    const queryString = `${url}`;
    Axios.post(queryString, JSON.stringify(data),{
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }),
    })
      .then(({status, data, ...rest}) => {
        history.goBack();
        enqueueSnackbar(props.intl.formatMessage({
          id: "CreateUpdateForm.creacion_correcta",
          defaultMessage: "Registro creado correctamente"
        }), {variant: 'success'});
      })
      .catch(error => {
        handlePersistError(error.response);
      });
  };

  const update = (data) => {
    const queryString = `${url}/${id}`;
    Axios.put(queryString,JSON.stringify(data),{
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }),
    })
      .then(({status, data, ...rest}) => {
        history.goBack();
        enqueueSnackbar(props.intl.formatMessage({
          id: "CreateUpdateForm.actualizacion_correcta",
          defaultMessage: "Registro actualizado correctamente"
        }), {variant: 'success'});
      })
      .catch(error => {
        handlePersistError(error.response);
      });
  }

  const handlePersistError = ({ status, data}) => {
    if(status === 400 && data.errors){
      for (const err of data.errors) {
        setFormErrors({...formErrors, [err.field]: {message: err.defaultMessage}});
      }
    }
    enqueueSnackbar(props.intl.formatMessage({
      id: "CreateUpdateForm.revise_datos",
      defaultMessage: "Revise los datos e intente nuevamente..."
    }), {variant: 'error'});
  }

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
  url: PropTypes.string.isRequired
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setFormConfig: bindActionCreators(setFormConfig, dispatch)
  };
  return { actions };
};

export default withSnackbar(injectIntl(connect(null, mapDispatchToProps)(CreateUpdateForm)));