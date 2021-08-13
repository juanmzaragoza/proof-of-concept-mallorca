import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import ReactGrid from "modules/ReactGrid";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import * as API from "redux/api";

const CostsTypeList = ({ actions, ...props }) => {

  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "TipoCostes.titulo",
        defaultMessage: "Tipo Costes",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "TipoCostes.titulo",
          defaultMessage: "Tipo Costes",
        }),
        href: "/fact/tipo-costes",
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
      {
        name: "tipus",
        title: props.intl.formatMessage({
          id: "TipoCostes.tipo",
          defaultMessage: "Tipo",
        }),
      },
      {
        name: "sequenciaAltaAutomatica",
        title: props.intl.formatMessage({
          id: "TipoCostes.secuenciaAutomatica",
          defaultMessage: "Secuència de Alta Automática",
        }),
      },
      


    ],
    URL: API.tipusCost,
    listKey: "tipusCosts",
  };
  return <ReactGrid id="tipusCost" configuration={listConfiguration} />;
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
)(CostsTypeList);
