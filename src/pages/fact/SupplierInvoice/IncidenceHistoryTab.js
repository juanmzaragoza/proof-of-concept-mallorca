import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";
import { TIPO_INCIDENCIA_SELECTOR_VALUES } from "constants/selectors";

const IncidenciaHistory = ({
  formData,
  setFormData,
  getFormData,
  ...props
}) => {
  // warning!!! It's always valid because we haven't validations
  useEffect(() => {
    props.setIsValid(true);
  }, []);

  const { id: supplierInvoiceId } = useParams();
  const numeroFactura = getFormData("numero");

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

  const complementFacturaProveidor = {
    title: props.intl.formatMessage({
      id: "FacturasProveedor.incidencias",
      defaultMessage: "Incidencias  ",
    }),
    query: [
      {
        columnName: "facturaProveidorNum",
        value: `"${numeroFactura}"`,
        exact: true,
      },
    ],
    extraPostBody: {
      facturaProveidorNum: numeroFactura,
    },
    columns: [
      {
        name: "sequencia",
        title: props.intl.formatMessage({
          id: "Clasificaciones.sequencia",
          defaultMessage: "Sequencia",
        }),
      },
      {
        name: "data",
        title: props.intl.formatMessage({
          id: "FacturasProveedor.fecha",
          defaultMessage: "Fecha",
        }),
        getCellValue: (row) =>
          row.data ? new Date(row.data).toLocaleDateString() : "",
      },
      {
        name: "tipusIncidenciaFactura",
        title: props.intl.formatMessage({
          id: "FacturasProveedor.tipoIncidencia",
          defaultMessage: "Tipo Incidencia",
        }),
      },
      {
        name: "tipus",
        title: props.intl.formatMessage({
          id: "FacturasProveedor.tipo",
          defaultMessage: "Tipo",
        }),
      },
      {
        name: "descripcio",
        title: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Descripción",
        }),
        hidden: true,
      },

      {
        name: "operariCodi",
        title: props.intl.formatMessage({
          id: "FacturasProveedor.operario",
          defaultMessage: "Operario",
        }),
      },
    ],
    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "Clasificaciones.sequencia",
          defaultMessage: "Sequencia",
        }),
        type: "numeric",
        key: "sequencia",
        required: true,
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "number",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.numberValidations.minMaxValidation(0, 999999999),
          ...props.stringValidations.fieldExistsValidation(
            "incidenciesFactura",
            "sequencia",
            props.intl.formatMessage({
              id: "Comun.codigo",
              defaultMessage: "Código",
            })
          ),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "FacturasProveedor.fecha",
          defaultMessage: "Fecha",
        }),
        type: "date",
        key: "data",
        breakpoints: {
          xs: 12,
          md: 2,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "PedidosProveedor.tipoIncidenciaFactura",
          defaultMessage: "Tipo Incidencia Factura",
        }),
        type: "LOV",
        key: "tipusIncidenciaFactura",
        breakpoints: {
          xs: 12,
          md: 5,
        },
        selector: {
          key: "tipusIncidenciaFacturas",
          labelKey: formatCodeAndName,
          sort: "descripcio",
          advancedSearchColumns: aSCodeAndName,
          cannotCreate: true,
          transform: {
            apply: (tipusIncidenciaFacturas) =>
              tipusIncidenciaFacturas && tipusIncidenciaFacturas.codi,
            reverse: (rows, codi) => rows.find((row) => row.codi === codi),
          },
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "FacturasProveedor.tipo",
          defaultMessage: "Tipo",
        }),
        type: "select",
        key: "tipus",
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          options: TIPO_INCIDENCIA_SELECTOR_VALUES,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Descripción",
        }),
        type: "input",
        key: "descripcio",
        breakpoints: {
          xs: 12,
          md: 9,
        },
        validationType: "string",
        validations: [...props.stringValidations.minMaxValidation(0, 1000)],
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "FacturasProveedor.operario",
          defaultMessage: "Operario",
        }),
        type: "LOV",
        key: "operariCodi",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "operaris",
          labelKey: formatCodeAndName,
          sort: "nom",
          cannotCreate: true,
          advancedSearchColumns: aSCodeAndName,
          transform: {
            apply: (operari) => operari && operari.codi,
            reverse: (rows, codi) => rows.find((row) => row.codi === codi),
          },
        },
      },
    ],
  };

  return (
    <Grid container>
      <Grid xs={12} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"FacturasProveedor.incidencias"}
              defaultMessage={"Incidencias"}
            />
          }
        >
          <ExpandableGrid
            id="incidenciesFactura"
            responseKey="incidenciaFacturas"
            enabled={props.editMode}
            configuration={complementFacturaProveidor}
          />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(
  React.memo,
  withValidations,
  injectIntl
)(IncidenciaHistory);
