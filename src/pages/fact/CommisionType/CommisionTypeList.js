import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import ReactGrid from "modules/ReactGrid";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import * as API from "redux/api";

const CommisionTypeList = ({ actions, ...props }) => {

  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "TipoComision.titulo",
        defaultMessage: "Tipos de Comisión",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "TipoComision.titulo",
        defaultMessage: "Tipos de Comisión",
        }),
        href: "/tipo-comision",
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
        name: "nom",
        title: props.intl.formatMessage({
          id: "Comun.nombre",
          defaultMessage: "Nombre",
        }),
      },
      {
        name: "descripcio",
        title: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Descripción",
        }),
      },
    ],
    URL: API.tipusComissio,
    listKey: "tipusComissios",
  };
  return <ReactGrid id="tipusComissio" configuration={listConfiguration} />;
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
)(CommisionTypeList);
