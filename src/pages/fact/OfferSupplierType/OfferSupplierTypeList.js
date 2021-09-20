import React, {useEffect, useState} from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import ReactGrid from "modules/ReactGrid";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import * as API from "redux/api";

import { creationFields } from "./configuration";

const OfferSupplierList = ({ actions, ...props }) => {
  const [listConfig, setListConfig] = useState({
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
        name: "descripcioTipusOfertesProveidors",
        title: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Descripción",
        }),
      },
    ],
    URL: API.tipusOfertesProveidor,
    listKey: "tipusOfertaProveidors",
    enableInlineEdition: true
  });

  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "TipoOfertaProv.titulo",
        defaultMessage: "Tipo Oferta Proveedor",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "TipoOfertaProv.titulo",
          defaultMessage: "Tipo Oferta Proveedor",
        }),
        href: "/fact/tipo-oferta-proveedor",
      },
    ]);
    // validations
    const columns = listConfig.columns.map(column => {
      const field = creationFields(props).find(field => field.key === column.name);
      if(field) column.field = field;
      return column;
    });
    setListConfig({...listConfig, columns });
  }, []);

  return (
    <ReactGrid id="tipusOfertesProveidor" configuration={listConfig} />
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
)(OfferSupplierList);
