import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import "../../fact/Suppliers/styles.scss";

import { TDOC_SELECTOR_VALUES } from "constants/selectors";
import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import { compose } from "redux";

import { withValidations } from "modules/wrappers";
import { useTabForm } from "hooks/tab-form";

const CUSTOMER_SECTION_INDEX = 0;

const CustomerTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: { [CUSTOMER_SECTION_INDEX]: false },
    setIsValid: props.setIsValid,
  });

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });
  const DESCRIPCIO = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });

  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });



  const code = (md = 6) => ({
    type: "input",
    key: "codi",
    placeHolder: CODE,
    required: true,
    noEditable: true,
    breakpoints: {
      xs: 12,
      md: md,
    },
  });

  const codeAndDescription = (mdCode = 6, mdDes = 6) => [
    code(mdCode),
    {
      type: "input",
      key: "descripcio",
      placeHolder: DESCRIPCIO,
      required: true,
      breakpoints: {
        xs: 12,
        md: mdDes,
      },
    },
  ];
  
 
  const formatCodeAndName = (data) => `${data.nom} (${data.codi})`;
  const formatCodeAndDescription = (data) =>
    `${data.descripcio} (${data.codi})`;

  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPCIO, name: "descripcio" },
  ];
  const aSCodeAndName = [
    { title: CODE, name: "codi" },
    { title: NOM, name: "nom" },
  ];

  const customerConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.codigoCliente",
        defaultMessage: "Código cliente",
      }),
      type: "input",
      key: "codiClient",
      noEditable: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.nombreComercialCliente",
        defaultMessage: "Nombre comercial",
      }),
      type: "input",
      key: "nomComercial",
      required: true,
      noEditable: true,
      breakpoints: {
        xs: 12,
        md: 5,
      },
      validationType: "string",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.nombreFiscalCliente",
        defaultMessage: "nombre fiscal",
      }),
      type: "input",
      required: true,
      key: "nomFiscal",
      breakpoints: {
        xs: 12,
        md: 5,
      },
      validationType: "string",
      validations: [...props.commonValidations.requiredValidation()],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.paisNif",
        defaultMessage: "Pais NIF",
      }),
      type: "LOV",
      key: "paisNif",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      selector: {
        key: "paisNifs",
        labelKey: formatCodeAndName,
        sort: "nom",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.tipoNif",
        defaultMessage: "Tipo Documento",
      }),
      type: "select",
      key: "tipusNif",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      selector: {
        options: TDOC_SELECTOR_VALUES,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.nif",
        defaultMessage: "NIF",
      }),
      type: "input",
      key: "nif",
      breakpoints: {
        xs: 12,
        md: 4,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.tipodireccion",
        defaultMessage: "Tipo direcciñon",
      }),
      type: "LOV",
      key: "tipusAdresa",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        key: "tipusAdresas",
        labelKey: formatCodeAndDescription,
        sort: "descripcio",
        creationComponents: codeAndDescription(),
        advancedSearchColumns: aSCodeAndDescription,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.domicilio",
        defaultMessage: "Domicilio",
      }),
      type: "input",
      key: "domiciliFiscal",
      breakpoints: {
        xs: 12,
        md: 6,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.num",
        defaultMessage: "Número",
      }),
      type: "input",
      key: "numero",
      breakpoints: {
        xs: 12,
        md: 1,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.piso",
        defaultMessage: "Piso",
      }),
      type: "input",
      key: "pis",
      breakpoints: {
        xs: 12,
        md: 1,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.escalera",
        defaultMessage: "Escalera",
      }),
      type: "input",
      key: "escala",
      breakpoints: {
        xs: 12,
        md: 1,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.puerta",
        defaultMessage: "Puerta",
      }),
      type: "input",
      key: "porta",
      breakpoints: {
        xs: 12,
        md: 1,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.codigoPostalCliente",
        defaultMessage: "Código postal cliente"
      }),
      type: 'LOV',
      key: 'codiPostalClient',
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "codiPostals",
        labelKey: (data) => `${data.codiPoblacioProvinciaTxt}`,
        sort: 'codi',
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription
      }
    },
    {
      
      placeHolder: props.intl.formatMessage({
        id: "Comun.telefono",
        defaultMessage: "Teléfono",
      }),
      type: "input",
      key: "telefon",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.email",
        defaultMessage: "Email",
      }),
      type: "input",
      key: "email",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 60),
        ...props.stringValidations.emailValidation()
      ]
    },
    {
      
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.emailFactura",
        defaultMessage: "Email Factura",
      }),
      type: "input",
      key: "emailFactura",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 60),
        ...props.stringValidations.emailValidation()
      ]
    },

  ];

  return (
    <Grid container>
      <Grid xs={12} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"Presupuestos.tabs.datosClientes"}
              defaultMessage={"Datos cliente"}
            />
          }
        >
          <GenericForm
            formComponents={customerConfig}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) =>
              addValidity(CUSTOMER_SECTION_INDEX, value)
            }
            onBlur={(e) => handleTouched(CUSTOMER_SECTION_INDEX)}
            {...props}
          />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(CustomerTab);
