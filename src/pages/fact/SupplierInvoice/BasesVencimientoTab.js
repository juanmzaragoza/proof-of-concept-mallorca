import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";
import { TIPO_DESCUENTO_SELECTOR_VALUES } from "constants/selectors";
import { Chip } from "@material-ui/core";

const BasesVencimientoTab = ({
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

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });

  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });

  const formatCodeAndName = (data) => `${data.nom} (${data.codi})`;

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

  const basesConfig = {
    title: props.intl.formatMessage({
      id: "FacturasProveedor.bases",
      defaultMessage: "Bases  ",
    }),
    query: [
      {
        columnName: "facturaProveidor.id",
        value: `"${supplierInvoiceId}"`,
        exact: true,
      },
    ],
    extraPostBody: {
      facturaProveidor: { id: `${supplierInvoiceId}` },
    },
    columns: [
      {
        name: "baseImposable",
        title: props.intl.formatMessage({
          id: "FacturasProveedor.baseImponible",
          defaultMessage: "Base imponible",
        }),
      },
      {
        name: "iva",
        title: props.intl.formatMessage({
          id: "FacturasProveedor.IVA",
          defaultMessage: "IVA",
        }),
        getCellValue: (row) => row.iva && row.iva?.description,
      },
      {
        name: "importIva",
        title: props.intl.formatMessage({
          id: "FacturasProveedor.importeIva",
          defaultMessage: "Importe IVA",
        }),
      },

      {
        name: "importRecarreg",
        title: props.intl.formatMessage({
          id: "FacturasProveedor.importeRecargo",
          defaultMessage: "Importe Recargo",
        }),
      },
    ],
    formComponents: [],
  };

  const vencimientoConfig = {
    title: props.intl.formatMessage({
      id: "FacturasProveedor.vencimiento",
      defaultMessage: "Vencimineto",
    }),
    query: [
      {
        columnName: "facturaProveidor.id",
        value: `"${supplierInvoiceId}"`,
        exact: true,
      },
    ],
    extraPostBody: {
      facturaProveidor: { id: `${supplierInvoiceId}` },
    },
    columns: [
      {
        name: "numero",
        title: props.intl.formatMessage({
          id: "FacturasProveedor.numero",
          defaultMessage: "numero",
        }),
      },

      {
        name: "dia",
        title: props.intl.formatMessage({
          id: "FacturasProveedor.fecha",
          defaultMessage: "Fecha",
        }),
        getCellValue: (row) =>
          row.dia ? new Date(row.dia).toLocaleDateString() : "",
      },

      {
        name: "imports",
        title: props.intl.formatMessage({
          id: "FacturasProveedor.importe",
          defaultMessage: "Importe",
        }),
      },

      {
        name: "divisa",
        title: props.intl.formatMessage({
          id: "FacturasProveedor.divisa",
          defaultMessage: "Divisa",
        }),
        getCellValue: (row) => row.divisa && row.divisa?.description,
      },
      {
        name: "valorDivisaEuros",
        title: props.intl.formatMessage({
          id: "FacturasProveedor.valorDivisa",
          defaultMessage: "valor Divisa Euros ",
        }),
      },
      {
        name: "referenciaAnual",
        title: props.intl.formatMessage({
          id: "FacturasProveedor.referenciaAnual",
          defaultMessage: "Referencia Anual",
        }),
      },
      {
        name: "compteVendaSequencia",
        title: props.intl.formatMessage({
          id: "FacturasProveedor.cuentaVenta",
          defaultMessage: "Cuenta Venta Sequencia",
        }),
      },

      {
        name: "retenirGarantia",
        title: props.intl.formatMessage({
          id: "FacturasProveedor.retenerGarantia",
          defaultMessage: "Retener Garantía",
        }),
        getCellValue: (row) =>
          row.retenirGarantia && row.retenirGarantia === true ? (
            <Chip
              label={props.intl.formatMessage({
                id: "Comun.SI",
                defaultMessage: "SI",
              })}
            />
          ) : (
            <Chip
              label={props.intl.formatMessage({
                id: "Comun.NO",
                defaultMessage: "NO",
              })}
            />
          ),
      },
    ],
    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "FacturasProveedor.numero",
          defaultMessage: "Número",
        }),
        type: "numeric",
        key: "numero",
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "number",
        ...withRequiredValidation([
          ...props.numberValidations.minMaxValidation(0, 9999999999),
        ]),
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "FacturasProveedor.importe",
          defaultMessage: "Importe",
        }),
        type: "numeric",
        key: "imports",
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "number",
        ...withRequiredValidation([
          ...props.numberValidations.minMaxValidation(0, 999999999999),
        ]),
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "FacturasProveedor.valorDivisa",
          defaultMessage: "valor Divisa",
        }),
        type: "numeric",
        key: "valorDivisaEuros",
        required: true,
        suffix: "€",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "number",
        ...withRequiredValidation([
          ...props.numberValidations.minMaxValidation(0, 9999999),
        ]),
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "FacturasProveedor.fecha",
          defaultMessage: "Fecha",
        }),
        type: "date",
        required: true,
        key: "dia",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        ...withRequiredValidation([]),
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.divisa",
          defaultMessage: "Divisa",
        }),
        type: "LOV",
        key: "divisa",
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "divisas",
          labelKey: formatCodeAndName,
          sort: "descripcio",
          cannotCreate: true,
          advancedSearchColumns: aSCodeAndName,
        },
        validationType: "object",
        validations: [...props.commonValidations.requiredValidation()],
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "FacturasProveedor.cuentaVenta",
          defaultMessage: "Cuenta Venta",
        }),
        type: "numeric",
        key: "compteVendaSequencia",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.minMaxValidation(0, 9999999999),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "FacturasProveedor.referenciaAnual",
          defaultMessage: "Referencia Anual",
        }),
        type: "numeric",
        key: "referenciaAnual",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.minMaxValidation(0, 9999999999),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "FacturasProveedor.retenerGarantia",
          defaultMessage: "retener Garantia",
        }),
        type: "checkbox",
        key: "retenirGarantia",
        breakpoints: {
          xs: 12,
          md: 2,
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
              id={"FacturasProveedor.bases"}
              defaultMessage={"Bases"}
            />
          }
        >
          <ExpandableGrid
            id="basesFactura"
            responseKey="baseFacturas"
            enabled={props.editMode}
            configuration={basesConfig}
            readOnly={true}
          />
        </OutlinedContainer>
      </Grid>
      <Grid xs={12} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"FacturasProveedor.vencimiento"}
              defaultMessage={"Vencimiento"}
            />
          }
        >
          <ExpandableGrid
            id="vencimentsFactura"
            responseKey="vencimentFacturas"
            enabled={props.editMode}
            configuration={vencimientoConfig}
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
)(BasesVencimientoTab);
