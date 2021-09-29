import React from "react";
import {  injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";
import GenericForm from "modules/GenericForm";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import { useTabForm } from "hooks/tab-form";

const SUPPLIERS_ORDERS_TEXT_SECTION_INDEX = 0;


const TextosTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [SUPPLIERS_ORDERS_TEXT_SECTION_INDEX]: true,

    },
    setIsValid: props.setIsValid,
  });

 
  const textosConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "OfertaProveedores.texto1",
        defaultMessage: "Texto 1 ",
      }),
      type: "input",
      key: "texte1",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      text: {
        multiline: 5,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 1000)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "OfertaProveedores.texto2",
        defaultMessage: "Texto 2 ",
      }),
      type: "input",
      key: "texte2",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      text: {
        multiline: 5,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 1000)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "OfertaProveedores.texto3",
        defaultMessage: "Texto 3 ",
      }),
      type: "input",
      key: "texte3",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      text: {
        multiline: 5,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 1000)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "OfertaProveedores.texto4",
        defaultMessage: "Texto 4 ",
      }),
      type: "input",
      key: "texte4",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      text: {
        multiline: 5,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 1000)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "OfertaProveedores.texto5",
        defaultMessage: "Texto 5 ",
      }),
      type: "input",
      key: "texte5",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      text: {
        multiline: 5,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 1000)],
    },
  ];



  return (
    <Grid container>
      <Grid xs={12} item>
      <GenericForm
          formComponents={textosConfig}
          emptyPaper={true}
          setFormData={setFormData}
          getFormData={getFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) => addValidity(SUPPLIERS_ORDERS_TEXT_SECTION_INDEX, value)}
          onBlur={(e) => handleTouched(SUPPLIERS_ORDERS_TEXT_SECTION_INDEX)}
          {...props}
        />
      </Grid>
     
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(TextosTab);
