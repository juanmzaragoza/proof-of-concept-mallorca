import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import {FormattedMessage, injectIntl} from "react-intl";
import {bindActionCreators, compose} from "redux";
import {connect} from "react-redux";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormHelperText,
  ListSubheader,
  MenuItem,
  TextField
} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import {getData} from "redux/genericForm";
import {getDataFormSelectorById, getLoadingFormSelectorById} from "redux/genericForm/selectors";

const LOVElement = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [prefilter, setPrefilter] = useState("");
  const [opts, setOpts] = useState(props.options);
  const [elementToAdd, setElementToAdd] = useState("");

  useEffect(()=>{
    props.searchData(props.id,"regimIva");
  },[]);

  const renderOpts = () => {
    return [
      opts && opts
        .filter(option => prefilter !== "" ? option.label.includes(prefilter) : true)
        .map((option, index) => <MenuItem key={index} value={option.value}>{option.descripcio}</MenuItem>),
      <ListSubheader key="more-options">Más opciones</ListSubheader>,
      <MenuItem key="add-new" style={{fontWeight: "bold", fontSize: "small"}} onClick={e => {
        e.stopPropagation();
        setOpenModal(true);
      }}>Agregar nuevo</MenuItem>,
      <MenuItem key="search" style={{fontWeight: "bold", fontSize: "small"}} onKeyDown={e => e.stopPropagation()}>
        <TextField
          variant={"outlined"}
          size={"small"}
          label={"Buscar"}
          onClick={e => e.stopPropagation()}
          onChange={e => setPrefilter(e.target.value)}/>
      </MenuItem>
    ];
  };

  return <>
    <TextField
      id={props.id}
      select
      label={props.label}
      onChange={props.onChange}
      value={props.value}
      error={Boolean(props.error)}
      required={props.required}
      variant={props.variant ? props.variant : "outlined"}
      disabled={props.loading || props.disabled}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {props.loading? <CircularProgress size={20}/>:<AddCircleOutlineIcon/>}
          </InputAdornment>
        ),
      }}
    >
      {props.loading && <MenuItem key={"loading"}  disabled={true}>Cargando...</MenuItem>}
      {!props.loading && (renderOpts())}
    </TextField>
    <Dialog open={openModal} onClose={() => setOpenModal(false)} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Agregar Nuevo</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Para agregar un nuevo elemento, por favor ingrese el nombre y presione en guardar.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nombre del elemento a agregar"
          type="text"
          onChange={e => setElementToAdd(e.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenModal(false)} color="primary">
          <FormattedMessage id={"Forms.cancel"} defaultMessage={"Cancelar"} />
        </Button>
        <Button onClick={() => {
          const list = opts;
          const opt = {value: String(parseInt(opts[opts.length-1].value)+1), label: elementToAdd};
          list.push(opt);
          setOpts(list);
          setElementToAdd("");
          props.setValue(opt);
          setOpenModal(false);
        }} color="primary">
          <FormattedMessage id={"Forms.guardar"} defaultMessage={"Guardar"} />
        </Button>
      </DialogActions>
    </Dialog>
    {Boolean(props.error)? <FormHelperText>{props.error.message}</FormHelperText>:null}
  </>;
}

LOVElement.propTypes = {
  id: PropTypes.any,
  label: PropTypes.any,
  onChange: PropTypes.func,
  value: PropTypes.any,
  variant: PropTypes.any,
  options: PropTypes.any,
  loading: PropTypes.bool
};

const mapStateToProps = (state, props) => {
  return {
    loading: getLoadingFormSelectorById(state, props.id),
    options: getDataFormSelectorById(state, props.id)
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    searchData: bindActionCreators(getData, dispatch)
  };
  return actions;
};

export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  injectIntl
)(LOVElement);