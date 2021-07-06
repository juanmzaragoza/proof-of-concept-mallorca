import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import ReactGrid from "modules/ReactGrid";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import * as API from "redux/api";

const UnitTypeList = ({ actions, ...props }) => {

  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "TipoUnidad.titulo",
        defaultMessage: "Tipo de Unidades",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "TipoUnidad.titulo",
          defaultMessage: "Tipo de Unidades",
        }),
        href: "/tipo-unidad",
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
        name: "descripcio",
        title: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Descripción",
        }),
      },
    ],
    URL: API.tipusUnitats,
    listKey: "unitatTipuses",
  };
  return <ReactGrid id="tipusUnitats" configuration={listConfiguration} />;
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
)(UnitTypeList);
