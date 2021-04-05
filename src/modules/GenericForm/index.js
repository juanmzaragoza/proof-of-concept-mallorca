import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {isEmpty,isEqual} from 'lodash';
import {Formik} from 'formik';
import * as yup from "yup";
import './styles.scss';

import {
  Checkbox,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField
} from '@material-ui/core';
import FormControl from "@material-ui/core/FormControl";

import LOVAutocomplete from "./LOVAutocomplete";
import Selector from "./Selector";
import createYupSchema from "./yupSchemaCreator";

const GenericForm = ({loading, ...props}) => {
  const formRef = useRef(null);
  const [prevProps, setPrevProps] = useState({});
  const [enableReinitialize, setEnableReinitialize] = useState(false);

  // init to avoid uncontrolled inputs
  useEffect(() => {
    for (const component of props.formComponents) {
      props.setFormData({...props.formData, [component.key]: ""})
    }
    props.handleIsValid && props.handleIsValid(false);
  },[]);

  /*
   * Effect to submit from outside
   */
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

  /*
   * Enable reinitialize to show errors even when the values change
   */
  useEffect(()=>{
    if(isEmpty(prevProps) && !isEqual(props.formData,prevProps)){
      setEnableReinitialize(true);
    } else{
      setEnableReinitialize(false);
    }
    setPrevProps(props.formData);
  },[props.formData]);

  const hasError = (key, formik) => {
    return formik.touched && formik.touched[key] && (Boolean(formik.errors[key])) ||
      (props.formErrors && Boolean(props.formErrors[key]));
  }

  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  const getMessageError = (key, formik) => {
    return formik.touched && formik.touched[key] && (Boolean(formik.errors[key]) && formik.errors[key]) ||
      (props.formErrors && Boolean(props.formErrors[key])? capitalize(props.formErrors[key].message) : '');
  }

  const handleIsValid = (formik) => {
    console.log("handleIsValid", formik.errors, formik.isValid);
    props.handleIsValid && props.handleIsValid(formik.isValid);
  }

  const getField = ({type, variant, placeHolder, required, key, noEditable, selector, disabled}, formik) => {
    const noEnable = loading || (props.editMode && noEditable) || disabled;

    const handleChange = (e, value) => {
      const values = {...props.formData, [key]: value};
      Boolean(key) && props.setFormData(values);
      formik.handleChange(e);
      handleIsValid(formik);
    };

    const handleBlur = (e) => {
      formik.handleBlur(e);
      handleIsValid(formik);
      props.onBlur && props.onBlur(e);
    }

    switch(type) {
      case 'input':
        return (
          <TextField
            id={key}
            variant={variant ? variant : 'standard'}
            size="small"
            onChange={ (e,v,r) => {
              handleChange(e, e.currentTarget.value);
            }}
            value={props.formData && props.formData[key] ? props.formData[key] : ""}
            label={placeHolder}
            required={Boolean(required)}
            error={hasError(key,formik)}
            helperText={getMessageError(key, formik)}
            onBlur={handleBlur}
            type={"text"}
            disabled={noEnable}/>
        );
      case 'select':
        return (
          <Selector
            id={key}
            placeHolder={placeHolder}
            variant={variant}
            required={required}
            disabled={noEnable}
            options={selector.options}
            error={hasError(key,formik)}
            helperText={getMessageError(key, formik)}
            onBlur={handleBlur}
            value={props.formData && props.formData[key] ? props.formData[key] : ""}
            onChange={e => props.setFormData({...props.formData, [key]: e.target.value})} />
        );
      case 'checkbox':
        return (
          <FormControlLabel
            control={
              <Checkbox
                checked={props.formData && props.formData[key] ? props.formData[key] : false}
                onChange={e => props.setFormData({...props.formData, [key]: e.currentTarget.checked})}
                name={key}
                disabled={noEnable}
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
                        disabled={noEnable}>
              {selector && selector.options.map(option => <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />) }
            </RadioGroup>
          </>
        )
      case 'LOV':
        return (
          <LOVAutocomplete
            id={key}
            responseKey={selector.key}
            labelResponseKey={selector.labelKey}
            sortBy={selector.sort}
            label={placeHolder}
            onChange={(e,v,r) => {
              e.stopPropagation();
              handleChange(e, v);
            }}
            value={props.formData && props.formData[key] ? props.formData[key] : null}
            setValue={e => props.setFormData({...props.formData, [key]: e.value})}
            options={selector.options}
            variant={variant}
            error={hasError(key,key)}
            helperText={getMessageError(key,key)}
            required={Boolean(required)}
            disabled={(props.editMode && noEditable) || disabled}
            cannotCreate={selector.cannotCreate}
            creationComponents={selector.creationComponents}
            onBlur={handleBlur}
            relatedWith={selector.relatedWith} />
        );
      default:
        return;
    }
  };

  const renderField = (params, formik) => {
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
        <FormControl className="form-control-filled-input" variant="filled" error={hasError(key,formik)}>
          {getField(params, formik)}
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

  // frontend validation
  const yepSchema = formComponents.map(({key,...component}) => ({id: key, ...component})).reduce(createYupSchema, {});
  const validateSchema = yup.object().shape(yepSchema);

  return (
    <div className="generic-form-root">
      {withPaper(
        <Formik
          initialValues={props.formData}
          validationSchema={validateSchema}
          validateOnMount={false}
          validateOnChange
          validateOnBlur
          enableReinitialize={enableReinitialize}
          onSubmit={(values, actions) => {
            if (props.onSubmit) props.onSubmit(props.formData);
            actions.setSubmitting(false);
          }}>
          {formik => {
            return (
            <form ref={formRef} onSubmit={(e) => {
              e.preventDefault();
              handleIsValid(formik);
              formik.handleSubmit(e);
            }}>
              <Grid container spacing={props.containerSpacing !== undefined? props.containerSpacing:1}>
                <Grid item xs={12} sm={12} container style={props.fieldsContainerStyles}>{/* BEGINING of 1st Column */}
                  {
                    formComponents.map((component, index) => <React.Fragment key={index}>{renderField(component, formik)}</React.Fragment>)
                  }
                </Grid>
              </Grid>
            </form>
          )}}
        </Formik>
      )}
    </div>
  )
}

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
    options: PropTypes.array,
    creationComponents: PropTypes.array,
    cannotCreate: PropTypes.bool,
    // for example, see the LOVAutocomplete component
    relatedWith: PropTypes.shape({
      name: PropTypes.string.isRequired,
      filterBy: PropTypes.string.isRequired,
      keyValue: PropTypes.string,
    })
  }),
  validationType: PropTypes.string,
  validations: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    error_message: PropTypes.string,
  }))
};
export default GenericForm;