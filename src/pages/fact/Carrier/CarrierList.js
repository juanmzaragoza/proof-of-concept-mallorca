import React, { useEffect } from "react";
import * as API from "../../../redux/api";
import ReactGrid from "../../../modules/ReactGrid";
import { bindActionCreators, compose } from "redux";
import {
  setBreadcrumbHeader,
  setListingConfig,
} from "../../../redux/pageHeader";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";

const CarrierList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Transportistas.titulo",
        defaultMessage: " Transportistas",
      }),
    });
    actions.setBreadcrumbHeader([
      { title: "Transportistas", href: "/fact/transportistas" },
    ]);
  }, []);

  const listConfiguration = {
    title: props.intl.formatMessage({
      id: "Transportistas.titulo",
      defaultMessage: "Transportistas",
    }),
    columns: [
      {
        name: "codi",
        title: props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código",
        }),
      },
      {
        name: "nom",
        title: props.intl.formatMessage({
          id: "Comun.nombre",
          defaultMessage: "Nombre",
        }),
      },

      {
        name: "nif",
        title: props.intl.formatMessage({
          id: "Proveedores.nif",
          defaultMessage: "NIF",
        }),
      },
      {
        name: "divisa.description",
        title: props.intl.formatMessage({
          id: "Divisa.titulo",
          defaultMessage: "Divisa",
        }),
        getCellValue: (row) =>
          row.divisa?.description ? row.divisa.description : "",
      },
      {
        name: "codiPostal.description",
        title: props.intl.formatMessage({
          id: "Clientes.fact.codigoPostal",
          defaultMessage: "Código Postal",
        }),
        getCellValue: (row) =>
          row.codiPostal?.description ? row.codiPostal.description : "",
      },
    ],
    URL: API.transportista,
    listKey: "transportistas",
  };

  return (
    <>
      <ReactGrid id="transportista" configuration={listConfiguration} />
    </>
  );
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
)(CarrierList);
