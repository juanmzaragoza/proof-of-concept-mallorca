import React, { useEffect } from "react";
import ReactGrid from "../../../modules/ReactGrid";
import { bindActionCreators, compose } from "redux";
import {
  setBreadcrumbHeader,
  setListingConfig,
} from "../../../redux/pageHeader";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import * as API from "redux/api";

const PostalCodeList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "CodigosPostales.titulo",
        defaultMessage: "Codigos Postales",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "CodigosPostales.titulo",
          defaultMessage: "Codigos Postales",
        }),
        href: "/fact/codigo-postal",
      },
    ]);
  }, []);
  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });
  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });
  const aSCodeAndName = [
    { title: CODE, name: "codi" },
    { title: NOM, name: "nom" },
  ];

  const provincia = {
    placeHolder: props.intl.formatMessage({
      id: "CodigoPostal.provincia",
      defaultMessage: "Provincia",
    }),
    type: "LOV",
    key: "provincia",
    required: true,
    breakpoints: {
      xs: 12,
      md: 6,
    },
    selector: {
      key: "provincias",
      labelKey: (data) => `${data.nom} (${data.codi})`,
      sort: "codi",
      cannotCreate: true,
      advancedSearchColumns: aSCodeAndName,
    },
  };

  const pais = {
    placeHolder: props.intl.formatMessage({
      id: "CodigoPostal.pais",
      defaultMessage: "País",
    }),
    type: "LOV",
    key: "pais",
    required: true,
    breakpoints: {
      xs: 12,
      md: 6,
    },
    selector: {
      key: "paises",
      labelKey: (data) => `${data.nom} (${data.codi})`,
      sort: "codi",
      cannotCreate: true,
      relatedWith: [
        {
          name: "provincia",
          filterBy: "pais.id",
          keyValue: "id",
        },
      ],
      advancedSearchColumns: aSCodeAndName,
    },
  };

  const listConfiguration = {
    columns: [
      {
        name: "codi",
        title: CODE,
        inlineEditionDisabled: true,
      },
      {
        name: "poblacio",
        title: props.intl.formatMessage({
          id: "CodigoPostal.poblacion",
          defaultMessage: "Población",
        }),
      },
      {
        name: "municipi",
        title: props.intl.formatMessage({
          id: "CodigoPostal.municipio",
          defaultMessage: "Municipio",
        }),
      },

      {
        name: "provincia",
        title: props.intl.formatMessage({
          id: "Provincias.titol",
          defaultMessage: "Provincia",
        }),
        getCellValue: (row) => row.provincia?.description ?? "",
        field: provincia,
      },
      {
        name: "pais",
        title: props.intl.formatMessage({
          id: "Paises.titol",
          defaultMessage: "País",
        }),
        getCellValue: (row) => row.pais?.description ?? "",
        field: pais,
      },
    ],
    URL: API.codiPostal,
    listKey: "codiPostals",
    enableInlineEdition: true,
  };
  return <ReactGrid id="codiPostal" configuration={listConfiguration} />;
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
)(PostalCodeList);
