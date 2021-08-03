import React, { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";
import { useParams } from "react-router-dom";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";

const NumeracionesTab = ({ formData, setFormData, getFormData, ...props }) => {
  useEffect(() => {
    props.setIsValid(true);
  }, []);

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

  const { id: PointSaleId } = useParams();

  const otraAplicacion = {
    title: props.intl.formatMessage({
      id: "PuntoVenta.NumTpv",
      defaultMessage: "Numeraciones TPV",
    }),
    query: [
      {
        columnName: "puntVenda.id",
        value: `"${PointSaleId}"`,
        exact: true,
      },
    ],

    extraPostBody: {
      puntVenda: { id: `${PointSaleId}` },
    },

    columns: [
      {
        name: "dia",
        title: props.intl.formatMessage({
          id: "PuntoVenta.fecha",
          defaultMessage: "Fecha",
        }),
      },
      {
        name: "ultimTicket",
        title: props.intl.formatMessage({
          id: "PuntoVenta.ultimoTicket",
          defaultMessage: "Último ticket",
        }),
      },
      {
        name: "numeroAZ",
        title: props.intl.formatMessage({
          id: "PuntoVenta.numeroAZ",
          defaultMessage: "Numero de A-Z",
        }),
      },
      {
        name: "valorNumeroAZ",
        title: props.intl.formatMessage({
          id: "PuntoVenta.importe",
          defaultMessage: "Importe",
        }),
      },
      {
        name: "exerciciComptable",
        title: props.intl.formatMessage({
          id: "PuntoVenta.ejercicio",
          defaultMessage: "Ejercicio",
        }),
      },
      {
        name: "diariComptable",
        title: props.intl.formatMessage({
          id: "PuntoVenta.diario",
          defaultMessage: "Diario",
        }),
      },
      {
        name: "seientComptable",
        title: props.intl.formatMessage({
          id: "PuntoVenta.asiento",
          defaultMessage: "Asiento",
        }),
      },
    ],

    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "PuntoVenta.fecha",
          defaultMessage: "Fecha",
        }),
        type: "date",
        key: "dia",
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        validations: [...props.commonValidations.requiredValidation()],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "PuntoVenta.ultimoTicket",
          defaultMessage: "Último Ticket",
        }),
        type: "numeric",
        key: "ultimTicket",

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
          id: "PuntoVenta.numeroAZ",
          defaultMessage: "numeroAZ",
        }),
        type: "numeric",
        key: "numeroAZ",

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
          id: "PuntoVenta.importe",
          defaultMessage: "Importe",
        }),
        required: true,
        type: "numeric",
        key: "valorNumeroAZ",

        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "number",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.numberValidations.minMaxValidation(0, 999999999999),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "PuntoVenta.valorNumeroAZ2",
          defaultMessage: "Valor Numero AZ 2",
        }),
        required: true,
        type: "numeric",
        key: "valorNumeroAZ002",

        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "number",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.numberValidations.minMaxValidation(0, 999999999999),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "PuntoVenta.ejercicio",
          defaultMessage: "Ejercicio",
        }),
        type: "input",
        key: "exerciciComptable",

        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        validations: [...props.stringValidations.minMaxValidation(0, 4)],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "PuntoVenta.diario",
          defaultMessage: "Diario",
        }),
        type: "input",
        key: "diariComptable",

        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        validations: [...props.stringValidations.minMaxValidation(0, 2)],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "PuntoVenta.asiento",
          defaultMessage: "Asiento",
        }),
        type: "numeric",
        key: "seienComptable",

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
          id: "Proveedores.divisa",
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
          sort: "nom",
          advancedSearchColumns: aSCodeAndName,
          cannotCreate: true,
        },
        validationType: "object",
        validations: [...props.commonValidations.requiredValidation()],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "PuntoVenta.valorDivisa",
          defaultMessage: "Valor Divisa",
        }),
        type: "input",
        required: true,
        key: "valorDivisaEuros",
        suffix: "€",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        validations: [
          ...props.numberValidations.minMaxValidation(0, 9999999999),
          ...props.commonValidations.requiredValidation(),
        ],
      },
    ],
  };

  return (
    <Grid container>
      <Grid xs={12} item>
        <ExpandableGrid
          id="numeracionsTpv"
          responseKey="numeracioTpvs"
          enabled={props.editMode}
          configuration={otraAplicacion}
        />
      </Grid>
    </Grid>
  );
};
export default compose(
  React.memo,
  withValidations,
  injectIntl
)(NumeracionesTab);
