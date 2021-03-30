import React from "react";
import {compose} from "redux";
import PropTypes from 'prop-types';
import {injectIntl} from "react-intl";
import {
  FormHelperText,
  InputLabel,
  MenuItem,
  Select
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const Selector = ({id, placeHolder, variant, required, disabled, options, error, helperText, value, onChange, onBlur, loading, ...props}) => {

  const renderOptions = () => {
    return [
      <MenuItem key="none" aria-label="None" value="" disabled>
        {props.intl.formatMessage({id: 'Comun.seleccione', defaultMessage: 'Seleccione...'})}
      </MenuItem>,
      ...options.map(option =>
        <MenuItem
          key={option.value}
          value={option.value}>
            {props.intl.formatMessage({id: option.labelId, defaultMessage: option.label})}
        </MenuItem>)
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
      {Boolean(error)? <FormHelperText>{helperText}</FormHelperText> : null}
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
  options: PropTypes.array,
  error: PropTypes.bool,
  helperText: PropTypes.any,
  responseKey: PropTypes.string,
}

export default compose(
  injectIntl
)
(Selector);