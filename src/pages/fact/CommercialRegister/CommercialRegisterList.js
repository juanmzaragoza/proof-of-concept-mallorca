import React, { useEffect } from "react";
import ReactGrid from "../../../modules/ReactGrid";
import { bindActionCreators, compose } from "redux";
import { setBreadcrumbHeader, setListingConfig } from "../../../redux/pageHeader";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import * as API from "redux/api";

const CommercialRegisterList = ({ actions, ...props }) => {

  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "RegistroComercial.titulo",
        defaultMessage: "Registros Comerciales",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "RegistroComercial.titulo",
        defaultMessage: "Registros Comerciales",
        }),
        href: "/fact/registros-comerciales",
      },
    ]);
  }, []);

  const listConfiguration = {
    columns: [
      {
        name: "interessat",
        title: props.intl.formatMessage({
          id: "RegistroComercial.interesado",
          defaultMessage: "Interesado",
        }),
      },
      {
        name: "interessat",
        title: props.intl.formatMessage({
          id: "RegistroComercial.descripcion",
          defaultMessage: "Descripción del Medio",
        }),
      },
    ],
    URL: API.registreComercial,
    listKey: "registreComercials",
  };
  return <ReactGrid id="registreComercial" configuration={listConfiguration} />;
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
)(CommercialRegisterList);
