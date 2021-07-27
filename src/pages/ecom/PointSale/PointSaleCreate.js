import React from "react";
import { injectIntl } from "react-intl";
import { compose } from "redux";

import CreateUpdateForm from "modules/ReactGrid/CreateUpdateForm";
import { withValidations } from "modules/wrappers";
import * as API from "redux/api";
import {
  TIPO_ENUM_PUNT_VENTA_VALUES,
  TIPO_IMPRESION_PUNT_VENTA_VALUES,
} from "constants/selectors";

const PointSaleCreate = (props) => {
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
          "puntVenda",
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
        md: 6,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 40),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PuntoVenta.enumeracionTipo",
        defaultMessage: "Enumeración tipo",
      }),
      type: "select",
      key: "enumeracioTipus",
      required: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        options: TIPO_ENUM_PUNT_VENTA_VALUES,
      },
      validationType: "string",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PuntoVenta.liniasEnBlanco",
        defaultMessage: "Linias en blanco ",
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
        ...props.numberValidations.minMaxValidation(0, 100)
      ],
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

    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.divisa",
        defaultMessage: "Divisa",
      }),
      type: "LOV",
      key: "divisa",
      id: "divisas",
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
      validation: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.cliente",
        defaultMessage: "Cliente",
      }),
      type: "LOV",
      key: "client",
      id: "cliente",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
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
      validation: [...props.commonValidations.requiredValidation()],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.documentoPago",
        defaultMessage: "Documento pago/cobro",
      }),
      type: "LOV",
      key: "documentPagamentCobrament",
      id: "documentPagamentCobraments",
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
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "PuntoVenta.cajas",
        defaultMessage: "Cajas",
      }),
      type: "LOV",
      key: "caixa",
      id: "caixes",
      required: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        key: "caixas",
        labelKey: formatCodeAndDescription,
        sort: "descripcio",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.operario",
        defaultMessage: "Operario",
      }),
      type: "LOV",
      key: "operari",
      required: true,
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
        validationType: "object",
        validation: [...props.commonValidations.requiredValidation()],
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.almacen",
        defaultMessage: "Almacén",
      }),
      type: "LOV",
      key: "magatzem",
      id: "magatzems",
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
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.serieVenta",
        defaultMessage: "Serie Venta",
      }),
      type: "LOV",
      key: "serie",
      id: "serieVenda",
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
        id: "Presupuestos.divisa",
        defaultMessage: "Divisa",
      }),
      type: "LOV",
      key: "divisaSecundaria",
      id: "divisas",
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
        id: "PuntoVenta.codigoApertura",
        defaultMessage: "Código apertura caja",
      }),
      type: "input",
      key: "codiAperturaCaixa",

      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PuntoVenta.direccionIp",
        defaultMessage: "Dirección IP",
      }),
      type: "input",
      key: "adreçaIp",

      breakpoints: {
        xs: 12,
        md: 3,
      },
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
        md: 3,
      },
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
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PuntoVenta.nombreTpv",
        defaultMessage: "Nombre TPV",
      }),
      type: "input",
      key: "tpvBaseDadesNom",

      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PuntoVenta.ultimoAZ",
        defaultMessage: "Último AZ",
      }),
      type: "input",
      key: "darrerAz",

      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PuntoVenta.cabezera",
        defaultMessage: "Cabezera ticket",
      }),
      type: "input",
      key: "ticketCapçalera",

      breakpoints: {
        xs: 12,
        md: 6,
      },
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
    {
      placeHolder: props.intl.formatMessage({
        id: "PuntoVenta.pie",
        defaultMessage: "Pie del ticket",
      }),
      type: "input",
      key: "ticketPeu",

      breakpoints: {
        xs: 12,
        md: 10,
      },
      text: {
        multiline: 2,
      },
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
  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "PuntoVenta.titulo",
        defaultMessage: "Punto Venta",
      })}
      formConfiguration={createConfiguration}
      url={API.puntVenda}
    />
  );
};

export default compose(withValidations, injectIntl)(PointSaleCreate);
