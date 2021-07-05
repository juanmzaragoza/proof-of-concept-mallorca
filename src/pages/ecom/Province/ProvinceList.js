import React, { useEffect } from "react";
import ReactGrid from "../../../modules/ReactGrid";
import { bindActionCreators, compose } from "redux";
import { setBreadcrumbHeader, setListingConfig } from "../../../redux/pageHeader";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import * as API from "redux/api";

const Province = ({ actions, ...props }) => {

  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Provincias.titol",
        defaultMessage: "Provincias"
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "Provincias.titol",
          defaultMessage: "Provincias"
        }), href: "/ecom/provincias"
      }
    ]);
  }, []);

  const listConfiguration = {
    columns: [
      {
        name: 'codi',
        title: props.intl.formatMessage({
          id: "Provincias.codigo",
          defaultMessage: "Código"
        })
      },
      {
        name: 'nom',
        title: props.intl.formatMessage({
          id: "Provincias.nombre",
          defaultMessage: "Nombre"
        })
      },
      {
        name: 'pais.description',
        title: props.intl.formatMessage({
          id: "Provincias.pais",
          defaultMessage: "Pais"
        }),
        getCellValue: row => row.pais?.description ?? ""
      },
    ],
    URL: API.provincias,
    listKey: 'provincias'
  };
  return (
    <ReactGrid
      id='provincias'
      configuration={listConfiguration} />
  );
}

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch)
  };
  return { actions };
};

export default compose(
  injectIntl,
  connect(null, mapDispatchToProps)
)(Province);