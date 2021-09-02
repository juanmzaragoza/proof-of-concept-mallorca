import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import { Formik } from "formik";
import * as yup from "yup";
import "./styles.scss";

import {
  Checkbox,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Switch,
} from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import FormControl from "@material-ui/core/FormControl";

import LOVAutocomplete from "./LOVAutocomplete";
import Selector from "./Selector";
import createYupSchema from "./yupSchemaCreator";
import Observations from "./Observations";
import Numeric from "./Numeric";
import WYSIWYGEditor from "./WYSIWYGEditor";

const GenericForm = ({ loading, ...props }) => {
  const formRef = useRef(null);
  const [isManualValidated, setIsManualValidated] = useState(false);
  const [initVal, setInitVal] = useState({});
  const [loadingAction, setLoadingAction] = useState(false);

  /** Get initial value by component*/
  const initialValues = {
    input: "",
    select: "",
    checkbox: false,
    radio: "",
    LOV: null,
    observations: "",
    numeric: 0.0,
    date: "",
    switch: "",
    wysiwyg: "",
  };

  /** Init to avoid uncontrolled inputs */
  const initValues = () => {
    const data = {};
    let value = {};
    for (const component of props.formComponents) {
      value =
        props.getFormData && props.getFormData(component.key)
          ? props.getFormData(component.key)
          : initialValues[component.type] || undefined;
      props.setFormData({ key: component.key, value });
      data[component.key] = value;
    }
    setInitVal(data);
    setIsManualValidated(false);
  };

  /** First effect: initialize the formik */
  useEffect(() => {
    initValues();
  }, []);

  /**
   * Effect to submit from outside
   */
  useEffect(() => {
    if (props.submitFromOutside) {
      const form = formRef.current;
      if (form) {
        if (typeof form.requestSubmit === "function") {
          form.requestSubmit();
        } else {
          form.dispatchEvent(new Event("submit", { cancelable: true }));
        }
      }
    }
  }, [props.submitFromOutside]);

  /**
   * Enable reinitialize to show errors even when the values change
   */
  useEffect(() => {
    if (props.formDataLoaded) {
      initValues();
    } else {
      setIsManualValidated(false);
    }
  }, [props.formDataLoaded]);

  const hasError = (key, formik) => {
    /** We added isSubmitted flag to show all the fields errors when the form is submitted */
    return (
      (((formik.touched && formik.touched[key]) || props.isSubmitted) &&
        Boolean(formik.errors[key])) ||
      (props.formErrors && Boolean(props.formErrors[key]))
    );
  };

  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const getMessageError = (key, formik) => {
    /** We added isSubmitted flag to show all the fields errors when the form is submitted */
    return (
      (((formik.touched && formik.touched[key]) || props.isSubmitted) &&
        Boolean(formik.errors[key]) &&
        formik.errors[key]) ||
      (props.formErrors && Boolean(props.formErrors[key])
        ? capitalize(props.formErrors[key].message)
        : "")
    );
  };

  const handleIsValid = (formik) => {
    props.handleIsValid && props.handleIsValid(formik.isValid);
  };

  const getField = (
    {
      id,
      type,
      variant,
      placeHolder,
      required,
      key,
      noEditable,
      disabledCreating,
      selector,
      disabled,
      text,
      prefix,
      suffix,
      extraQuery,
      format,
      fireActionOnBlur,
    },
    formik
  ) => {
    const noEnable = loading
      || (props.editMode && noEditable)
      || (!props.editMode && disabledCreating)
      || loadingAction
      || disabled;
    const identification = id ? id : key;

    const handleChange = (e, value) => {
      Boolean(key) && props.setFormData({ key, value });
      handleIsValid(formik);
    };

    const handleBlur = (e) => {
      formik.handleBlur(e);
      handleIsValid(formik);
      props.onBlur && props.onBlur(e);

      if (fireActionOnBlur) {
        setLoadingAction(true);
        const firedAction = fireActionOnBlur({ key, getFormData: props.getFormData });
        if(Array.isArray(firedAction)){
          Promise.all(firedAction)
            .then(results => {
              results.map(data =>
                Object.keys(data).map(key => {
                  props.setFormData({ key, value: data[key]});
                })
              );
              handleIsValid(formik);
            })
            .catch(err => {
              console.log(err);
            })
            .finally(() => {
              setLoadingAction(false);
            });
        } else{
          firedAction
            .then(data => {
              Object.keys(data).map(key => {
                props.setFormData({ key, value: data[key]});
              });
              handleIsValid(formik);
            })
            .catch(err => {
              console.log(err);
            })
            .finally(() => {
              setLoadingAction(false);
            });
        }
      }
    };

    switch (type) {
      case "input":
        return (
          <TextField
            id={identification}
            variant={variant ? variant : "standard"}
            size="small"
            onChange={(e, v, r) => {
              handleChange(e, e.currentTarget.value);
              formik.handleChange(e);
            }}
            value={
              props.getFormData && props.getFormData(key)
                ? props.getFormData(key)
                : ""
            }
            label={placeHolder}
            required={Boolean(required)}
            error={hasError(key, formik)}
            helperText={getMessageError(key, formik)}
            onBlur={(e) => handleBlur(e, key)}
            type={"text"}
            disabled={noEnable}
            multiline={Boolean(text && text.multiline)}
            rows={text && text.multiline}
          />
        );
      case "numeric":
        return (
          <Numeric
            id={identification}
            variant={variant ? variant : "standard"}
            size="small"
            onChange={(e, v) => {
              handleChange(e, v);
              formik.setFieldValue(key, v);
            }}
            value={
              props.getFormData && props.getFormData(key)
                ? props.getFormData(key)
                : 0
            }
            label={placeHolder}
            required={Boolean(required)}
            error={hasError(key, formik)}
            helperText={getMessageError(key, formik)}
            onBlur={(e) => handleBlur(e, key)}
            disabled={noEnable}
            prefix={prefix}
            suffix={suffix}
            format={format}
          />
        );
      case "select":
        return (
          <Selector
            id={identification}
            placeHolder={placeHolder}
            variant={variant}
            required={required}
            disabled={noEnable}
            options={selector.options}
            error={hasError(key, formik)}
            helperText={getMessageError(key, formik)}
            onBlur={(e) => handleBlur(e, key)}
            value={
              props.getFormData && props.getFormData(key)
                ? props.getFormData(key)
                : ""
            }
            onChange={(e) => {
              handleChange(e, e.target.value);
              formik.handleChange(e);
            }}
          />
        );
      case "checkbox":
  
        return (
          <FormControlLabel
            control={
              <Checkbox
                id={identification}
                checked={
                  props.getFormData && props.getFormData(key)
                    ? props.getFormData(key)
                    : ""
                }
                onChange={(e) =>
                  props.setFormData({ key, value: e.currentTarget.checked })
                }
                name={key}
                disabled={noEnable}
                color="primary"
                required={required}
                onBlur={(e) => handleBlur(e, key)}
              />
            }
            label={placeHolder}
          />
        );
      case "radio":
        return (
          <>
            <FormLabel component="legend">{placeHolder}</FormLabel>
            <RadioGroup
              id={identification}
              aria-label={key}
              name={key}
              value={
                props.getFormData && props.getFormData(key)
                  ? props.getFormData(key)
                  : ""
              }
              onChange={(e) =>
                props.setFormData({ key, value: e.currentTarget.value })
              }
              onBlur={(e) => handleBlur(e, key)}
              required={required}
              disabled={noEnable}
            >
              {selector &&
                selector.options.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                  />
                ))}
            </RadioGroup>
          </>
        );
      case "LOV":
        return (
          <LOVAutocomplete
            id={identification}
            responseKey={selector.key}
            labelResponseKey={selector.labelKey}
            sortBy={selector.sort}
            label={placeHolder}
            onChange={(e, v, r) => {
              e.stopPropagation();
              handleChange(e, v);
              formik.setFieldValue(key, v);
            }}
            value={
              props.getFormData && props.getFormData(key)
                ? props.getFormData(key)
                : null
            }
            setValue={(e) => props.setFormData({ key, value: e.value })}
            options={selector.options}
            variant={variant}
            error={hasError(key, formik)}
            helperText={getMessageError(key, formik)}
            required={Boolean(required)}
            disabled={noEnable}
            cannotCreate={selector.cannotCreate}
            creationComponents={selector.creationComponents}
            onBlur={(e) => handleBlur(e, key)}
            relatedWith={selector.relatedWith}
            transform={selector.transform}
            advancedSearchColumns={selector.advancedSearchColumns}
            extraQuery={extraQuery}
          />
        );
      case "observations":
        return (
          <Observations
            id={identification}
            placeHolder={placeHolder}
            required={Boolean(required)}
            disabled={noEnable}
            value={
              props.getFormData && props.getFormData(key)
                ? props.getFormData(key)
                : ""
            }
            onChange={(e, v) => {
              handleChange(e, v);
              formik.setFieldValue(key, v);
            }}
            onBlur={(e) => handleBlur(e, key)}
          />
        );
      case "date":
        return (
          <KeyboardDatePicker
            id={identification}
            label={placeHolder}
            placeholder={"dd/mm/yyyy"}
            required={Boolean(required)}
            disableToolbar
            variant={variant ? variant : "inline"}
            format="MM/DD/yyyy"
            value={
              props.getFormData && props.getFormData(key)
                ? props.getFormData(key)
                : null
            }
            onChange={(e, v) => {
              handleChange(e, e && e.toDate());
              formik.setFieldValue(key, e && e.toDate());
            }}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            error={hasError(key, formik)}
            helperText={getMessageError(key, formik)}
            onBlur={(e) => handleBlur(e, key)}
            disabled={noEnable}
          />
        );
      case "switch":
        return (
          <FormControlLabel
            control={
              <Switch
                id={identification}
                checked={props.getFormData && props.getFormData(key) === "S"}
                onChange={(e) =>
                  props.setFormData({
                    key,
                    value: e.currentTarget.checked ? "S" : "N",
                  })
                }
                name={key}
                disabled={noEnable}
                color="primary"
                onBlur={(e) => handleBlur(e, key)}
              />
            }
            label={placeHolder}
          />
        );
      case "wysiwyg":
        return (
          <WYSIWYGEditor
            id={identification}
            disabled={noEnable}
            value={
              props.getFormData && props.getFormData(key)
                ? props.getFormData(key)
                : ""
            }
            required={Boolean(required)}
            placeHolder={placeHolder}
            rows={text && text.multiline}
            error={hasError(key, formik)}
            helperText={getMessageError(key, formik)}
            onChange={(e, v) => {
              handleChange(e, v);
              formik.setFieldValue(key, v);
            }}
            onBlur={(e) => handleBlur(e, key)}
          />
        );
      default:
        return;
    }
  };

  const renderField = (params, formik) => {
    const { key, breakpoints } = params;
    return (
      <Grid
        item
        key={key}
        xs={breakpoints ? breakpoints.xs : 12}
        sm={breakpoints ? breakpoints.sm : false}
        md={breakpoints ? breakpoints.md : false}
        lg={breakpoints ? breakpoints.lg : false}
      >
        <FormControl
          className="form-control-filled-input"
          variant="filled"
          error={hasError(key, formik)}
          required={params.required}
        >
          {getField(params, formik)}
        </FormControl>
      </Grid>
    );
  };

  const withPaper = (component) => {
    return !props.emptyPaper ? <Paper>{component}</Paper> : component;
  };

  const { formComponents } = props;

  // frontend validation
  const yepSchema = formComponents
    .map(({ key, ...component }) => ({ ...component, id: key }))
    .reduce(createYupSchema, {});
  const validateSchema = yup.object().shape(yepSchema);

  const OnRenderedComponent = ({ formik }) => {
    useEffect(() => {
      if (!isManualValidated && !formik.isValidating) {
        formik.validateForm().then((data) => {
          props.handleIsValid && props.handleIsValid(isEmpty(data));
        });
        setIsManualValidated(true);
      }
    }, [isManualValidated]);
    return null;
  };

  return (
    <div className="generic-form-root">
      {withPaper(
        <Formik
          initialValues={initVal}
          validationSchema={validateSchema}
          validateOnMount={false}
          validateOnChange
          validateOnBlur
          enableReinitialize={true}
          onSubmit={(values, actions) => {
            props.onSubmit(values);
            actions.setSubmitting(false);
          }}
        >
          {(formik) => {
            return (
              <form
                noValidate
                ref={formRef}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleIsValid(formik);
                  formik.handleSubmit(e);
                }}
              >
                <Grid
                  container
                  spacing={
                    props.containerSpacing !== undefined
                      ? props.containerSpacing
                      : 1
                  }
                >
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    container
                    style={props.fieldsContainerStyles}
                  >
                    {/* BEGINING of 1st Column */}
                    {formComponents.map((component, index) => (
                      <React.Fragment key={index}>
                        {renderField(component, formik)}
                      </React.Fragment>
                    ))}
                  </Grid>
                </Grid>
                <OnRenderedComponent formik={formik} />
              </form>
            );
          }}
        </Formik>
      )}
    </div>
  );
};

