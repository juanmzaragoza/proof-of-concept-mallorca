import React, { useEffect } from "react";
import ReactGrid from "../../../modules/ReactGrid";
import { bindActionCreators, compose } from "redux";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import * as API from "redux/api";

const OrganizationList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Organizacion.titulo",
        defaultMessage: "Organizacion",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "Organizacion.titulo",
          defaultMessage: "Oganización",
        }),
        href: "/organizacion",
      },
    ]);
  }, []);

  const listConfiguration = {
    columns: [
      {
        name: "codi",
        title: props.intl.formatMessage({
          id: "Provincias.codigo",
          defaultMessage: "Código",
        }),
      },
      {
        name: "nom",
        title: props.intl.formatMessage({
          id: "Provincias.nombre",
          defaultMessage: "Nombre",
        }),
      },
      {
        name: "domicili",
        title: props.intl.formatMessage({
          id: "Organizacion.domicilio",
          defaultMessage: "Domicilio",
        }),
      },
      {
        name: "telefon",
        title: props.intl.formatMessage({
          id: "Organizacion.telefono",
          defaultMessage: "Teléfono",
        }),
      },
      {
        name: "fax",
        title: props.intl.formatMessage({
          id: "Organizacion.fax",
          defaultMessage: "Fax",
        }),
      },
      {
        name: "adresaWeb",
        title: props.intl.formatMessage({
          id: "Organizacion.dirWeb",
          defaultMessage: "Dirección Web",
        }),
      },
  
    ],
    URL: API.organitzacio,
    listKey: "organitzacios",
  };
  return <ReactGrid id="organitzacio" configuration={listConfiguration} />;
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
)(OrganizationList);
