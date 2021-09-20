import React, { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import {
  TIPO_IMPRESION_PUNT_VENTA_VALUES,
  TIPO_ENUM_PUNT_VENTA_VALUES,
} from "constants/selectors";

import GenericForm from "modules/GenericForm";

import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import { getObjectFrom } from "helper/storage";
import { ENTERPRISE_GROUP_VALUE_LOCALSTORAGE_KEY } from "../../../constants";
import { useTabForm } from "hooks/tab-form";

const POINT_SALE_SECTION_INDEX = 0;


const GeneralTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [POINT_SALE_SECTION_INDEX]: false,

    },
    setIsValid: props.setIsValid,
  });

  const enterpriseGroup = getObjectFrom(
    ENTERPRISE_GROUP_VALUE_LOCALSTORAGE_KEY
  );

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
      extraQuery: [
        {
          columnName: "empresa.codi",
          value: `"${enterpriseGroup.value.codi}"`,
          exact: true,
        },
      ],
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
        md: 4,
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
      },
      validationType: "object",
      validations: [...props.commonValidations.requiredValidation()],
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
        id: "PuntoVenta.impresionDelTicket",
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

    // {
    //   placeHolder: props.intl.formatMessage({
    //     id: "PuntoVenta.fechaImpresion",
    //     defaultMessage: "Fecha impresión",
    //   }),
    //   type: "date",
    //   key: "dataImp",

    //   breakpoints: {
    //     xs: 12,
    //     md: 2,
    //   },
    // },
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
        id: "PuntoVenta.cabezera",
        defaultMessage: "Cabezera ticket",
      }),
      type: "observations",
      key: "ticketCapçalera",

      breakpoints: {
        xs: 12,
        md: 1,
      },
      text: {
        multiline: 6,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 1000)],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "PuntoVenta.pie",
        defaultMessage: "Pie del ticket",
      }),
      type: "observations",
      key: "ticketPeu",

      breakpoints: {
        xs: 12,
        md: 1,
      },
      text: {
        multiline: 6,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 1000)],
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
          handleIsValid={(value) =>
            addValidity(POINT_SALE_SECTION_INDEX, value)
          }
          onBlur={(e) => handleTouched(POINT_SALE_SECTION_INDEX)}
          {...props}
        />
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(GeneralTab);
