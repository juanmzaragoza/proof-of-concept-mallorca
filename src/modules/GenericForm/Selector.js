import React, {useEffect} from "react";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import PropTypes from 'prop-types';
import {injectIntl} from "react-intl";
import {
  FormHelperText,
  InputLabel,
  MenuItem,
  Select
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

import {
  getDataFormSelectorById,
  getLoadingFormSelectorById,
} from "redux/genericForm/selectors";
import { getFormSelectorData } from "redux/genericForm";


const Selector = ({id, placeHolder, variant, required, disabled, options, error, value, onChange, onBlur, loading, showError, ...props}) => {

  useEffect(()=>{
    props.responseKey && props.searchData({id, key: props.responseKey});
  },[]);

  const renderOptions = () => {
    return [
      <MenuItem key="none" aria-label="None" value="" disabled>
        {props.intl.formatMessage({id: 'Comun.seleccione', defaultMessage: 'Seleccione...'})}
      </MenuItem>,
      ...options.map(option => <MenuItem key={option.value}
                                         value={option.value}>{option.label}</MenuItem>)
    ]
  };

  return (
    <>
      <InputLabel id={`${id}-select-label`} style={{padding: '10px'}}>{placeHolder}</InputLabel>
      <Select
        id={id}
        labelId={`${id}-select-label`}
        variant={variant ? variant : 'outlined'}
        value={value}
        defaultValue={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        disabled={disabled}
        inputProps={{
          name: placeHolder,
          id: id,
        }}
      >
        {!loading?
          renderOptions()
          :
          <MenuItem value="" disabled >
            <CircularProgress size={20}/>
            &nbsp;{props.intl.formatMessage({id: 'Comun.cargando', defaultMessage: 'Cargando'})}...
          </MenuItem>
        }
      </Select>
      {showError && Boolean(error) ? <FormHelperText>{error.message}</FormHelperText> : null}
    </>
  );
};

Selector.propTypes = {
  id: PropTypes.any,
  value: PropTypes.any,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  placeHolder: PropTypes.string,
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  showError: PropTypes.bool,
  options: PropTypes.array,
  error: PropTypes.any,
  responseKey: PropTypes.string,
}

const mapStateToProps = (state, props) => {
  const options = getDataFormSelectorById(state, props.id);
  return {
    loading: getLoadingFormSelectorById(state, props.id),
    options: options.length? options:props.options,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    searchData: bindActionCreators(getFormSelectorData, dispatch),
  };
  return actions;
};

export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  injectIntl
)
(Selector);