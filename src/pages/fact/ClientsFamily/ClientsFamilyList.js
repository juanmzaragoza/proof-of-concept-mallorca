import React, { useEffect } from "react";
import ReactGrid from "../../../modules/ReactGrid";
import { bindActionCreators, compose } from "redux";
import {
  setBreadcrumbHeader,
  setListingConfig,
} from "../../../redux/pageHeader";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import * as API from "redux/api";

const ClientsFamilyList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "FamiliaClientes.titulo",
        defaultMessage: "Familias cliente",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "FamiliaClientes.titulo",
          defaultMessage: "Familias cliente",
        }),
        href: "/fact/familia-clientes",
      },
    ]);
  }, []);

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });
  const DESCRIPCIO = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
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

  const tipoRiesgo = {
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
  };

  const tarifaDescompte = {
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
  };

  const listConfiguration = {
    columns: [
      {
        name: "codi",
        title: props.intl.formatMessage({
          id: "Cliente.codigo",
          defaultMessage: "Código",
        }),
        inlineEditionDisabled: true,
      },
      {
        name: "nom",
        title: props.intl.formatMessage({
          id: "Cliente.nombre",
          defaultMessage: "Nombre",
        }),
      },
      {
        name: "compteVendesComptabilitat",
        title: props.intl.formatMessage({
          id: "FamiliaClientes.cuentaVentas",
          defaultMessage: "Cuenta ventas",
        }),
      },
      {
        name: "tipusRisc",
        title: props.intl.formatMessage({
          id: "FamiliaClientes.tipoRiesgo",
          defaultMessage: "Tipus Risc",
        }),
        getCellValue: (row) => row.tipusRisc?.description ?? "",
        field: tipoRiesgo,
      },
      {
        name: "tarifaDescompte",
        title: props.intl.formatMessage({
          id: "FamiliaClientes.tarifaDescuento",
          defaultMessage: "Tarifa descuento",
        }),
        getCellValue: (row) => row.tarifaDescompte?.description ?? "",
        field: tarifaDescompte,
      },
      {
        name: "observacions",
        title: props.intl.formatMessage({
          id: "Comun.observaciones",
          defaultMessage: "Observaciones",
        }),
      },
    ],
    URL: API.familiaClient,
    listKey: "familiaClients",
    enableInlineEdition: true,
  };
  return <ReactGrid id="familiaClient" configuration={listConfiguration} />;
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

export default compose(
  injectIntl,
  connect(null, mapDispatchToProps)
)(ClientsFamilyList);
