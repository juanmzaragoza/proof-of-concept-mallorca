import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import {injectIntl} from "react-intl";
import {bindActionCreators, compose} from "redux";
import {connect} from "react-redux";

import {
  FormHelperText, IconButton,
  ListSubheader,
  MenuItem,
  TextField
} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CircularProgress from "@material-ui/core/CircularProgress";
import {NavigateBefore, NavigateNext} from "@material-ui/icons";

import {
  decrementPageToFormSelector,
  getFormSelectorData,
  incrementPageToFormSelector,
  searchByQueryTerm
} from "redux/genericForm";
import {
  getDataFormSelectorById,
  getLoadingFormSelectorById,
  getPageFormSelectorById,
  getQuerySearchFormSelectorById,
  getTotalPagesFormSelectorById
} from "redux/genericForm/selectors";

import LOVForm from "./LOVForm";
import GenericForm, {GenericPropTypes} from "./index";

const LOVElement = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [opts, setOpts] = useState(props.options);
  const [elementToAdd, setElementToAdd] = useState("");

  useEffect(()=>{
    props.responseKey && props.searchData(props.id,props.responseKey, props.page, props.sortBy, props.querySearch);
  },[props.page, props.querySearch]);

  useEffect(() => {
    setOpts(props.options);
  },[props.options]);

  const buttonInsideSelector = (icon, disabled = false, onClick) => (
    <IconButton disabled={disabled} onClick={e => {
      e.stopPropagation();
      onClick();
    }}>{icon}</IconButton>
  );

  const renderOpts = () => {
    return [
      <MenuItem key="search" style={{fontWeight: "bold", fontSize: "small"}} onKeyDown={e => e.stopPropagation()}>
        <TextField
          variant={"outlined"}
          size={"small"}
          label={"Buscar"}
          onClick={e => e.stopPropagation()}
          onChange={e => props.dispatchSearchTerm({name: props.id, text: e.target.value})}/>
      </MenuItem>,
      opts && opts
        .map((option, index) => <MenuItem key={index} value={option}>
          {typeof props.labelResponseKey === 'function'? props.labelResponseKey(option):option[props.labelResponseKey]}
        </MenuItem>),
      <ListSubheader key="pagination">
        {buttonInsideSelector(
          <NavigateBefore/>,
          !props.page,
          () => props.dispatchDecrementPage(props.id))}
        {buttonInsideSelector(
          <NavigateNext/>,
          props.page === props.totalPages,
          () => props.dispatchIncrementPage(props.id))}
      </ListSubheader>,
      <ListSubheader key="more-options">Más opciones</ListSubheader>,
      <MenuItem key="add-new" style={{fontWeight: "bold", fontSize: "small"}} onClick={e => {
        e.stopPropagation();
        setOpenModal(true);
      }}>Agregar nuevo</MenuItem>
    ];
  };

  return <>
    <TextField
      id={props.id}
      select
      label={props.label}
      onChange={props.onChange}
      value={opts.find(option => option.id === props.value.id)?opts.find(option => option.id === props.value.id):""}
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
      {renderOpts()}
    </TextField>
    <LOVForm
      title={props.label}
      formComponents={props.creationComponents}
      open={props.creationComponents && props.creationComponents.length>0? openModal:false}
      close={() => setOpenModal(false)} />
    {Boolean(props.error)? <FormHelperText>{props.error.message}</FormHelperText>:null}
  </>;
}

LOVElement.propTypes = {
  id: PropTypes.any,
  responseKey: PropTypes.string,
  labelResponseKey: PropTypes.any,
  label: PropTypes.any,
  onChange: PropTypes.func,
  value: PropTypes.any,
  variant: PropTypes.any,
  options: PropTypes.any,
  loading: PropTypes.bool,
  setValue: PropTypes.func,
  error: PropTypes.any,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  sortBy: PropTypes.string, // service order field
  creationComponents: PropTypes.any
};

const mapStateToProps = (state, props) => {
  return {
    loading: getLoadingFormSelectorById(state, props.id),
    options: getDataFormSelectorById(state, props.id),
    page: getPageFormSelectorById(state, props.id),
    totalPages: getTotalPagesFormSelectorById(state, props.id),
    querySearch: getQuerySearchFormSelectorById(state, props.id),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    searchData: bindActionCreators(getFormSelectorData, dispatch),
    dispatchIncrementPage: bindActionCreators(incrementPageToFormSelector, dispatch),
    dispatchDecrementPage: bindActionCreators(decrementPageToFormSelector, dispatch),
    dispatchSearchTerm: bindActionCreators(searchByQueryTerm, dispatch),
  };
  return actions;
};

export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  injectIntl
)(LOVElement);