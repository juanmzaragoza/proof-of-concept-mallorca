import React, { useEffect } from "react";
import ReactGrid from "../../../modules/ReactGrid";
import { bindActionCreators, compose } from "redux";
import { setBreadcrumbHeader, setListingConfig } from "../../../redux/pageHeader";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import * as API from "redux/api";

const CommercialRegisterList = ({ actions, ...props }) => {

  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "RegistroComercial.titulo",
        defaultMessage: "Registros Comerciales",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "RegistroComercial.titulo",
        defaultMessage: "Registros Comerciales",
        }),
        href: "/fact/registros-comerciales",
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

  const NOM_COMERCIAL = props.intl.formatMessage({
    id: "Proveedores.nombre_comercial",
    defaultMessage: "Nombre Comercial",
  });

  const aSCodeAndNameComercial = [
    { title: CODE, name: "codi" },
    { title: NOM_COMERCIAL, name: "nomComercial" },
  ];


  const cliente =     {
    placeHolder: props.intl.formatMessage({
      id: "Clientes.titulo",
      defaultMessage: "Clientes"
    }),
    type: 'LOV',
    key: 'client',
    breakpoints: {
      xs: 12,
      md: 5
    },
    selector: {
      key: "clients",
      labelKey: (data) => `${data.nomComercial} (${data.codi})`,
      sort: 'codi',
      cannotCreate: true,
      advancedSearchColumns: aSCodeAndNameComercial
    },
  };

  const producto =  {
    placeHolder: props.intl.formatMessage({
      id: "RegistroComercial.productos",
      defaultMessage: "Productos"
    }),
    type: 'LOV',
    key: 'producte',
    breakpoints: {
      xs: 12,
      md: 4
    },
    selector: {
      key: "productes",
      labelKey: (data) => `${data.nom} (${data.codi})`,
      sort: 'codi',
      cannotCreate: true,
      advancedSearchColumns: aSCodeAndName
    },
  };

  const listConfiguration = {
    columns: [
      {
        name: "interessat",
        title: props.intl.formatMessage({
          id: "RegistroComercial.interesado",
          defaultMessage: "Interesado",
        }),
      },
      {
        name: "descripcioMitja",
        title: props.intl.formatMessage({
          id: "RegistroComercial.descripcion",
          defaultMessage: "Descripción del Medio",
        }),
      },
      {
        name: "client",
        title: props.intl.formatMessage({
          id: "Clientes.titulo",
          defaultMessage: "Clientes"
        }),
        getCellValue: (row) => (row.client ? row.client.description : ""),
        field:cliente
      },
      {
        name: "producte",
        title:  props.intl.formatMessage({
          id: "RegistroComercial.productos",
          defaultMessage: "Productos"
        }),
        getCellValue: (row) => (row.producte ? row.producte.description : ""),
        field:producto
      },
    ],
    URL: API.registreComercial,
    listKey: "registreComercials",
    enableInlineEdition: true
  };
  return <ReactGrid id="registreComercial" configuration={listConfiguration} />;
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
)(CommercialRegisterList);
