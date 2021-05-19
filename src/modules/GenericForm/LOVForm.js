import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {FormattedMessage, injectIntl} from "react-intl";
import {bindActionCreators, compose} from "redux";
import {connect} from "react-redux";
import {withSnackbar} from "notistack";
import { isEmpty } from "lodash";

import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import Button from "@material-ui/core/Button";

import GenericForm from "modules/GenericForm";
import {submit, reset} from "redux/lovForm";
import {getData, getErrors, getIsCreated, getIsLoading} from "redux/lovForm/selectors";

const LOVForm = ({ id, title, open, close, formComponents, actions, ...props }) => {
  const [openModal, setOpenModal] = useState(open);
  const [formData, setFormData] = useState({});

  useEffect(()=>{
    setOpenModal(open);
    if(open){
      actions.reset();
      setFormData({});
    }
  },[open]);

  useEffect(()=>{
    if(props.created && open){
      closeIt(props.data);
    }
  },[props.created]);

  useEffect(()=>{
    if(open) {
      if(!isEmpty(props.errors)){
        props.enqueueSnackbar(<FormattedMessage
          id={"LOVForm.revise_datos"}
          defaultMessage={"Error al crear {name}. Revise los datos e intente nuevamente..."}
          values={{name: title? title.toLowerCase():"Nuevo Elemento"}}/>,{variant: "error", preventDuplicate: true, key: id});
      }
    }
  },[props.errors]);

  const closeIt = (data) => {
    setOpenModal(false);
    close(data);
  };

  return(
    <Dialog
      open={openModal}
      onClose={() => closeIt()}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth={"md"}
    >
      <DialogTitle id="form-dialog-title">
        <FormattedMessage id={"LOVForm.titulo_nuevo"} defaultMessage={"Agregar {name}"} values={{name: title? title:""}}/>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <FormattedMessage id={"LOVForm.subtitulo"} defaultMessage={"Agregar nuevo elemento"}/>
        </DialogContentText>
      </DialogContent>
      <GenericForm
        formComponents={formComponents}
        getFormData={(key) => formData[key]}
        setFormData={({key, value}) => setFormData({...formData, [key]: value})}
        containerSpacing={0}
        fieldsContainerStyles={{padding: "0px 10px 0px 10px"}}
        formErrors={props.errors.data} />
      <DialogActions>
        <Button
          onClick={() => closeIt()}
          color="primary"
          disabled={props.loading} >
          <FormattedMessage id={"Forms.cancel"} defaultMessage={"Cancelar"} />
        </Button>
        <Button
          onClick={() => {
            actions.submit({ id, data: formData });
          }}
          disabled={props.loading}
          color="primary">
          <FormattedMessage id={"Forms.guardar"} defaultMessage={"Guardar"} />
        </Button>
      </DialogActions>
    </Dialog>
  )
};

LOVForm.propTypes = {
  id: PropTypes.any,
  title: PropTypes.string,
  formComponents: PropTypes.any.isRequired,
  open: PropTypes.bool,
  close: PropTypes.func,
  loading: PropTypes.bool
};

const mapStateToProps = (state, props) => {
  return {
    loading: getIsLoading(state),
    created: getIsCreated(state),
    data: getData(state),
    errors: getErrors(state)
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    submit: bindActionCreators(submit, dispatch),
    reset: bindActionCreators(reset, dispatch),
  };
  return { actions };
};

export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  withSnackbar,
  injectIntl
)(LOVForm);