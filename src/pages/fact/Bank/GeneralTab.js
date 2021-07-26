import React, { useEffect, useState } from "react";

import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";

import { compose } from "redux";
import { withValidations } from "modules/wrappers";

import { useTabForm } from "../../../hooks/tab-form";
import ExpandableGrid from "modules/ExpandableGrid";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { useParams } from "react-router-dom";

const CUSTOMER_SECTION_INDEX = 0;
const BANK_OFFICE_SECTION_TAB_INDEX = 1;

const GeneralTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [CUSTOMER_SECTION_INDEX]: false,
      [BANK_OFFICE_SECTION_TAB_INDEX]: false,
    },
    setIsValid: props.setIsValid,
  });

  const { id: bankId } = useParams();

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
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

  const codeAndName = (mdCode = 6, mdDes = 6) => [
    code(mdCode),
    {
      type: "input",
      key: "nom",
      placeHolder: props.intl.formatMessage({
        id: "Comun.nombre",
        defaultMessage: "Nombre",
      }),
      required: true,
      breakpoints: {
        xs: 12,
        md: mdDes,
      },
    },
  ];

  const codiPostal = (md = 6) => [
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Direccion.codPostal",
        defaultMessage: "Código Postal",
      }),
      type: "LOV",
      key: "codiPostal",
      required: true,
      breakpoints: {
        xs: 12,
        md: md,
      },
      validationType: "object",
      ...withRequiredValidation(),
      selector: {
        key: "codiPostals",
        labelKey: (data) =>
          `${data.poblacio} ${data.municipi ? ` - ${data.municipi}` : ""} (${
            data.codi
          })`,
        sort: "codi",
        creationComponents: [
          code(4),
          {
            placeHolder: props.intl.formatMessage({
              id: "CodigoPostal.pais",
              defaultMessage: "País",
            }),
            type: "LOV",
            key: "pais",
            required: false,
            breakpoints: {
              xs: 12,
              md: 4,
            },
            selector: {
              key: "paises",
              labelKey: (data) => `${data.nom} (${data.codi})`,
              sort: "codi",
              cannotCreate: true,
              relatedWith: {
                name: "provincia",
                filterBy: "pais.id",
                keyValue: "id",
              },
              advancedSearchColumns: aSCodeAndName,
            },
          },
          {
            placeHolder: props.intl.formatMessage({
              id: "CodigoPostal.provincia",
              defaultMessage: "Provincia",
            }),
            type: "LOV",
            key: "provincia",
            required: false,
            breakpoints: {
              xs: 12,
              md: 4,
            },
            selector: {
              key: "provincias",
              labelKey: (data) => `${data.nom} (${data.codi})`,
              sort: "codi",
              cannotCreate: true,
              advancedSearchColumns: aSCodeAndName,
            },
          },
          {
            type: "input",
            key: "municipi",
            placeHolder: props.intl.formatMessage({
              id: "CodigoPostal.municipio",
              defaultMessage: "Municipio",
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 6,
            },
          },
          {
            type: "input",
            key: "poblacio",
            placeHolder: props.intl.formatMessage({
              id: "CodigoPostal.poblacion",
              defaultMessage: "Población",
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 6,
            },
          },
        ],
        advancedSearchColumns: aSCodeAndPoblacio,
      },
    },
  ];

  const withRequiredValidation = (extraValidations = []) => {
    return {
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...extraValidations,
      ],
    };
  };

  const formatCodeAndName = (data) => `${data.nom} (${data.codi})`;

  const aSCodeAndName = [
    { title: CODE, name: "codi" },
    { title: NOM, name: "nom" },
  ];

  const aSCodeAndPoblacio = [
    { title: CODE, name: "codi" },
    { title: NOM, name: "poblacioMunicipiCodiTxt" },
  ];

  const createConfiguration = [
    {
      placeHolder: CODE,

      type: "input",
      key: "codi",
      required: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      noEditable: true,
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 4),
      ],
    },
    {
      placeHolder: NOM,

      type: "input",
      key: "nom",
      required: true,
      breakpoints: {
        xs: 12,
        md: 10,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 30),
      ],
    },
  ];

  const bankOfficeConfig = {
    title: props.intl.formatMessage({
      id: "OficinasBancarias.titulo",
      defaultMessage: "Oficinas Bancarias",
    }),
    query: [
      {
        columnName: "banc.id",
        value: `"${bankId}"`,
        exact: true,
      },
    ],

    extraPostBody: {
      banc: { id: `${bankId}` },
    },

    columns: [
      {
        name: "codi",
        title: props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código",
        }),
      },
      {
        name: "domicili",
        title: props.intl.formatMessage({
          id: "Comun.domicilio",
          defaultMessage: "Domicilio",
        }),
      },
      {
        name: "codiPostal",
        title: props.intl.formatMessage({
          id: "Comun.codigoPostal",
          defaultMessage: "Código Postal",
        }),
        getCellValue: (row) => row.codiPostal?.description ?? "",
      },
      {
        name: "telefon",
        title: props.intl.formatMessage({
          id: "Comun.telefono",
          defaultMessage: "Teléfono",
        }),
      },
      {
        name: "fax",
        title: props.intl.formatMessage({
          id: "Comun.fax",
          defaultMessage: "Fax",
        }),
        hidden: true,
      },
      {
        name: "contacte",
        title: props.intl.formatMessage({
          id: "Comun.contacto",
          defaultMessage: "Contacto",
        }),
        hidden: true,
      },
      {
        name: "observacions",
        title: props.intl.formatMessage({
          id: "Comun.observaciones",
          defaultMessage: "Observaciones",
        }),
        hidden: true,
      },
    ],

    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.codigo",
          defaultMessage: "Código",
        }),
        type: "input",
        key: "codi",
        required: true,
        breakpoints: {
          xs: 12,
          md: 2,
        },
        noEditable: true,
        validationType: "string",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.stringValidations.minMaxValidation(0, 9999),
          ...props.stringValidations.fieldExistsValidation(
            "oficinaBamcaria",
            "codi",
            CODE
          ),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Comun.domicilio",
          defaultMessage: "Domicilio",
        }),
        type: "input",
        key: "domicili",
        required: true,
        breakpoints: {
          xs: 12,
          md: 7,
        },
        validationType: "string",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.stringValidations.minMaxValidation(1, 60),
        ],
      },
      ...codiPostal(3),

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
          id: "Comun.fax",
          defaultMessage: "Fax",
        }),
        type: "input",
        key: "fax",
        breakpoints: {
          xs: 12,
          md: 3,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Comun.contacto",
          defaultMessage: "Contacto",
        }),
        type: "input",
        key: "contacte",
        breakpoints: {
          xs: 12,
          md: 4,
        },
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.observaciones",
          defaultMessage: "Observaciones",
        }),
        type: "observations",
        key: "observacions",
        required: false,
        breakpoints: {
          xs: 12,
          md: 1,
        },
      },
    ],
  };

  const tabs = [
    {
      className: "general-tab-subtab",
      label: (
        <FormattedMessage
          id={"OficinasBancarias.titulo"}
          defaultMessage={"Oficinas Bancarias"}
        />
      ),
      key: 0,
      component: (
        <ExpandableGrid
          id="oficinaBancaria"
          responseKey="oficinaBancarias"
          enabled={props.editMode}
          configuration={bankOfficeConfig}
        />
      ),
    },
  ];

  return (
    <Grid container>
      <Grid xs={12} item>
        <GenericForm
          formComponents={createConfiguration}
          emptyPaper={true}
          editMode={props.editMode}
          getFormData={getFormData}
          setFormData={setFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) => addValidity(CUSTOMER_SECTION_INDEX, value)}
          onBlur={(e) => handleTouched(CUSTOMER_SECTION_INDEX)}
          {...props}
        />
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
