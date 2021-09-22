import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import { compose } from "redux";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import { withValidations } from "modules/wrappers";
import { useTabForm } from "../../../hooks/tab-form";
import ReactGrid from "modules/ReactGrid";
import MasterDetailedForm from "modules/ReactGrid/MasterDetailForm";
import * as API from "redux/api";

const AvisosTab = ({ formData, setFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: { 0: true },
    setIsValid: props.setIsValid,
  });

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });

  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });

  const DESCRIPCIO = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });

  const withRequiredValidation = (extraValidations = []) => {
    return {
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...extraValidations,
      ],
    };
  };

  const { id: supplierId } = useParams();

  const dataEntrada = {
    placeHolder: props.intl.formatMessage({
      id: "Proveedores.fechaEntrada",
      defaultMessage: "Fecha Entrada",
    }),
    type: "date",
    key: "datEnt",
    breakpoints: {
      xs: 12,
      md: 3,
    },
  };
  const dataFi = {
    placeHolder: props.intl.formatMessage({
      id: "Proveedores.fechaFin",
      defaultMessage: "Fecha Fin",
    }),
    type: "date",
    key: "datFin",
    breakpoints: {
      xs: 12,
      md: 3,
    },
  };

  const dataFiPrevista = {
    placeHolder: props.intl.formatMessage({
      id: "Proveedores.fechaPrevistaFin",
      defaultMessage: "Fecha Prevista Fin",
    }),
    type: "date",
    key: "datFinCal",
    breakpoints: {
      xs: 12,
      md: 3,
    },
  };
  const formatCodeAndName = (data) => `${data.nom} (${data.codi})`;
  const formatCodeAndDescription = (data) =>
    `${data.descripcio} (${data.codi})`;
  const aSCodeAndName = [
    { title: CODE, name: "codi" },
    { title: NOM, name: "nom" },
  ];
  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPCIO, name: "descripcio" },
  ];

  const emisor = {
    placeHolder: props.intl.formatMessage({
      id: "PedidosAlmacen.encargado",
      defaultMessage: "Encargado",
    }),
    type: "LOV",
    key: "operariCodi1",
    id: "operari",
    breakpoints: {
      xs: 12,
      md: 3,
    },
    selector: {
      key: "operaris",
      labelKey: formatCodeAndName,
      sort: "nom",
      transform: {
        apply: (operaris) => operaris && operaris.codi,
        reverse: (rows, codi) => rows.find((row) => row.codi === codi),
      },
      cannotCreate: true,
      advancedSearchColumns: aSCodeAndName,
    },
  };

  const destinatario = {
    placeHolder: props.intl.formatMessage({
      id: "PedidosAlmacen.encargado",
      defaultMessage: "Encargado",
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
      transform: {
        apply: (operaris) => operaris && operaris.codi,
        reverse: (rows, codi) => rows.find((row) => row.codi === codi),
      },
      cannotCreate: true,
      advancedSearchColumns: aSCodeAndName,
    },
  };

  const tipoAviso = {
    placeHolder: props.intl.formatMessage({
      id: "Proveedores.tipoAviso",
      defaultMessage: "Tipo Aviso",
    }),
    type: "LOV",
    key: "tipusAviso",
    breakpoints: {
      xs: 12,
      md: 3,
    },
    selector: {
      key: "tipusAvisoes",
      labelKey: formatCodeAndDescription,
      sort: "nom",

      cannotCreate: true,
      advancedSearchColumns: aSCodeAndDescription,
    },
  };

  const seccio = {
    placeHolder: props.intl.formatMessage({
      id: "SeccionEmpresa.seccion",
      defaultMessage: "Sección",
    }),
    type: "LOV",
    key: "seccioCodi",
    id: "seccio",
    required: true,
    breakpoints: {
      xs: 12,
      md: 3,
    },
    selector: {
      key: "seccios",
      labelKey: formatCodeAndName,
      sort: "codi",
      cannotCreate: true,
      advancedSearchColumns: aSCodeAndName,
      transform: {
        apply: (seccios) => seccios && seccios.codi,
        reverse: (rows, codi) => rows.find((row) => row.codi === codi),
      },
    },
    validationType: "string",
    ...withRequiredValidation(),
  };

  const avisosConfig = {
    title: props.intl.formatMessage({
      id: "Proveedores.avisos",
      defaultMessage: "Avisos",
    }),
    query: [
      {
        columnName: "proveidor.id",
        value: `"${supplierId}"`,
        exact: true,
      },
    ],
    extraPostBody: {
      proveidor: { id: supplierId },
    },
    columns: [
      {
        name: "numero",
        title: props.intl.formatMessage({
          id: "Proveedores.numero",
          defaultMessage: "Número",
        }),
        inlineEditionDisabled: true,
      },
      {
        name: "seccioCodi",
        title: props.intl.formatMessage({
          id: "SeccionEmpresa.seccion",
          defaultMessage: "Sección",
        }),

        field: seccio,
      },

      {
        name: "datEnt",
        title: props.intl.formatMessage({
          id: "Proveedores.fechaEntrada",
          defaultMessage: "Fecha Entrada",
        }),

        getCellValue: (row) =>
          row.datEnt ? new Date(row.datEnt).toLocaleDateString() : "",
        field: dataEntrada,
        allowFilter: false,
      },
      {
        name: "tipusAviso",
        title: props.intl.formatMessage({
          id: "Proveedores.tipoAviso",
          defaultMessage: "Tipo Aviso",
        }),
        getCellValue: (row) => row.tipusAviso?.description,
        field: tipoAviso,
      },
      {
        name: "descripcio",
        title: DESCRIPCIO,
      },
      {
        name: "operariCodiReb",
        title: props.intl.formatMessage({
          id: "Proveedores.emisor",
          defaultMessage: "Emisor",
        }),
        field: emisor,
      },
      {
        name: "operariCodiDti",
        title: props.intl.formatMessage({
          id: "Proveedores.destinatario",
          defaultMessage: "Destinatario",
        }),
        field: destinatario,
      },

      {
        name: "datFin",
        title: props.intl.formatMessage({
          id: "Proveedores.fechaFin",
          defaultMessage: "Fecha Fin",
        }),
        getCellValue: (row) =>
          row.datFin ? new Date(row.datFin).toLocaleDateString() : "",
        field: dataFi,
        allowFilter: false,
      },

      {
        name: "datFinCal",
        title: props.intl.formatMessage({
          id: "Proveedores.fechaPrevistaFin",
          defaultMessage: "Fecha Prevista Fin",
        }),
        getCellValue: (row) =>
          row.datFinCal ? new Date(row.datFinCal).toLocaleDateString() : "",
        field: dataFiPrevista,
        allowFilter: false,
      },
      {
        name: "estado",
        title: props.intl.formatMessage({
          id: "Proveedores.estado",
          defaultMessage: "Estado",
        }),
      },
    ],
    listKey: "avisoes",
    enableInlineEdition: true,
    enableExpandableContent: true,
    disabledUpdate: true,
  };
  const commercialAddressesFormConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.destinatario2",
        defaultMessage: "Destinatario 2",
      }),
      type: "LOV",
      key: "operariCodiDti2",
      id: "operari",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "operaris",
        labelKey: formatCodeAndName,
        sort: "nom",
        transform: {
          apply: (operaris) => operaris && operaris.codi,
          reverse: (rows, codi) => rows.find((row) => row.codi === codi),
        },
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SeccionEmpresa.seccion",
        defaultMessage: "Sección",
      }),
      type: "LOV",
      key: "seccioCodi",
      id: "seccio",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "seccios",
        labelKey: formatCodeAndName,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
        transform: {
          apply: (seccios) => seccios && seccios.codi,
          reverse: (rows, codi) => rows.find((row) => row.codi === codi),
        },
      },
      validationType: "string",
      ...withRequiredValidation(),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.numPedido",
        defaultMessage: "Num Pedido",
      }),
      type: "numeric",
      key: "numPer",
      breakpoints: {
        xs: 12,
        md: 1,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.titulo",
        defaultMessage: "Presupuesto",
      }),
      type: "LOV",
      key: "pressupost",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "pressuposts",
        labelKey: (data) =>
          `${data.serieVenda.pk.codi}/${data.numero}/${data.versio} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.descripcionCorta",
        defaultMessage: "descripcion corta",
      }),
      type: "input",
      key: "descripcioCurta",
      breakpoints: {
        xs: 12,
        md: 8,
      },

    },
  ];

  return (
    <Grid container>
      <Grid xs={12} item>
        <ReactGrid
          id="avisos"
          extraQuery={[
            {
              columnName: "proveidor.id",
              value: `"${supplierId}"`,
              exact: true,
            },
          ]}
          configuration={avisosConfig}
        >
          {(properties) => (
            <MasterDetailedForm
              url={API.avisos}
              formComponents={commercialAddressesFormConfig}
              {...properties}
            />
          )}
        </ReactGrid>
      </Grid>
    </Grid>
  );
};

export default compose(injectIntl, withValidations)(AvisosTab);
