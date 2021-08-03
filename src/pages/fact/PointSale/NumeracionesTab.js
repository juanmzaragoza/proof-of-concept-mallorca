import React, { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";
import { useParams } from "react-router-dom";
import {
  TIPO_IMPRESION_PUNT_VENTA_VALUES,
  TIPO_ENUM_PUNT_VENTA_VALUES,
} from "constants/selectors";
import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";
import { useTabForm } from "hooks/tab-form";

const NUMERATION_SECTION_INDEX = 0;

const NumeracionesTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [NUMERATION_SECTION_INDEX]: false,
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

  const { id: PointSaleId } = useParams();

  const withRequiredValidation = (extraValidations = []) => {
    return {
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...extraValidations,
      ],
    };
  };

  const otraAplicacion = {
    title: props.intl.formatMessage({
      id: "Clientes.otraAplicacion",
      defaultMessage: "Clientes otras Aplicaciones",
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
          id: "PuntoVenta.Fecha",
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
        required:true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType:"string",
        validations: [...props.commonValidations.requiredValidation() ]
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
        validationType:"number",
        validations: [...props.numberValidations.minMaxValidation(0,9999999999) ]
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
        validationType:"number",
        validations: [...props.numberValidations.minMaxValidation(0,9999999999) ]
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "PuntoVenta.importe",
          defaultMessage: "Importe",
        }),
        required:true,
        type: "numeric",
        key: "valorNumeroAZ",

        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType:"number",
        validations: [...props.commonValidations.requiredValidation(),
          ...props.numberValidations.minMaxValidation(0,999999999999) ]
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "PuntoVenta.valorNumeroAZ2",
          defaultMessage: "Valor Numero AZ 2",
        }),
        required:true,
        type: "numeric",
        key: "valorNumeroAZ002",

        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType:"number",
        validations: [...props.commonValidations.requiredValidation(),
          ...props.numberValidations.minMaxValidation(0,999999999999) ]
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
        validationType:"string",
        validations: [...props.stringValidations.minMaxValidation(0,4) ]
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "PuntoVenta.diairo",
          defaultMessage: "Diario",
        }),
        type: "input",
        key: "diariComptable",

        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType:"string",
        validations: [...props.stringValidations.minMaxValidation(0,2) ]
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
        validationType:"number",
        validations: [...props.numberValidations.minMaxValidation(0,9999999999) ]
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Proveedores.divisa",
          defaultMessage: "Divisa",
        }),
        type: "LOV",
        key: "divisa",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "divisas",
          labelKey: formatCodeAndName,
          sort: "nom",
          advancedSearchColumns: aSCodeAndName,
          cannotCreate:true,
        },

      },
      {
        placeHolder: props.intl.formatMessage({
          id: "PuntoVenta.valorDivisa",
          defaultMessage: "Valor Divisa",
        }),
        type: "numeric",
        key: "valorDivisaEuros",
        suffix:"€",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType:"number",
        validations: [...props.numberValidations.minMaxValidation(0,9999999999) ]
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
