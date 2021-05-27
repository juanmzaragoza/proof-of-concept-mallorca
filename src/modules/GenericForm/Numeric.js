import React, { useState } from "react";
import NumberFormat from "react-number-format";
import TextField from "@material-ui/core/TextField";

const NumberFormatCustom = (props) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        });
      }}
      thousandSeparator={'.'}
      decimalSeparator={','}
    />
  );
};

const Numeric = ({ id,
                   variant = 'standard',
                   size = 'small',
                   required = false,
                   value, label, error, helperText, disabled,
                   onChange, onBlur }) => {

  const handleChange = (event) => {
    onChange(event, parseFloat(event.target.value));
  }

  return <TextField
    id={id}
    namee={id}
    variant={variant}
    size={size}
    onChange={handleChange}
    value={value}
    label={label}
    required={required}
    error={error}
    helperText={helperText}
    onBlur={onBlur}
    disabled={disabled}
    InputProps={{
      inputComponent: NumberFormatCustom
    }}
  />
}

export default Numeric;