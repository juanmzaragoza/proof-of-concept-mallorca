import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Dialog, DialogContent, Slide} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import CloseIcon from '@material-ui/icons/Close';
import PropTypes from "prop-types";
import GenericForm from "../GenericForm";

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateUpdateForm = ({ title, open, handleClose }) => {
  const [submitFromOutside, setSubmitFromOutside] = useState();
  const [formData, setFormData] = useState();
  const [formErrors, setFormErrors] = useState();

  useEffect(() => {
    if(submitFromOutside){
      setSubmitFromOutside(false);
    }
  },[submitFromOutside]);

  const classes = useStyles();

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
      error: formErrors? formErrors['codi']:""
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
      error: formErrors? formErrors['nom']:""
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
      error: formErrors? formErrors['ctaprcmp']:""
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
      error: formErrors? formErrors['observacions']:""
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
      error: formErrors? formErrors['tipasicmp']:""
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
      error: formErrors? formErrors['dricmp']:""
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
      error: formErrors? formErrors['driprfcmp']:""
    },
  ];

  const handleSubmit = () => {
    const queryString = 'http://10.35.3.44:8083/api/fact/familiesProveidor';
    fetch(queryString,{
      method: 'POST',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJjZWNvY2xvdWQiLCJhdWQiOiJhdXRoIiwic3ViIjoiYWRtaW4iLCJleHAiOjE2MTM2NzM4OTYsIm5hbWUiOiJBZG1pbmlzdHJhZG9yIEFkbWluIiwiZW1haWwiOiJhZG1pbkBsaW1pdC5lcyIsInJleHAiOjE2MTYyNjIyOTYsInJvbCI6WyJBRE1JTiJdLCJzZXNzaW9uIjp7ImkiOjQ0MywiZSI6OTg3fX0.xtMfHFX5uOb-NToX61-0Pm5Orc8tv03p4QHZqYqecsW7j1k9gPYzh3JHfuZIlwxrM0OHUWclXkK55x2kZAlRVA'
      }),
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(({status, errors, ...rest}) => {
        if(status === 400){
          for (const err of errors) {
            setFormErrors({...formErrors, [err.field]: {message: err.defaultMessage}});
          }
        } else if(status === 500){
          window.alert("INTERVAL SERVER ERRROR");
        } else {
          handleClose();
        }
      })
      .catch(() => {
      });
  };

  return (
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            { title }
          </Typography>
          <Button autoFocus color="inherit" onClick={() => setSubmitFromOutside(true)}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <GenericForm formComponents={configuration} submitFromOutside={submitFromOutside} onSubmit={() => handleSubmit(formData)}/>
      </DialogContent>
    </Dialog>
  );
};

CreateUpdateForm.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func
};

export default CreateUpdateForm;