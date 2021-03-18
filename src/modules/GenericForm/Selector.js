import React from "react";
import PropTypes from 'prop-types';
import {
  FormHelperText,
  InputLabel,
  MenuItem,
  Select
} from "@material-ui/core";
import {compose} from "redux";
import {injectIntl} from "react-intl";
import CircularProgress from "@material-ui/core/CircularProgress";

const Selector = ({key, placeHolder, variant, required, disabled, options, error, value, onChange, loading, ...props}) => {

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
      <InputLabel id={`${key}-select-label`} style={{padding: '10px'}}>{placeHolder}</InputLabel>
      <Select
        id={key}
        labelId={`${key}-select-label`}
        variant={variant ? variant : 'outlined'}
        value={value}
        defaultValue={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        inputProps={{
          name: placeHolder,
          id: key,
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
      {props.onBlur[key] && Boolean(error) ? <FormHelperText>{error.message}</FormHelperText> : null}
    </>
  );
};

Selector.propTypes = {
  id: PropTypes.any,
  value: PropTypes.any,
  onChange: PropTypes.func,
  placeHolder: PropTypes.string,
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  options: PropTypes.array,
  error: PropTypes.any
}

export default compose(
  injectIntl
)
(Selector);