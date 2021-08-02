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
        name: "aplicacio",
        title: props.intl.formatMessage({
          id: "Clientes.aplicacion",
          defaultMessage: "Aplicación",
        }),
      },
      {
        name: "aplicacioCodi",
        title: props.intl.formatMessage({
          id: "Clientes.codigoOtraApp",
          defaultMessage: "Código Cliente otra App",
        }),
      },
      {
        name: "percentatge",
        title: props.intl.formatMessage({
          id: "Clientes.porcentaje",
          defaultMessage: "Porcentaje",
        }),
      },
      {
        name: "empresa",
        title: props.intl.formatMessage({
          id: "Clientes.empresas",
          defaultMessage: "Empresa",
        }),
        getCellValue: (row) => row.empresa && row.empresa?.description,
      },
      {
        name: "observacions",
        title: props.intl.formatMessage({
          id: "Comun.observaciones",
          defaultMessage: "Observaciones",
        }),
      },
    ],

    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.aplicacion",
          defaultMessage: "Aplicación",
        }),
        type: "input",
        key: "aplicacio",
        noEditable: true,
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        ...withRequiredValidation([
          ...props.stringValidations.minMaxValidation(0, 3),
        ]),
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.codigoOtraApp",
          defaultMessage: "Código cliente otra Aplicación",
        }),
        type: "input",
        key: "aplicacioCodi",
        noEditable: true,
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        ...withRequiredValidation([
          ...props.stringValidations.minMaxValidation(0, 10),
        ]),
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.porcentaje",
          defaultMessage: "Porcentaje ",
        }),
        type: "numeric",
        key: "percentatge",
        noEditable: true,
        breakpoints: {
          xs: 12,
          md: 2,
        },
        suffix: "%",
        validationType: "number",
        validations: [...props.numberValidations.minMaxValidation(0, 9999)],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.empresas",
          defaultMessage: "Empresas",
        }),
        type: "LOV",
        key: "empresa",
        required: true,
        breakpoints: {
          xs: 12,
          md: 4,
        },
        selector: {
          key: "empresas",
          labelKey: (data) => `${data.nomFiscal} (${data.codi})`,
          sort: "nomFiscal",
          cannotCreate: true,
          advancedSearchColumns: [
            {
              title: props.intl.formatMessage({
                id: "Comun.codigo",
                defaultMessage: "Código",
              }),
              name: "codi",
            },
            {
              title: props.intl.formatMessage({
                id: "Comun.nombre",
                defaultMessage: "Nombre",
              }),
              name: "nomFiscal",
            },
          ],
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Comun.observaciones",
          defaultMessage: "Observaciones",
        }),
        type: "input",
        key: "observacions",
        breakpoints: {
          xs: 12,
          md: 12,
        },
      },
    ],
  };

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
        md: 2,
      },
      noEditable: true,
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 4),
        ...props.stringValidations.fieldExistsValidation(
          "puntsVenda",
          "codi",
          props.intl.formatMessage({
            id: "Comun.codigo",
            defaultMessage: "Código",
          })
        ),
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
        md: 3,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 30),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PuntoVenta.codigoAperturaCajon",
        defaultMessage: "Código apertura Cajón",
      }),
      type: "input",
      key: "codiAperturaCaixa",

      breakpoints: {
        xs: 12,
        md: 5,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 60)],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "PuntoVenta.liniasSaltoFinal",
        defaultMessage: "Linias Salto Final Ticket ",
      }),
      required: true,
      type: "numeric",
      key: "ticketNumLiniesEnBlancFinal",

      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.numberValidations.minMaxValidation(0, 99),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.cliente",
        defaultMessage: "Cliente",
      }),
      type: "LOV",
      key: "client",
      required: true,
      breakpoints: {
        xs: 12,
        md: 4,
      },
      selector: {
        key: "clients",
        labelKey: (data) => `${data.nomComercial} (${data.codi})`,
        sort: "descripcio",
        cannotCreate: true,
        advancedSearchColumns: [
          { title: CODE, name: "codi" },
          { title: NOM, name: "nomComercial" },
        ],
      },
      validationType: "object",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PuntoVenta.cajas",
        defaultMessage: "Cajas",
      }),
      type: "LOV",
      key: "caixa",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "caixas",
        labelKey: formatCodeAndDescription,
        sort: "descripcio",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
      },
      validationType: "object",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.almacen",
        defaultMessage: "Almacén",
      }),
      type: "LOV",
      key: "magatzem",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "magatzems",
        labelKey: formatCodeAndName,
        sort: "nom",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
      },
      validationType: "object",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PuntoVenta.cortePapel",
        defaultMessage: "Corte Papel",
      }),
      type: "input",
      key: "tallPaper",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 15)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.documentoPago",
        defaultMessage: "Documento pago/cobro",
      }),
      type: "LOV",
      key: "documentPagamentCobrament",
      required: true,
      breakpoints: {
        xs: 12,
        md: 4,
      },
      selector: {
        key: "documentPagamentCobraments",
        labelKey: formatCodeAndDescription,
        sort: "descripcio",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
      },
      validationType: "object",
      validations: [...props.commonValidations.requiredValidation()],
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
        id: "Presupuestos.operario",
        defaultMessage: "Operario",
      }),
      type: "LOV",
      key: "operari",
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
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PuntoVenta.ultimoAZ",
        defaultMessage: "Último AZ",
      }),
      type: "numeric",
      key: "darrerAz",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 2147483648)],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.serieVenta",
        defaultMessage: "Serie Venta",
      }),
      type: "LOV",
      key: "serie",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        key: "serieVendas",
        labelKey: formatCodeAndDescription,
        sort: "descripcio",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.divisaSecundaria",
        defaultMessage: "Divisa",
      }),
      type: "LOV",
      key: "divisaSecundaria",
      id: "divisa",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        key: "divisas",
        labelKey: formatCodeAndName,
        sort: "descripcio",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PuntoVenta.tipoImpresion",
        defaultMessage: "Tipo impresión",
      }),
      type: "select",
      key: "impressioTipus",
      required: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        options: TIPO_IMPRESION_PUNT_VENTA_VALUES,
      },
      validationType: "string",
      validations: [...props.commonValidations.requiredValidation()],
    },
    // {
    //   placeHolder: props.intl.formatMessage({
    //     id: "PuntoVenta.horaInicio",
    //     defaultMessage: "Hora Inicio Día",
    //   }),
    //   type: "date",
    //   key: "horaIniciDia",

    //   breakpoints: {
    //     xs: 12,
    //     md: 2,
    //   },
    // },

    {
      placeHolder: props.intl.formatMessage({
        id: "PuntoVenta.direccionIp",
        defaultMessage: "Dirección IP",
      }),
      type: "input",
      key: "adreçaIp",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 60)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PuntoVenta.nombreBdTpv",
        defaultMessage: "Nombre BD TPV",
      }),
      type: "input",
      key: "tpvBaseDadesNom",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 20)],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "PuntoVenta.carpetasImg",
        defaultMessage: "Carpetas Imágenes",
      }),
      type: "input",
      key: "carpetaImatges",

      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 80)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PuntoVenta.carpetasTpv",
        defaultMessage: "Carpetas TPV",
      }),
      type: "input",
      key: "tpvCarpeta",

      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 80)],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "PuntoVenta.fechaImpresion",
        defaultMessage: "Fecha impresión",
      }),
      type: "date",
      key: "dataImp",

      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PuntoVenta.ticketIva",
        defaultMessage: "Ticket IVA incluido",
      }),
      type: "checkbox",
      key: "ticketIvaInclos",

      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
  ];

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
