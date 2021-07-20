import React, {useEffect} from "react";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";

import ReactGrid from "../../../modules/ReactGrid";
import {bindActionCreators,compose} from "redux";
import {setBreadcrumbHeader, setListingConfig} from "../../../redux/pageHeader";
import * as API from "../../../redux/api";

const CountryList = ({ actions, ...props }) => {

  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Paises.titol",
        defaultMessage: "Paises"
      }),
    });
    actions.setBreadcrumbHeader([
      {title: props.intl.formatMessage({
          id: "Paises.titol",
          defaultMessage: "Paises"
        }), href:"/fact/paises"}
    ]);
  },[]);

  const listConfiguration = {
    columns: [
      { name: 'codi',
        title: props.intl.formatMessage({
          id: "Paises.codigo",
          defaultMessage: "Código"
        })
      },
      { name: 'nom',
        title: props.intl.formatMessage({
          id: "Paises.nombre",
          defaultMessage: "Nombre"
        })
      },
    ],
    URL: API.pais,
    listKey: 'paises'
  };
  return (
    <ReactGrid
      id='pais'
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
  connect(null,mapDispatchToProps)
)(CountryList);