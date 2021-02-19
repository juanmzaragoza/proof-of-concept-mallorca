import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import PropTypes from "prop-types";

import GenericForm from "../GenericForm";
import Axios from "../services/Axios";
import {ContentHeaderCreate} from "./ContentHeader";

const CreateUpdateForm = ({ title }) => {
  const history = useHistory();
  const [submitFromOutside, setSubmitFromOutside] = useState(false);
  const [formData, setFormData] = useState();
  const [formErrors, setFormErrors] = useState({});

  const { id } = useParams();

  const isEditable = () => {
    return !!id;
  };

  useEffect(() => {
    //TODO(): request for id and populate data
    if(isEditable()){
      const queryString = `api/fact/familiesProveidor/${id}`;
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
          const data = error.response.data;
          if(status === 400){
            for (const err of data.errors) {
              console.log(err.field)
              setFormErrors({...formErrors, [err.field]: {message: err.defaultMessage}});
            }
          }
        });
    }
  },[]);

  useEffect(() => {
    if(submitFromOutside){
      setSubmitFromOutside(false);
    }
  },[submitFromOutside]);

  const getError = (key) => {
    return formErrors && formErrors[key]? formErrors[key]:"";
  }

  const configuration = [
    {
      placeHolder: "Código",
      onChange: data => setFormData({...formData, codi: data}),
      type: 'input',
      key: 'codi',
      value: formData? formData['codi']:"",
      required: true,
      breakpoints: {
        xs: 12,
        md: 4
      },
      error: getError('codi'),
      noEditable: isEditable()
    },
    {
      placeHolder: "Nombre",
      onChange: data => setFormData({...formData, nom: data}),
      type: 'input',
      key: 'nom',
      value: formData? formData['nom']:"",
      required: true,
      breakpoints: {
        xs: 12,
        md: 4
      },
      error: getError('nom')
    },
    {
      placeHolder: "Ctaprcmp",
      onChange: data => setFormData({...formData, ctaprcmp: data}),
      type: 'input',
      key: 'ctaprcmp',
      value: formData? formData['ctaprcmp']:"",
      required: true,
      breakpoints: {
        xs: 12,
        md: 4
      },
      error: getError('ctaprcmp')
    },
    {
      placeHolder: "Observaciones",
      onChange: data => setFormData({...formData, observacions: data}),
      type: 'input',
      key: 'observacions',
      value: formData? formData['observacions']:"",
      required: true,
      breakpoints: {
        xs: 12,
        md: 4
      },
      error: getError('observacions')
    },
    {
      placeHolder: "Tipasicmp",
      onChange: data => setFormData({...formData, tipasicmp: data}),
      type: 'input',
      key: 'tipasicmp',
      value: formData? formData['tipasicmp']:"",
      required: true,
      breakpoints: {
        xs: 12,
        md: 4
      },
      error: getError('tipasicmp')
    },
    {
      placeHolder: "Dricmp",
      onChange: data => setFormData({...formData, dricmp: data}),
      type: 'input',
      key: 'dricmp',
      value: formData? formData['dricmp']:"",
      required: true,
      breakpoints: {
        xs: 12,
        md: 4
      },
      error: getError('dricmp')
    },
    {
      placeHolder: "Driprfcmp",
      onChange: data => setFormData({...formData, driprfcmp: data}),
      type: 'input',
      key: 'driprfcmp',
      value: formData? formData['driprfcmp']:"",
      required: true,
      breakpoints: {
        xs: 12,
        md: 4
      },
      error: getError('driprfcmp')
    },
  ];

  const handleSubmit = () => {
    if(isEditable()){
      update();
    } else{
      create();
    }
  };

  const create = () => {
    const queryString = 'api/fact/familiesProveidor';
    Axios.post(queryString,JSON.stringify(formData),{
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }),
    })
      .then(({status, data, ...rest}) => {
        history.goBack();
      })
      .catch(error => {
        const status = error.response.status;
        const data = error.response.data;
        if(status === 400){
          for (const err of data.errors) {
            console.log(err.field)
            setFormErrors({...formErrors, [err.field]: {message: err.defaultMessage}});
          }
        }
      });
  };

  const update = () => {
    const queryString = `api/fact/familiesProveidor/${id}`;
    Axios.put(queryString,JSON.stringify(formData),{
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }),
    })
      .then(({status, data, ...rest}) => {
        history.goBack();
      })
      .catch(error => {
        const status = error.response.status;
        const data = error.response.data;
        if(status === 400){
          for (const err of data.errors) {
            setFormErrors({...formErrors, [err.field]: {message: err.defaultMessage}});
          }
        }
      });
  }

  return (
    <>
      <ContentHeaderCreate title={title} onClick={() => setSubmitFromOutside(true)} />
      <GenericForm formComponents={configuration} submitFromOutside={submitFromOutside} onSubmit={() => handleSubmit(formData)}/>
    </>
  );

};

CreateUpdateForm.propTypes = {
  title: PropTypes.string
};

export default CreateUpdateForm;