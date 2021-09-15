import React, { useEffect, useState } from "react";

import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";

import { compose } from "redux";
import { withValidations } from "modules/wrappers";

import { useTabForm } from "../../../hooks/tab-form";
import { TIPO_DIR_COMERCIALES_SELECTOR_VALUES } from "constants/selectors";
import { useParams } from "react-router";
import ButtonPopUp from "modules/ButtonPopUp";

const CUSTOMER_SECTION_INDEX = 0;

const GeneralTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [CUSTOMER_SECTION_INDEX]: false,
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
  const DOMICILI = props.intl.formatMessage({
    id: "Proveedores.Direccion.domicilio",
    defaultMessage: "Domicilio",
  });
  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });
  const OBS = props.intl.formatMessage({
    id: "FamiliaProveedores.observaciones",
    defaultMessage: "Observaciones",
  });

  const DEFECTE = props.intl.formatMessage({
    id: "Proveedores.DireccionComercial.defecto",
    defaultMessage: "Defecto",
  });

  const DIR_EXCLUSIVA = props.intl.formatMessage({
    id: "DireccionesClientes.dreccion_exclusiva",
    defaultMessage: "Dir. exclusiva",
  });
  const BLOQUEJAT = props.intl.formatMessage({
    id: "Clientes.bloqueado",
    defaultMessage: "Bloqueado",
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
      placeHolder: props.intl.formatMessage({
        id: "Comun.descripcion",
        defaultMessage: "Descripción",
      }),
      required: true,
      breakpoints: {
        xs: 12,
        md: mdDes,
      },
    },
  ];

  const formatCodeAndDescription = (data) =>
    `${data.descripcio} (${data.codi})`;

  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPCIO, name: "descripcio" },
  ];

  const createConfiguration = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Comun.codigo",
        defaultMessage: "Código",
      }),
      type: "input",
      key: "codi",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      noEditable: true,
      validationType: "string",
      validations: [
        ...props.stringValidations.fieldExistsValidation(
          "familiaClient",
          "codi",
          props.intl.formatMessage({
            id: "Comun.codigo",
            defaultMessage: "Código",
          })
        ),
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 4),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Comun.nombre",
        defaultMessage: "Nombre",
      }),
      type: "input",
      key: "nom",
      required: true,
      breakpoints: {
        xs: 12,
        md: 9,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 30),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaClientes.cuentaVentas",
        defaultMessage: "Cuenta Ventas Contabilidad",
      }),
      type: "input",
      key: "compteVendesComptabilitat",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: props.stringValidations.minMaxValidation(1, 10),
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaClientes.tipoRiesgo",
        defaultMessage: "Tipo Riesgo",
      }),
      type: "LOV",
      key: "tipusRisc",

      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "tipusRiscs",
        labelKey: formatCodeAndDescription,
        sort: "codi",
        creationComponents: [...codeAndDescription(6, 6)],
        advancedSearchColumns: aSCodeAndDescription,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaClientes.tarifaDescuento",
        defaultMessage: "Tarifa descuento",
      }),
      type: "LOV",
      key: "tarifaDescompte",

      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "tarifaDescomptes",
        labelKey: formatCodeAndDescription,
        sort: "description",
        creationComponents: [...codeAndDescription(6, 6)],
        advancedSearchColumns: aSCodeAndDescription,
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
        md: 3,
      },
    },
  ];

  const { id: familiaClient } = useParams();

  const preciosArticulos = {
    title: props.intl.formatMessage({
      id: "PrecioArticulos.articulosFamCliente",
      defaultMessage: "Artículos Familia Cliente",
    }),
    query: [
      {
        columnName: "familiaClient.id",
        value: `"${familiaClient}"`,
        exact: true,
      },
    ],
    extraPostBody: {
      familiaClient: { id: familiaClient },
    },
    columns: [
      {
        name: "article",
        title: props.intl.formatMessage({
          id: "Presupuestos.articulo",
          defaultMessage: "Artículo",
        }),
        getCellValue: (row) =>
          row.article && `${row.article?.description}(${row.article?.pk.codi})`,
      },
      {
        name: "pru",
        title: props.intl.formatMessage({
          id: "Presupuestos.precio",
          defaultMessage: "Precio",
        }),
      },
    ],
    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.articulo",
          defaultMessage: "Artículo",
        }),
        type: "LOV",
        key: "article",
        id: "articlesFact",
        noEditable: true,
        required: true,
        breakpoints: {
          xs: 12,
          md: 7,
        },
        selector: {
          key: "articles",
          labelKey: (data) => `${data.descripcioCurta} (${data.codi})`,
          sort: "nom",
          cannotCreate: true,
          advancedSearchColumns: [
            { title: CODE, name: "codi" },
            { title: NOM, name: "descripcioCurta" },
          ],
        },
        validationType: "object",
        validations: [...props.commonValidations.requiredValidation()],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.precio",
          defaultMessage: "Precio",
        }),
        type: "numeric",
        key: "pru",

        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.minMaxValidation(0, 999999999999),
        ],
      },
    ],
  };

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

        <ButtonPopUp
          title={props.intl.formatMessage({
            id: "PrecioArticulos.titulo",
            defaultMessage: "Precio Artículos",
          })}
          configuration={preciosArticulos}
          id="afcs"
          responseKey="afcs"
          enabled={props.editMode}
        />
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(GeneralTab);
