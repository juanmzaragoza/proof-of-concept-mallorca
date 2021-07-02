import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import { compose } from "redux";
import {  FormattedMessage, injectIntl } from "react-intl";
import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import { withValidations } from "modules/wrappers";
import { useTabForm } from "../../../hooks/tab-form";
import { useParams } from "react-router-dom";



const CLIENTE_SECTION_INDEX = 0;

const ContactTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [
    touched,
    handleTouched,
    addValidity,
    formIsValid
  ] = useTabForm({ fields: { 0: false, 1: false }, setIsValid: props.setIsValid });


  const TELEFON = props.intl.formatMessage({ id: "Comun.telefono", defaultMessage: "Telefóno" });
  const EMAIL = props.intl.formatMessage({ id: "Proveedores.Contacto.email", defaultMessage: "Email" });
  const EMAIL_FACTURA = props.intl.formatMessage({ id: "Presupuestos.emailFactura", defaultMessage: "Email factura" });
  const CP_TEXT = props.intl.formatMessage({ id: "Clientes.cpTexto", defaultMessage: "Código postal texto" });
  const POBLACION_TEXT = props.intl.formatMessage({ id: "Clientes.poblacionTexto", defaultMessage: "Población texto" });
  const PROV_TEXT = props.intl.formatMessage({ id: "Clientes.provinciaTexto", defaultMessage: "Provincia texto" });




  const contactsConfig = [

    {
      placeHolder: TELEFON,
      type: 'input',
      key: 'telefon',
      breakpoints: {
        xs: 12,
        md: 4
      },
      validationType: "string",
      validations: props.stringValidations.minMaxValidation(1, 60)
    },

    {
      placeHolder: EMAIL,
      type: 'input',
      key: 'email',
      breakpoints: {
        xs: 12,
        md: 4
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 60),
        ...props.stringValidations.emailValidation()
      ]
    },
    {
        placeHolder: EMAIL_FACTURA,
        type: 'input',
        key: 'emailFactura',
        breakpoints: {
          xs: 12,
          md: 4
        },
        validationType: "string",
        validations: [
          ...props.stringValidations.minMaxValidation(1, 60),
          ...props.stringValidations.emailValidation()
        ]
      },
      {
        placeHolder: CP_TEXT,
        type: 'input',
        key: 'codiPostalText',
        breakpoints: {
          xs: 12,
          md: 4
        },
    
      },
      {
        placeHolder: POBLACION_TEXT,
        type: 'input',
        key: 'poblacioText',
        breakpoints: {
          xs: 12,
          md: 4
        },

      },
      {
        placeHolder: PROV_TEXT,
        type: 'input',
        key: 'provinciaText',
        breakpoints: {
          xs: 12,
          md: 4
        },

      },


    
  ];


  

  return (
    <Grid container >
      <Grid xs={12} item>
        <OutlinedContainer className="contact-tab-container" title={<FormattedMessage id={"Proveedores.tabs.contactos"} defaultMessage={"Contactos"} />}>
          <GenericForm
            formComponents={contactsConfig}
            emptyPaper={true}
            editMode={props.editMode}
            setFormData={setFormData}
            getFormData={getFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={value => addValidity(CLIENTE_SECTION_INDEX, value)}
            onBlur={(e) => handleTouched(CLIENTE_SECTION_INDEX)}
            {...props} />

        </OutlinedContainer>
      </Grid>
      
    </Grid>
  )
}

export default compose(
  React.memo,
  withValidations,
  injectIntl
)(ContactTab);