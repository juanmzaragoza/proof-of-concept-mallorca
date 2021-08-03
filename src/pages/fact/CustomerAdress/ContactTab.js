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
    fields: { [CONTACT_SECTION_INDEX]: true },
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

  const WWW = props.intl.formatMessage({
    id: "Proveedores.Contacto.web",
    defaultMessage: "WWW",
  });

  const CONTACTE = props.intl.formatMessage({
    id: "Proveedores.Contacto.contacto",
    defaultMessage: "Contacto",
  });

  const ACTIVIDAD = props.intl.formatMessage({
    id: "Clientes.departamentos_actividad",
    defaultMessage: "Actividad",
  });

  const MOVIL = props.intl.formatMessage({
    id: "Clientes.Contacto.movil",
    defaultMessage: "Telf. Móvil",
  });
  const LONG = props.intl.formatMessage({
    id: "Clientes.contacto.longitud",
    defaultMessage: "Longitud",
  });
  const LAT = props.intl.formatMessage({
    id: "Clientes.contacto.latitud",
    defaultMessage: "Latitud",
  });

  const CIF = props.intl.formatMessage({
    id: "Clientes.Contacto.cif",
    defaultMessage: "CIF",
  });

  const contactsConfig = [
    {
      placeHolder: TELEFON,
      type: "input",
      key: "telefon",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: FAX,
      type: "input",
      key: "fax",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: LONG,
      type: "input",
      key: "longitut",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: LAT,
      type: "input",
      key: "latitut",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: CONTACTE,
      type: "input",
      key: "contacte",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: MOVIL,
      type: "input",
      key: "telefonMovil",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: EMAIL,
      type: "input",
      key: "email",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: ACTIVIDAD,
      type: "input",
      key: "activitat",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: WWW,
      type: "input",
      key: "adressaWeb",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: CIF,
      type: "input",
      key: "cif",
      breakpoints: {
        xs: 12,
        md: 3,
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
