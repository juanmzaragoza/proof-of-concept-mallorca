import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import { compose } from "redux";
import { useParams } from "react-router-dom";
import OutlinedContainer from "../../../modules/shared/OutlinedContainer";
import { FormattedMessage, injectIntl } from "react-intl";
import GenericForm from "../../../modules/GenericForm";
import { withValidations } from "modules/wrappers";
import { useTabForm } from "../../../hooks/tab-form";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import ExpandableGrid from "modules/ExpandableGrid";

const ContactTab = ({ formData, setFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: { 0: true },
    setIsValid: props.setIsValid,
  });

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });
  const REGISTRO = props.intl.formatMessage({
    id: "Empresas.registroMercantil",
    defaultMessage: "registro Mercantil",
  });

  const TELEFON = props.intl.formatMessage({
    id: "Proveedores.Contacto.telefono",
    defaultMessage: "Telefóno",
  });

  const FAX = props.intl.formatMessage({
    id: "Proveedores.Contacto.fax",
    defaultMessage: "Fax",
  });

  const EMAIL = props.intl.formatMessage({
    id: "Proveedores.Contacto.email",
    defaultMessage: "Email",
  });

  const WWW = props.intl.formatMessage({
    id: "Proveedores.Contacto.web",
    defaultMessage: "WWW",
  });

  const contactsConfig = [
    {
      placeHolder: TELEFON,
      type: "input",
      key: "telefon",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "string",
      validations: props.stringValidations.minMaxValidation(1, 60),
    },
    {
      placeHolder: FAX,
      type: "input",
      key: "fax",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "string",
      validations: props.stringValidations.minMaxValidation(1, 60),
    },
    {
      placeHolder: EMAIL,
      type: "input",
      key: "email",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 60),
        ...props.stringValidations.emailValidation(),
      ],
    },

    {
      placeHolder: WWW,
      type: "input",
      key: "web",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "string",
      validations: props.stringValidations.minMaxValidation(1, 60),
    },
    {
      placeHolder: REGISTRO,
      type: "input",
      key: "registreMercantil",
      breakpoints: {
        xs: 12,
        md: 12,
      },
      validationType: "string",
      validations: props.stringValidations.minMaxValidation(1, 250),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Empresas.libro",
        defaultMessage: "Libro",
      }),
      type: "input",
      key: "lib",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: props.stringValidations.minMaxValidation(1, 20),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Empresas.registroMercantil2",
        defaultMessage: "registro Mercantil 2",
      }),
      type: "input",
      key: "registreMercantil2",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: props.stringValidations.minMaxValidation(1, 20),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Empresas.hoja",
        defaultMessage: "Hoja",
      }),
      type: "input",
      key: "hjo",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: props.stringValidations.minMaxValidation(1, 20),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Empresas.folio",
        defaultMessage: "Folio",
      }),
      type: "input",
      key: "fol",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: props.stringValidations.minMaxValidation(1, 20),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Empresas.seccion",
        defaultMessage: "Sección",
      }),
      type: "input",
      key: "sec",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: props.stringValidations.minMaxValidation(1, 20),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Empresas.tomo",
        defaultMessage: "Tomo",
      }),
      type: "input",
      key: "tom",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: props.stringValidations.minMaxValidation(1, 20),
    },
  ];

  return (
    <Grid container>
      <Grid xs={12} item>
        <OutlinedContainer
          className="contact-tab-container"
          title={
            <FormattedMessage
              id={"Proveedores.tabs.contactos"}
              defaultMessage={"Contactos"}
            />
          }
        >
          <GenericForm
            formComponents={contactsConfig}
            emptyPaper={true}
            editMode={props.editMode}
            setFormData={setFormData}
            getFormData={props.getFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) => addValidity(0, value)}
            onBlur={(e) => handleTouched(0)}
            {...props}
          />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};

export default compose(injectIntl, withValidations)(ContactTab);
