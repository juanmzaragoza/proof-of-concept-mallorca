import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import {FormattedMessage, injectIntl} from "react-intl";
import GenericForm from "./index";
import Button from "@material-ui/core/Button";
import {compose} from "redux";

const ObservationsForm = ({open, onClose = () => {}, onSubmit, value = '', placeHolder, required, multiline = 4, ...props}) => {
  const [openModal, setOpenModal] = useState(open);
  const [text, setText] = useState('');

  useEffect(()=>{
    setOpenModal(open);
  },[open]);

  useEffect(()=>{
    setText(value);
  },[value]);

  const handleClose = () => {
    setOpenModal(false);
    onClose();
  };

  const formComponents = [
    {
      placeHolder: placeHolder? placeHolder:props.intl.formatMessage({
        id: "FamiliaProveedores.observaciones",
        defaultMessage: "Observaciones"
      }),
      type: 'input',
      key: 'observacions',
      breakpoints: {
        xs: 12,
        md: 12
      },
      text: {
        multiline: multiline
      }
    }
  ]

  return(
    <Dialog
      open={openModal}
      onClose={() => handleClose()}
      aria-labelledby="obs-dialog-title"
      fullWidth={true}
      maxWidth={"md"}
    >
      <DialogTitle id="form-dialog-title">
        <FormattedMessage id={"Observaciones.titulo"} defaultMessage={"Información extra"} />
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <FormattedMessage id={"Observaciones.subtitulo"} defaultMessage={"Para agregar una descripción, por favor complete la información que aparecen a continuació"}/>
        </DialogContentText>
      </DialogContent>
      <GenericForm
        formComponents={formComponents}
        getFormData={(key) => text}
        setFormData={({key, value}) => setText(value)}
        containerSpacing={0}
        fieldsContainerStyles={{padding: "0px 10px 0px 10px"}}
      />
      <DialogActions>
        <Button
          onClick={() => handleClose()}
          color="primary"
          disabled={props.loading} >
          <FormattedMessage id={"Forms.cancel"} defaultMessage={"Cancelar"} />
        </Button>
        <Button
          onClick={(e) => {
            onSubmit(e, text);
            handleClose();
          }}
          disabled={props.loading}
          color="primary"
          disabled={required? !text || !text.length:false}>
          <FormattedMessage id={"Forms.guardar"} defaultMessage={"Guardar"} />
        </Button>
      </DialogActions>
    </Dialog>
  )
};

ObservationsForm.propTypes = {
  open: PropTypes.bool,
  required: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  value: PropTypes.string,
  placeHolder: PropTypes.string,
  multiline: PropTypes.number
}

export default compose(
  injectIntl
)(ObservationsForm);