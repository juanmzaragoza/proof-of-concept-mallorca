import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";
import { Chip } from "@material-ui/core";

import {
  FACT_TIPO_SELECTOR_VALUES,
  CONTABILIDAD_SELECTOR_VALUES,
  TIPO_EXTRANJ_SELECTOR_VALUES,
  TIPO_CLIENTE_SELECTOR_VALUES,
} from "constants/selectors";
import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";

import { useTabForm } from "hooks/tab-form";



const COMPANY_SECTION_INDEX = 0;
const ADDRESS_SECTION_TAB_INDEX = 1;
const CONTACT_SECTION_TAB_INDEX = 2;

const GeneralTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [COMPANY_SECTION_INDEX]: false,
      [ADDRESS_SECTION_TAB_INDEX]: false,
     
    },
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
  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });
  const WWW = props.intl.formatMessage({
    id: "Proveedores.Contacto.web",
    defaultMessage: "WWW",
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

  const codeAndName = (mdCode = 6, mdName = 6) => [
    code(mdCode),
    {
      type: "input",
      key: "nom",
      placeHolder: NOM,
      required: true,
      breakpoints: {
        xs: 12,
        md: mdName,
      },
    },
  ];

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

  const withRequiredValidation = (extraValidations = []) => {
    return {
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...extraValidations,
      ],
    };
  };

  const companyConfig = [
    {
      placeHolder: CODE,
      type: "input",
      key: "codi",
      required: true,
      noEditable: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      ...withRequiredValidation([
        ...props.stringValidations.minMaxValidation(1, 6),
        ...props.stringValidations.fieldExistsValidation(
          "empresa",
          "codi",
          CODE
        ),
      ]),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Comun.nombre",
        defaultMessage: "Nombre",
      }),
      type: "input",
      key: "nomComercial",
      disabled: true,
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "string",
    },

    // {
    //   placeHolder: props.intl.formatMessage({
    //     id: "Empresas.recargoEquivalencia",
    //     defaultMessage: "Recargo equivalencia",
    //   }),
    //   type: "checkbox",
    //   key: "recarrecEquivalencia",
    //   breakpoints: {
    //     xs: 12,
    //     md: 2,
    //   },
    // },


    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.divisa",
        defaultMessage: "Divisa",
      }),
      type: "LOV",
      key: "divisa",
      required: true,
      breakpoints: {
        xs: 12,
        md: 4,
      },
      selector: {
        key: "divisas",
        labelKey: formatCodeAndName,
        sort: "nom",
        advancedSearchColumns: aSCodeAndName,
        creationComponents: [
          ...codeAndName(4, 4),
          {
            type: "input",
            key: "valorEuros",
            placeHolder: props.intl.formatMessage({
              id: "Divisa.valor_euros",
              defaultMessage: "Valor Euros",
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 4,
            },
          },
        ],
      },
      validationType: "object",
      ...withRequiredValidation(),
    },
   

    // {
    //   placeHolder: props.intl.formatMessage({
    //     id: "Empresas.partida",
    //     defaultMessage: "Partida",
    //   }),
    //   type: "checkbox",
    //   key: "pda",
    //   breakpoints: {
    //     xs: 12,
    //     md: 2,
    //   },
    // },

    // {
    //   placeHolder: props.intl.formatMessage({
    //     id: "Empresas.fechaCierre",
    //     defaultMessage: "Fecha cierre",
    //   }),
    //   type: "date",
    //   key: "tancamentData",

    //   breakpoints: {
    //     xs: 12,
    //     md: 2,
    //   },

    // },

  ];

  const datosComerciales = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.nombre_comercial",
        defaultMessage: "Nombre Comercial",
      }),
      type: "input",
      key: "nomComercial",

      required: true,
      breakpoints: {
        xs: 12,
        md: 12,
      },
      validationType: "string",
      ...withRequiredValidation([
        ...props.stringValidations.minMaxValidation(1, 40),
      ]),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Empresas.domicilioComercial",
        defaultMessage: "Domicilio comercial",
      }),
      type: "input",
      required: true,
      key: "domiciliComercial",
      breakpoints: {
        xs: 12,
        md: 12,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 60),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Empresas.codPostalComercial",
        defaultMessage: "Código Postal",
      }),
      type: "LOV",
      key: "codiPostalComercialCodi",
      required: true,
      breakpoints: {
        xs: 12,
        md: 12,
      },

      selector: {
        key: "codiPostals",
        labelKey: (data) =>
          `${data.poblacio} ${data.municipi ? ` - ${data.municipi}` : ""} (${
            data.codi
          })`,
        sort: "codi",
        transform: {
          apply: (codiPostals) => codiPostals && codiPostals.codi,
          reverse: (rows, codi) => rows.find((row) => row.codi === codi),
        },
        advancedSearchColumns: aSCodeAndDescription,
        cannotCreate: true,
      },
      validationType: "string",
      ...withRequiredValidation(),
    },
  ];

  const datosFiscales = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.nombre_fiscal",
        defaultMessage: "Nombre Fiscal",
      }),
      type: "input",
      key: "nomFiscal",
      required: true,
      breakpoints: {
        xs: 12,
        md: 7,
      },
      validationType: "string",
      ...withRequiredValidation([
        ...props.stringValidations.minMaxValidation(1, 40),
      ]),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.nif",
        defaultMessage: "NIF",
      }),
      type: "input",
      key: "nif",
      required: true,
      breakpoints: {
        xs: 12,
        md: 5,
      },
      validationType: "string",
      ...withRequiredValidation([
        ...props.stringValidations.minMaxValidation(8, 11),
      ]),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Empresas.domicilioFiscal",
        defaultMessage: "Domicilio fiscal",
      }),
      type: "input",
      required: true,
      key: "domiciliFiscal",
      breakpoints: {
        xs: 12,
        md: 12,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 60),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Empresas.codPostalFiscal",
        defaultMessage: "Código Postal Fiscal",
      }),
      type: "LOV",
      key: "codiPostalFiscalCodi",
      required: true,
      breakpoints: {
        xs: 12,
        md: 12,
      },

      selector: {
        key: "codiPostals",
        labelKey: (data) =>
          `${data.poblacio} ${data.municipi ? ` - ${data.municipi}` : ""} (${
            data.codi
          })`,
        sort: "codi",
        transform: {
          apply: (codiPostals) => codiPostals && codiPostals.codi,
          reverse: (rows, codi) => rows.find((row) => row.codi === codi),
        },
        advancedSearchColumns: aSCodeAndDescription,
        cannotCreate: true,
      },
      validationType: "string",
      ...withRequiredValidation(),
    },
  ];
  const masDatosConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.tipo_persona",
        defaultMessage: "Tipo Persona",
      }),
      type: "select",
      key: "personaTipus",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        options: TIPO_CLIENTE_SELECTOR_VALUES,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.tipoExtranj",
        defaultMessage: "Tipo Residencia",
      }),
      type: "select",
      key: "tipoResidencia",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        options: TIPO_EXTRANJ_SELECTOR_VALUES,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.nombre",
        defaultMessage: "Nombre",
      }),
      type: "input",
      key: "nomFiscal1",

      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 40)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.apellido1",
        defaultMessage: "Apellido",
      }),
      type: "input",
      key: "llinatgeFiscal1",

      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 40)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.apellido2",
        defaultMessage: "Apellido 2",
      }),
      type: "input",
      key: "llinatgeFiscal2",

      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 40)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Empresas.enviarNotificaciones",
        defaultMessage: "Enviar Notificaciones",
      }),
      type: "checkbox",
      key: "envntf",
      breakpoints: {
        xs: 12,
        md: 5,
      },
    },
  ];

  const contactConfig = [
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
      validationType: "string",
      validations: props.stringValidations.minMaxValidation(1, 60),
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
      placeHolder: WWW,
      type: "input",
      key: "web",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: props.stringValidations.minMaxValidation(1, 60),
    },
    // {
    //   placeHolder: props.intl.formatMessage({
    //     id: "Empresas.ApiUrl",
    //     defaultMessage: "URL Api",
    //   }),
    //   type: "input",
    //   key: "apiUrl",

    //   breakpoints: {
    //     xs: 12,
    //     md: 3,
    //   },
    // },
    // {
    //   placeHolder: props.intl.formatMessage({
    //     id: "Empresas.logo",
    //     defaultMessage: "Ruta logo",
    //   }),
    //   type: "input",
    //   key: "logoPath",
    //   breakpoints: {
    //     xs: 12,
    //     md: 6,
    //   },
    // },
    // {
    //   placeHolder: props.intl.formatMessage({
    //     id: "Empresas.imprimirLogo",
    //     defaultMessage: "Imprimir Logo",
    //   }),
    //   type: "checkbox",
    //   key: "logoImprimir",
    //   breakpoints: {
    //     xs: 12,
    //     md: 2,
    //   },
    // },
  ];

  const tabs = [
    {
      className: "general-tab-subtab",
      label: (
        <FormattedMessage
          id={"Empresas.masDatos"}
          defaultMessage={"Más Datos"}
        />
      ),
      key: 0,
      component: (
        <GenericForm
          formComponents={masDatosConfig}
          emptyPaper={true}
          setFormData={setFormData}
          getFormData={getFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) =>
            addValidity(ADDRESS_SECTION_TAB_INDEX, value)
          }
          onBlur={(e) => handleTouched(ADDRESS_SECTION_TAB_INDEX)}
          {...props}
        />
      ),
    },

    // {
    //   className: "general-tab-subtab",
    //   label: (
    //     <FormattedMessage
    //       id={"Proveedores.tabs.contactos"}
    //       defaultMessage={"Contacto"}
    //     />
    //   ),
    //   key: 1,
    //   component:
    //     <GenericForm
    //       formComponents={contactConfig}
    //       emptyPaper={true}
    //       setFormData={setFormData}
    //       getFormData={getFormData}
    //       loading={props.loading}
    //       formErrors={props.formErrors}
    //       submitFromOutside={props.submitFromOutside}
    //       onSubmit={() => props.onSubmitTab(formData)}
    //       handleIsValid={(value) =>
    //         addValidity(CONTACT_SECTION_TAB_INDEX, value)
    //       }
    //       onBlur={(e) => handleTouched(CONTACT_SECTION_TAB_INDEX)}
    //       {...props}
    //     />

    // },
  ];

  return (
    <Grid container>
      <Grid xs={12} item>
        <GenericForm
          formComponents={companyConfig}
          emptyPaper={true}
          editMode={props.editMode}
          getFormData={getFormData}
          setFormData={setFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) => addValidity(COMPANY_SECTION_INDEX, value)}
          onBlur={(e) => handleTouched(COMPANY_SECTION_INDEX)}
          {...props}
        />
        <Grid container spacing={2}>
          <Grid xs={6} item>
            <OutlinedContainer
              className="general-tab-container"
              title={
                <FormattedMessage
                  id={"Empresas.datosComerciales"}
                  defaultMessage={"Datos Comerciales"}
                />
              }
            >
              <GenericForm
                formComponents={datosComerciales}
                emptyPaper={true}
                editMode={props.editMode}
                getFormData={getFormData}
                setFormData={setFormData}
                loading={props.loading}
                formErrors={props.formErrors}
                submitFromOutside={props.submitFromOutside}
                onSubmit={() => props.onSubmitTab(formData)}
                handleIsValid={(value) =>
                  addValidity(COMPANY_SECTION_INDEX, value)
                }
                onBlur={(e) => handleTouched(COMPANY_SECTION_INDEX)}
                {...props}
              />
            </OutlinedContainer>
          </Grid>
          <Grid xs={6} item>
            <OutlinedContainer
              className="general-tab-container"
              title={
                <FormattedMessage
                  id={"Empresas.datosFiscales"}
                  defaultMessage={"Datos Fiscales"}
                />
              }
            >
              <GenericForm
                formComponents={datosFiscales}
                emptyPaper={true}
                editMode={props.editMode}
                getFormData={getFormData}
                setFormData={setFormData}
                loading={props.loading}
                formErrors={props.formErrors}
                submitFromOutside={props.submitFromOutside}
                onSubmit={() => props.onSubmitTab(formData)}
                handleIsValid={(value) =>
                  addValidity(COMPANY_SECTION_INDEX, value)
                }
                onBlur={(e) => handleTouched(COMPANY_SECTION_INDEX)}
                {...props}
              />
            </OutlinedContainer>
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={12} item>
        <OutlinedContainer>
          <ConfigurableTabs tabs={tabs} />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(GeneralTab);
