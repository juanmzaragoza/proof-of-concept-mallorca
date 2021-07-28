import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import ReactGrid from "modules/ReactGrid";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import * as API from "redux/api";

const FactoringLineList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "LiniasFactoring.titulo",
        defaultMessage: "Linias Factoring",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "LiniasFactoring.titulo",
          defaultMessage: "Linias Factoring",
        }),
        href: "/fact/linias-factoring",
      },
    ]);
  }, []);

  const listConfiguration = {
    columns: [
      {
        name: "contracteNumero",
        title: props.intl.formatMessage({
          id: "LiniasFactoring.numContrato",
          defaultMessage: "Num. Contrato",
        }),
      },
      {
        name: "banc",
        title: props.intl.formatMessage({
          id: "LiniasFactoring.codigoBanco",
          defaultMessage: "Código Banco",
        }),
      },
      {
        name: "bancNom",
        title: props.intl.formatMessage({
          id: "LiniasFactoring.nombreBanco",
          defaultMessage: "Nombre Banco",
        }),
      },
      {
        name: "bancNif",
        title: props.intl.formatMessage({
          id: "LiniasFactoring.cif",
          defaultMessage: "CIF",
        }),
      },
      {
        name: "importLimit",
        title: props.intl.formatMessage({
          id: "LiniasFactoring.importeLimite",
          defaultMessage: "Importe Límite",
        }),
      },
    ],
    URL: API.liniaFactoring,
    listKey: "liniaFactorings",
  };
  return <ReactGrid id="liniaFactoring" configuration={listConfiguration} />;
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
)(FactoringLineList);
