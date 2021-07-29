import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import ReactGrid from "modules/ReactGrid";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import * as API from "redux/api";

const ArticleFamilyTranspList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "FamTransp.titulo",
        defaultMessage: "Familias y Transportistas",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "FamTransp.titulo",
          defaultMessage: "Familias y Transportistas",
        }),
        href: "/fact/familia-transportista",
      },
    ]);
  }, []);

  const listConfiguration = {
    columns: [
      {
        name: "numero",
        title: props.intl.formatMessage({
          id: "FamTransp.num",
          defaultMessage: "Num.",
        }),
      },
      {
        name: "articleFamilia.description",
        title: props.intl.formatMessage({
          id: "Proveedores.familia",
          defaultMessage: "Familia",
        }),
        getCellValue: (row) => row.articleFamilia?.description ?? "",
      },

      {
        name: "nomTransportista",
        title: props.intl.formatMessage({
          id: "FamTransp.nombreTransp",
          defaultMessage: "Nombre Transportista",
        }),
      },
      {
        name: "nifTransportista",
        title: props.intl.formatMessage({
          id: "FamTransp.nifTransp",
          defaultMessage: "NIF Transportista",
        }),
      },
    ],
    URL: API.articlesFamiliaTransportista,
    listKey: "articleFamiliaTransportistas",
  };
  return (
    <ReactGrid
      id="articlesFamiliaTransportista"
      configuration={listConfiguration}
    />
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
)(ArticleFamilyTranspList);
