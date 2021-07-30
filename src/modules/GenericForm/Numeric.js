import React, {useState} from "react";
import NumberFormat from "react-number-format";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

const NumberFormatCustom = (props) => {
  const [enableChanges, setEnableChanges] = useState(false);
  const { inputRef, onChange, value, ...other } = props;

  return (
    <NumberFormat
      {...other}
      // Fix to allow put zero value on it
      value={value === ""? null:value}
      style={{ textAlign: 'right' }}
      getInputRef={inputRef}
      onFocus={e => {
        // Fix to enable changes only when the user inputs a value
        setEnableChanges(true);
      }}
      onValueChange={values => {
        enableChanges && onChange({
          target: {
            name: props.name,
            value: values.floatValue
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
                   prefix, suffix,
                   onChange, onBlur }) => {

  const handleChange = (event) => {
    onChange(event, event.target.value);
  }

  return <TextField
    id={id}
    name={id}
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
      inputComponent: NumberFormatCustom,
      startAdornment: prefix && <InputAdornment position="start">{prefix}</InputAdornment>,
      endAdornment: suffix && <InputAdornment position="end">{suffix}</InputAdornment>
    }}
  />
};

export default Numeric;