import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {FormHelperText, Grid, InputLabel, Paper, Select, TextField} from '@material-ui/core';
import FormControl from "@material-ui/core/FormControl";
import makeStyles from "@material-ui/core/styles/makeStyles";

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

const GenericForm = (props) => {
  const formRef = useRef(null);
  const [onBlur, setOnBlur] = useState({});

  const {
    root,
    formControlsFilledInput
  } = useStyles();

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

  const getField = ({type, variant, placeHolder, required, key, noEditable, selector}) => {
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
            disabled={props.editMode && noEditable}/>
        );
      case 'select':
        return (
        <>
          <InputLabel htmlFor={key}>{placeHolder}</InputLabel>
          <Select
            variant={variant ? variant : 'outlined'}
            value={props.formData && props.formData[key] ? props.formData[key] : ""}
            onChange={e => props.setFormData({...props.formData, [key]: e.currentTarget.value})}
            required={required}
            inputProps={{
              name: placeHolder,
              id: key,
            }}
          >
            <option aria-label="None" value="" />
            {selector && selector.options.map(option => <option key={option.value} value={option.value}>{option.label}</option>) }
          </Select>
          {onBlur[key] && Boolean(error)? <FormHelperText>{error.message}</FormHelperText>:null}
        </>
        )
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
          <Grid container spacing={1}>
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
  formComponents: PropTypes.array,
  onSubmit: PropTypes.func,
  formData: PropTypes.object,
  setFormData: PropTypes.func,
  formErrors: PropTypes.object,
  submitFromOutside: PropTypes.bool,
  editMode: PropTypes.bool,
  emptyPaper: PropTypes.bool,
  fieldsContainerStyles: PropTypes.string
};
export default GenericForm;