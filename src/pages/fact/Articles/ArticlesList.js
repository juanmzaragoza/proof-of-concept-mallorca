import React, { useEffect, useState } from "react";
import * as API from "../../../redux/api";
import ReactGrid from "../../../modules/ReactGrid";
import { bindActionCreators, compose } from "redux";
import { Chip } from "@material-ui/core";
import {
  setBreadcrumbHeader,
  setListingConfig,
} from "../../../redux/pageHeader";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import AdvancedFilters from "../../../modules/AdvancedFilters";

const ArticlesList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Articulos.titulo",
        defaultMessage: "Artículos",
      }),
    });
    actions.setBreadcrumbHeader([
      { title: "Artículos", href: "/fact/articulos" },
    ]);
  }, []);

  const [filters, setFilters] = useState([]);

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
  const aSCodeAndName = [
    { title: CODE, name: "codi" },
    {
      title: props.intl.formatMessage({
        id: "Comun.nombre",
        defaultMessage: "Nombre",
      }),
      name: "nom",
    },
  ];

  const listConfiguration = {
    title: props.intl.formatMessage({
      id: "Articulos.titulo",
      defaultMessage: "Artículos",
    }),
    columns: [
      {
        name: "codi",
        title: props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código",
        }),
      },
      {
        name: "descripcioCurta",
        title: props.intl.formatMessage({
          id: "Comun.nombre",
          defaultMessage: "Nombre",
        }),
      },
      {
        name: "bloquejat",
        title: props.intl.formatMessage({
          id: "Proveedores.bloqueado",
          defaultMessage: "Bloqueado",
        }),
        getCellValue: (row) =>
          row.bloquejat && row.bloquejat === true
            ? `${props.intl.formatMessage({
                id: "Comun.SI",
                defaultMessage: "SI",
              })}`
            : `${props.intl.formatMessage({
                id: "Comun.NO",
                defaultMessage: "NO",
              })}`,
      },
    ],
    URL: API.articles,
    listKey: "articles",
  };

  const advancedFilters = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Comun.codigo",
        defaultMessage: "Código",
      }),
      type: "input",
      key: "codi",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      variant: "outlined",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Comun.nombre",
        defaultMessage: "Nombre",
      }),
      type: "input",
      key: "descripcioCurta",
      breakpoints: {
        xs: 12,
        md: 8,
      },
      variant: "outlined",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.familia",
        defaultMessage: "Familia",
      }),
      type: "LOV",
      key: "familia",
      id: "articleFamilia",
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
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "ArticulosModelo.titulo",
        defaultMessage: "Modelo",
      }),
      type: "LOV",
      key: "model",
      id: "articlesModel",
      required: false,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "articleModels",
        labelKey: (data) => `${data.descripcio} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "ArticulosGama.titulo",
        defaultMessage: "Gama",
      }),
      type: "LOV",
      key: "gamma",
      id: "articlesGama",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "articleGammas",
        labelKey: (data) => `${data.descripcio} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "ArticulosMarca.titulo",
        defaultMessage: "Marca",
      }),
      type: "LOV",
      key: "marca",
      id: "articlesMarca",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "articleMarcas",
        labelKey: (data) => `${data.nom} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
      },
    },
  ];

  return (
    <>
      <AdvancedFilters fields={advancedFilters} handleSearch={setFilters} />
      <ReactGrid
        id="articlesFact"
        extraQuery={filters}
        configuration={listConfiguration}
      />
    </>
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
)(ArticlesList);
