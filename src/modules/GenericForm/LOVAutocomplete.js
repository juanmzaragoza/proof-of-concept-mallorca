import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import {bindActionCreators, compose} from "redux";

import {Autocomplete, createFilterOptions} from "@material-ui/lab";
import {FormHelperText, MenuItem, TextField} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import LOVForm from "./LOVForm";
import {
  getDataFormSelectorById,
  getLoadingFormSelectorById,
  getPageFormSelectorById,
  getQuerySearchFormSelectorById,
  getTotalPagesFormSelectorById
} from "redux/genericForm/selectors";
import {
  decrementPageToFormSelector,
  getFormSelectorData,
  incrementPageToFormSelector,
  searchByQueryTerm
} from "redux/genericForm";

const filter = createFilterOptions();

const ADD_TYPE = "add";

const LOVAutocomplete = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [opts, setOpts] = useState([]);

  useEffect(()=>{
    props.responseKey && props.searchData(props.id,props.responseKey, props.page, props.sortBy, props.querySearch);
  },[props.page, props.querySearch]);

  useEffect(() => {
    setOpts(props.options);
  },[props.options]);

  return (
    <>
    <Autocomplete
      id={props.id}
      options={opts}
      value={props.value}
      onChange={(e, newValue) => {
        e.stopPropagation();
        if(newValue && newValue.id === ADD_TYPE){
          setOpenModal(true);
        } else{
          props.onChange(e, newValue);
        }
      }}
      getOptionLabel={(option) => {
        if(option.id && option.id !== ADD_TYPE) {
          return (typeof props.labelResponseKey === 'function')? props.labelResponseKey(option):option[props.labelResponseKey];
        } else {
          return option.title;
        }
      }}
      getOptionSelected={(option, value) => {
        if(option.id === value.id && value.id === ADD_TYPE){
          return true;
        } else{
          return option.id === value.id;
        }
      }}
      getOptionDisabled={(option) => props.loading && option.id === ADD_TYPE}
      loading={props.loading}
      disabled={props.disabled}
      required={props.required}
      noOptionsText={props.intl.formatMessage({id: "LOVElement.sin_resultados", defaultMessage: "Sin resultados "})}
      loadingText={`${props.intl.formatMessage({id: "Comun.cargando", defaultMessage: "Cargando"})}...`}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        if (params.inputValue !== '') {
          filtered.push({
            id: ADD_TYPE,
            inputValue: params.inputValue,
            title: `${props.intl.formatMessage({id: "LOVElement.agregar_nuevo", defaultMessage: "Agregar \"{name}\""}, {name: params.inputValue})}`,
          });
        }
        return filtered;
      }}
      onInputChange={(event, newInputValue) => {
        props.dispatchSearchTerm({name: props.id, text: newInputValue});
      }}
      renderInput={(params) =>
        <TextField {...params}
                   label={props.label}
                   variant={props.variant ? props.variant : "outlined"}
                   InputProps={{
                     ...params.InputProps,
                     startAdornment: (
                       <InputAdornment position="start">
                         {props.loading? <CircularProgress size={20}/>:<AddCircleOutlineIcon/>}
                       </InputAdornment>
                     ),
                   }}/>}
    />
    {props.creationComponents && props.creationComponents.length>0 &&
    <LOVForm
      id={props.id}
      title={props.label}
      formComponents={props.creationComponents}
      open={openModal}
      close={(data) => {
        if(data) {
          const list = opts;
          list.push(data);
          setOpts(list);
          props.setValue({value: data});
        }
        setOpenModal(false);
      }} />}
    {Boolean(props.error)? <FormHelperText>{props.error.message}</FormHelperText>:null}
    </>
  );
};

LOVAutocomplete.propTypes = {
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
)(LOVAutocomplete);