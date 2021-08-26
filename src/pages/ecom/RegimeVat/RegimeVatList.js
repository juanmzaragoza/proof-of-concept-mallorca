import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import ReactGrid from "modules/ReactGrid";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import * as API from "redux/api";

const RegimeVatList = ({ actions, ...props }) => {

  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "RegimenIva.titulo",
        defaultMessage: "Régimen Iva",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "RegimenIva.titulo",
          defaultMessage: "Régimen Iva",
        }),
        href: "/ecom/iva",
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
        inlineEditionDisabled: true
      },
      {
        name: "descripcio",
        title: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Descripción",
        }),
      },
      {
        name: "codiComptabilitat",
        title: props.intl.formatMessage({
          id: "Iva.codigoCont",
          defaultMessage: "Código contabilidad",
        }),
      },
      {
        name: "codiFacturaElectronica",
        title: props.intl.formatMessage({
          id: "RegimenIva.codigoFact",
          defaultMessage: "Código factura electrónica",
        }),
      },
    ],
    URL: API.regimIvas,
    listKey: "regimIvas",
    enableInlineEdition: true
  };
  return <ReactGrid id="regimIvas" configuration={listConfiguration} />;
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
)(RegimeVatList);
