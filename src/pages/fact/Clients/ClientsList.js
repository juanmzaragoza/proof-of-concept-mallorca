import React, { useEffect,useState} from "react";
import * as API from "redux/api";
import ReactGrid from "modules/ReactGrid";
import { bindActionCreators, compose } from "redux";
import {
  setBreadcrumbHeader,
  setListingConfig,
} from "redux/pageHeader";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import AdvancedFilters from "modules/AdvancedFilters";

const ClientList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Clientes.titulo",
        defaultMessage: " Clientes",
      }),
    });
    actions.setBreadcrumbHeader([{ title: "Clientes", href: "/clientes" }]);
  }, []);

  const [filters, setFilters] = useState([]);


  const listConfiguration = {
    title: props.intl.formatMessage({
      id: "Clientes.titulo",
      defaultMessage: "Clientes",
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
        name: "nomFiscal",
        title: props.intl.formatMessage({
          id: "Proveedores.nombre_fiscal",
          defaultMessage: "Nombre fiscal",
        }),
      },
      {
        name: "nif",
        title: props.intl.formatMessage({
          id: "Empresas.nif",
          defaultMessage: "NIF",
        }),
      },
      {
        name: "familiaClient.description",
        title: props.intl.formatMessage({
          id: "Proveedores.familia",
          defaultMessage: "Familia",
        }),
        getCellValue: (row) =>
          row.familiaClient?.description ? row.familiaClient.description : "",
      },
      {
        name: "codiPostal.description",
        title: props.intl.formatMessage({
          id: "Proveedores.Direccion.codPostal",
          defaultMessage: "Codi postal",
        }),
        getCellValue: (row) =>
          row.codiPostal?.description ? row.codiPostal.description : "",
      },
    ],
    URL: API.clientes,
    listKey: "clients",
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
        md: 3,
      },
      variant: "outlined",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.nombre_comercial",
        defaultMessage: "Nombre Comercial",
      }),
      type: "input",
      key: "nomComercial",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      variant: "outlined",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.nombre_fiscal",
        defaultMessage: "Nombre Fiscal",
      }),
      type: "input",
      key: "nomFiscal",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      variant: "outlined",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.nif",
        defaultMessage: "NIF",
      }),
      type: "input",
      key: "nif",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      variant: "outlined",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.alias",
        defaultMessage: "Alias",
      }),
      type: "input",
      key: "alias",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      variant: "outlined",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.familia",
        defaultMessage: "Familia",
      }),
      type: "LOV",
      key: "familiaClient",

      breakpoints: {
        xs: 12,
        md: 6,
      },
      variant: "outlined",
      selector: {
        key: "familiaClients",
        labelKey: (data) => `${data.nom} (${data.codi})`,
        sort: "nom",
        creationComponents: [
          {
            type: "input",
            key: "codi",
            placeHolder: props.intl.formatMessage({
              id: "Comun.codigo",
              defaultMessage: "Código",
            }),
            required: true,
            noEditable: true,
            breakpoints: {
              xs: 12,
              md: 6,
            },
          },
          {
            type: "input",
            key: "nom",
            placeHolder: props.intl.formatMessage({
              id: "Comun.nombre",
              defaultMessage: "Nombre",
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 6,
            },
          },
        ],
        advancedSearchColumns: [
          {
            title: props.intl.formatMessage({
              id: "Comun.codigo",
              defaultMessage: "Código",
            }),
            name: "codi",
          },
          {
            title: props.intl.formatMessage({
              id: "Comun.nombre",
              defaultMessage: "Nombre",
            }),
            name: "nom",
          },
        ],
      },
    },
  ];

  return (
    <>
     <AdvancedFilters fields={advancedFilters} handleSearch={setFilters} />
      <ReactGrid id="clientes" extraQuery={filters} configuration={listConfiguration} />
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
)(ClientList);
