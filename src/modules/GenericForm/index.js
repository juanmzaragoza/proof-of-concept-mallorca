import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

import {
  Checkbox,
  FormControlLabel,
  FormHelperText, FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField
} from '@material-ui/core';
import FormControl from "@material-ui/core/FormControl";
import makeStyles from "@material-ui/core/styles/makeStyles";
import LOVElement from "./LOVElement";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    margin: '1% 0'
  },
  formControlsFilledInput: {
    width: '100%',
    padding: '10px'
  },
});

const GenericForm = ({loading, ...props}) => {
  const formRef = useRef(null);
  const [onBlur, setOnBlur] = useState({});

  const {
    root,
    formControlsFilledInput
  } = useStyles();

  // init to avoid uncontrolled inputs
  useEffect(() => {
    for (const component of props.formComponents) {
      props.setFormData({...props.formData, [component.key]: ""})
    }
  },[]);

  useEffect(() => {
    if(props.submitFromOutside){
      const form = formRef.current;
      if (form) {
        if (typeof form.requestSubmit === 'function') {
          form.requestSubmit();
        } else {
          form.dispatchEvent(new Event('submit', {cancelable: true}));
        }
      }
    }
  },[props.submitFromOutside]);

  const getError = (key) => {
    return props.formErrors && props.formErrors[key]? props.formErrors[key]:"";
  }

  const getField = ({type, variant, placeHolder, required, key, noEditable, selector, disabled}) => {
    const error = getError(key);
    switch(type) {
      case 'input':
        return (
          <TextField
            variant={variant ? variant : 'standard'}
            size="small"
            onChange={e => props.setFormData({...props.formData, [key]: e.currentTarget.value})}
            value={props.formData && props.formData[key] ? props.formData[key] : ""}
            label={placeHolder}
            required={Boolean(required)}
            error={onBlur[key] && Boolean(error)}
            helperText={onBlur[key] && Boolean(error) ? error.message : ''}
            onBlur={() => setOnBlur({...onBlur, [key]: true})}
            type={"text"}
            disabled={loading || (props.editMode && (noEditable || disabled))}/>
        );
      case 'select':
        return (
        <>
          <InputLabel id={`${key}-select-label`} style={{padding: '10px'}}>{placeHolder}</InputLabel>
          <Select
            labelId={`${key}-select-label`}
            id={key}
            variant={variant ? variant : 'outlined'}
            value={props.formData && props.formData[key] ? props.formData[key] : ""}
            onChange={e => props.setFormData({...props.formData, [key]: e.target.value})}
            required={required}
            disabled={loading || (props.editMode && (noEditable || disabled))}
            inputProps={{
              name: placeHolder,
              id: key,
            }}
          >
            <option aria-label="None" value="" />
            {selector && selector.options.map(option => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>) }
          </Select>
          {onBlur[key] && Boolean(error)? <FormHelperText>{error.message}</FormHelperText>:null}
        </>
        );
      case 'checkbox':
        return (
          <FormControlLabel
            control={
              <Checkbox
                checked={props.formData && props.formData[key] ? props.formData[key] : false}
                onChange={e => props.setFormData({...props.formData, [key]: e.currentTarget.checked})}
                name={key}
                disabled={loading || (props.editMode && (noEditable || disabled))}
                color="primary"
              />
            }
            label={placeHolder}
          />
        );
      case 'radio':
        return (
          <>
            <FormLabel component="legend">{placeHolder}</FormLabel>
            <RadioGroup aria-label={key}
                        name={key}
                        value={props.formData && props.formData[key] ? props.formData[key] : ""}
                        onChange={e => props.setFormData({...props.formData, [key]: e.currentTarget.value})}
                        required={required}
                        disabled={loading || (props.editMode && (noEditable || disabled))}>
              {selector && selector.options.map(option => <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />) }
            </RadioGroup>
          </>
        )
      case 'LOV':
        return (
          <LOVElement
            id={key}
            responseKey={selector.key}
            labelResponseKey={selector.labelKey}
            sortBy={selector.sort}
            label={placeHolder}
            onChange={e => {
              e.stopPropagation();
              props.setFormData({...props.formData, [key]: e.target.value})
            }}
            value={props.formData && props.formData[key] ? props.formData[key] : ""}
            setValue={e => props.setFormData({...props.formData, [key]: e.value})}
            options={selector.options}
            variant={variant}
            error={getError(key)}
            required={Boolean(required)}
            disabled={props.editMode && (noEditable || disabled)}
            creationComponents={selector.creationComponents} />
        );
      default:
        return;
    }
  };

  const renderField = params => {
    const {
      key,
      breakpoints,
    } = params;
    return (
      <Grid item
            key={key}
            xs={breakpoints? breakpoints.xs:12}
            sm={breakpoints? breakpoints.sm:false}
            md={breakpoints? breakpoints.md:false}
            lg={breakpoints? breakpoints.lg:false} >
        <FormControl className={formControlsFilledInput} variant="filled" error={Boolean(getError(key))}>
          {getField(params)}
        </FormControl>
      </Grid>)
  }

  const withPaper = (component) => {
    return !props.emptyPaper?
      (<Paper>
        {component}
      </Paper>)
      :
      (component)
  };

  const {
    formComponents
  } = props;
  return (
    <div className={root}>
      {withPaper(
        <form ref={formRef} onSubmit={(e) => {
          e.preventDefault();
          if (props.onSubmit) props.onSubmit(props.formData);
        }}>
          <Grid container spacing={props.containerSpacing !== undefined? props.containerSpacing:1}>
            <Grid item xs={12} sm={12} container style={props.fieldsContainerStyles}>{/* BEGINING of 1st Column */}
              {
                formComponents.map((component, index) => <React.Fragment key={index}>{renderField(component)}</React.Fragment>)
              }
            </Grid>
          </Grid>
        </form>
      )}
    </div>
  )
};

GenericForm.propTypes = {
  containerSpacing: PropTypes.number,
  formComponents: PropTypes.array,
  onSubmit: PropTypes.func,
  formData: PropTypes.object,
  setFormData: PropTypes.func,
  formErrors: PropTypes.object,
  submitFromOutside: PropTypes.bool,
  editMode: PropTypes.bool,
  emptyPaper: PropTypes.bool,
  fieldsContainerStyles: PropTypes.object,
  selector: PropTypes.shape({
    key: PropTypes.any,
    labelKey: PropTypes.any,
    options: PropTypes.array
  })
};
export default GenericForm;