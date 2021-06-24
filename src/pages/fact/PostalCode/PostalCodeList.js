import React, { useEffect } from "react";
import ReactGrid from "../../../modules/ReactGrid";
import { bindActionCreators, compose } from "redux";
import { setBreadcrumbHeader, setListingConfig } from "../../../redux/pageHeader";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import * as API from "redux/api";

const PostalCodeList = ({ actions, ...props }) => {

  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "CodigosPostales.titulo",
        defaultMessage: "Codigos Postales",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "CodigosPostales.titulo",
          defaultMessage: "Codigos Postales",
        }),
        href: "/codigo-postal",
      },
    ]);
  }, []);

  const listConfiguration = {
    columns: [
      {
        name: "codi",
        title: props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código",
        }),
      },
      {
        name: "pais",
        title: props.intl.formatMessage({
          id: "Paises.titol",
          defaultMessage: "País",
        }),
        getCellValue: row => row.pais?.description ?? ""
      },
      {
        name: "provincia",
        title: props.intl.formatMessage({
          id: "Provincias.titol",
          defaultMessage: "Provincia",
        }),
        getCellValue: row => row.provincia?.description ?? ""
      },
    ],
    URL: API.codiPostal,
    listKey: "codiPostals",
  };
  return <ReactGrid id="codiPostal" configuration={listConfiguration} />;
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
)(PostalCodeList);
