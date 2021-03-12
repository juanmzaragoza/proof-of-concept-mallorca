import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import Button from "@material-ui/core/Button";

import GenericForm from "modules/GenericForm";

const LOVForm = ({ title, open, close, formComponents }) => {
  const [openModal, setOpenModal] = useState(open);

  useEffect(()=>{
    setOpenModal(open);
  },[open]);

  const onClose = () => {
    setOpenModal(false);
    close();
  };

  return(
    <Dialog
      open={openModal}
      onClose={() => onClose()}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth={"md"}
    >
      <DialogTitle id="form-dialog-title">Agregar {title? title:""}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <FormattedMessage id={"LOVForm.subtitulo"} defaultMessage={"Agregar nuevo elemento"}/>
        </DialogContentText>
      </DialogContent>
      <GenericForm
        formComponents={formComponents}
        setFormData={()=>{console.log("SETEO")}}
        containerSpacing={0}
        fieldsContainerStyles={{padding: "0px 10px 0px 10px"}} />
      <DialogActions>
        <Button onClick={() => onClose()} color="primary">
          <FormattedMessage id={"Forms.cancel"} defaultMessage={"Cancelar"} />
        </Button>
        <Button onClick={() => {
          /*const list = opts;
          const opt = {value: String(parseInt(opts[opts.length-1].value)+1), label: elementToAdd};
          list.push(opt);
          setOpts(list);
          setElementToAdd("");
          props.setValue(opt);
          setOpenModal(false);*/
        }} color="primary">
          <FormattedMessage id={"Forms.guardar"} defaultMessage={"Guardar"} />
        </Button>
      </DialogActions>
    </Dialog>
  )
};

LOVForm.propTypes = {
  title: PropTypes.string,
  formComponents: PropTypes.any.isRequired,
  open: PropTypes.bool,
  close: PropTypes.func
};
export default LOVForm;