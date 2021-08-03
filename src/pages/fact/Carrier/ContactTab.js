import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import { compose } from "redux";
import { FormattedMessage, injectIntl } from "react-intl";
import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import { withValidations } from "modules/wrappers";
import { useTabForm } from "../../../hooks/tab-form";
import { useParams } from "react-router-dom";

const CONTACT_SECTION_INDEX = 0;

const ContactTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: { CONTACT_SECTION_INDEX: true },
    setIsValid: props.setIsValid,
  });

  const TELEFON = props.intl.formatMessage({
    id: "Comun.telefono",
    defaultMessage: "Telefóno",
  });
  const EMAIL = props.intl.formatMessage({
    id: "Proveedores.Contacto.email",
    defaultMessage: "Email",
  });
  const FAX = props.intl.formatMessage({
    id: "Proveedores.Contacto.fax",
    defaultMessage: "Fax",
  });
  const CONTACTO = props.intl.formatMessage({
    id: "Proveedores.Contacto.contacto",
    defaultMessage: "Contacto",
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
        md: 4,
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
        md: 4,
      },
    },

    {
      placeHolder: EMAIL,
      type: "input",
      key: "email",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 60),
        ...props.stringValidations.emailValidation(),
      ],
    },
    {
      placeHolder: CONTACTO,
      type: "input",
      key: "contacte",
      breakpoints: {
        xs: 12,
        md: 4,
      },
    },
    {
      placeHolder: WWW,
      type: "input",
      key: "adresaWeb",
      breakpoints: {
        xs: 12,
        md: 4,
      },
    },
    {
      placeHolder:props.intl.formatMessage({
        id: "Transportistas.horarioReparto",
        defaultMessage: "Horario de Reparto",
      }),
      type: "input",
      key: "horariRepartiment",
      breakpoints: {
        xs: 12,
        md: 4,
      },
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
            getFormData={getFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) => addValidity(CONTACT_SECTION_INDEX, value)}
            onBlur={(e) => handleTouched(CONTACT_SECTION_INDEX)}
            {...props}
          />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};

export default compose(React.memo, withValidations, injectIntl)(ContactTab);
