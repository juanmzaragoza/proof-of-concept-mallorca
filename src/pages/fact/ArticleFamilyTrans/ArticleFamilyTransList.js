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


  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });

  const DESCRIPTION = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });

  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPTION, name: "descripcio" },
  ];


  const ARTICLE = {
    placeHolder: props.intl.formatMessage({
      id: "Proveedores.familia",
      defaultMessage: "Familia",
    }),
    type: "LOV",
    key: "articleFamilia",
    breakpoints: {
      xs: 12,
      md: 3,
    },
    selector: {
      key: "articleFamilias",
      labelKey: (data) => `${data.descripcio} (${data.codi})`,
      sort: "codi",
      cannotCreate: true,
      advancedSearchColumns: aSCodeAndDescription,
    },
  };

  const listConfiguration = {
    columns: [
      {
        name: "numero",
        title: props.intl.formatMessage({
          id: "FamTransp.num",
          defaultMessage: "Num.",
        }),
        inlineEditionDisabled: true
      },
      {
        name: 'articleFamilia',
        title: props.intl.formatMessage({
          id: "Proveedores.familia",
          defaultMessage: "Familia"
        }),
        getCellValue: row => row.articleFamilia? row.articleFamilia.description:"",
        field: ARTICLE
  
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
    enableInlineEdition: true
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
