import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import PropTypes from "prop-types";
import {withSnackbar} from "notistack";

import GenericForm from "../GenericForm";
import Axios from "../services/Axios";
import {ContentHeaderCreate} from "./ContentHeader";

const CreateUpdateForm = ({ title, enqueueSnackbar, formConfiguration, url }) => {
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
            enqueueSnackbar("Ups! Algo ha salido mal :(", {variant: 'error'});
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
        enqueueSnackbar("Registro creado correctamente", {variant: 'success'});
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
        enqueueSnackbar("Registro actualizado correctamente", {variant: 'success'});
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
    enqueueSnackbar("Revise los datos e intente nuevamente...", {variant: 'error'});
  }

  return (
    <>
      <ContentHeaderCreate title={title} onClick={() => setSubmitFromOutside(true)} />
      <GenericForm
        editMode={editMode}
        setFormData={setFormData}
        formData={formData}
        formErrors={formErrors}
        formComponents={formConfiguration}
        submitFromOutside={submitFromOutside}
        onSubmit={(data) => handleSubmit(data)} />
    </>
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

export default withSnackbar(CreateUpdateForm);