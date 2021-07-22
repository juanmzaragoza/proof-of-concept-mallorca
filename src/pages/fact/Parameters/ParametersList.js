import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import ReactGrid from "modules/ReactGrid";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import * as API from "redux/api";

const ParameterList = ({ actions, ...props }) => {

  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Parametros.titulo",
        defaultMessage: "Parámetros",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "Parametros.titulo",
          defaultMessage: "Parámetros",
        }),
        href: "/fact/parametros",
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
        name: "description",
        title: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Descripción",
        }),
      },
     
      {
        name: "value",
        title: props.intl.formatMessage({
          id: "Parametros.valor",
          defaultMessage: "Valor ",
        }),
      },


    ],
    URL: API.parametres,
    listKey: "parameters",
  };
  return <ReactGrid id="parametres" configuration={listConfiguration} />;
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
)(ParameterList);