GenericForm.propTypes = {
  containerSpacing: PropTypes.number,
  formComponents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any,
      
      type: PropTypes.oneOf([
        "input",
        "select",
        "checkbox",
        "radio",
        "LOV",
        "observations",
        "numeric",
        "date",
        "switch",
        "wysiwyg",
      ]),
      variant: PropTypes.oneOf(["filled", "outlined", "standard"]),
      placeHolder: PropTypes.string,
      required: PropTypes.bool,
      key: PropTypes.string,
      noEditable: PropTypes.bool,
      disabledCreating: PropTypes.bool,
      selector: PropTypes.shape({
        key: PropTypes.any,
        labelKey: PropTypes.any,
        id: PropTypes.any,
        options: PropTypes.array,
        creationComponents: PropTypes.array,
        cannotCreate: PropTypes.bool,
        // for example, see the LOVAutocomplete component
        relatedWith: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string.isRequired,
            filterBy: PropTypes.string.isRequired,
            keyValue: PropTypes.string,
          })
        ),
      }),
      disabled: PropTypes.bool,
      text: PropTypes.shape({
        multiline: PropTypes.number,
      }),
      validationType: PropTypes.string,
      validations: PropTypes.arrayOf(
        PropTypes.shape({
          type: PropTypes.string.isRequired,
          value: PropTypes.string,
          error_message: PropTypes.string,
        })
      ),
      prefix: PropTypes.string,
      suffix: PropTypes.string,
      // it only used in the numeric component (react-number-format)
      format: PropTypes.any,
      // when you request filtering by extra fields in some request
      extraQuery: PropTypes.arrayOf(
        PropTypes.shape({
          columnName: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
          exact: PropTypes.bool,
        })
      ),
      // when it's defined, fire an action on blur
      fireActionOnBlur: PropTypes.func,
    })
  ),
  
  onSubmit: PropTypes.func,
  formDataLoaded: PropTypes.bool,
  setFormData: PropTypes.func,
  getFormData: PropTypes.func,
  formErrors: PropTypes.object,
  submitFromOutside: PropTypes.bool,
  editMode: PropTypes.bool,
  emptyPaper: PropTypes.bool,
  fieldsContainerStyles: PropTypes.object,
};
export default GenericForm;
