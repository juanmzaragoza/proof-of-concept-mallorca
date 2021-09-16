import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Chip } from "@material-ui/core";
import ReactGrid from "modules/ReactGrid";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import * as API from "redux/api";

const BillingTypeList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "tiposFacturacion.titulo",
        defaultMessage: "Tipos de Facturación",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "tiposFacturacion.titulo",
          defaultMessage: "Tipos de Facturación",
        }),
        href: "/fact/tipo-facturacion",
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
        inlineEditionDisabled: true,
      },
      {
        name: "descripcio",
        title: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Descripción",
        }),
      },
      {
        name: "concedimCredit",
        title: props.intl.formatMessage({
          id: "TiposFacturacion.obligarFacturar",
          defaultMessage: "Obligar a Facturar los Albaranes",
        }),
        getCellValue: (row) => (row.concedimCredit ? row.concedimCredit : false),
      },
    ],
    URL: API.tipusFacturacio,
    listKey: "tipusFacturacios",
    enableInlineEdition: true,
  };
  return <ReactGrid id="tipusFacturacio" configuration={listConfiguration} />;
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
)(BillingTypeList);
