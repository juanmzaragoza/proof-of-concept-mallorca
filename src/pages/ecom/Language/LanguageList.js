import React, {useEffect} from "react";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import {bindActionCreators,compose} from "redux";

import ReactGrid from "modules/ReactGrid";
import {setBreadcrumbHeader, setListingConfig} from "redux/pageHeader";
import * as API from "redux/api";

const LanguageList = ({ actions, ...props }) => {

  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Idiomas.titol",
        defaultMessage: "Idiomas"
      }),
    });
    actions.setBreadcrumbHeader([
      {title: props.intl.formatMessage({
          id: "Idiomas.titol",
          defaultMessage: "Idiomas"
        }), href:"/ecom/idiomas"}
    ]);
  },[]);

  const listConfiguration = {
    columns: [
      { name: 'codi',
        title: props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código"
        })
      },
      { name: 'descripcio',
        title: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Descripción"
        })
      },
      { name: 'codiIso',
      title: props.intl.formatMessage({
        id: "Idiomas.codigoIso",
        defaultMessage: "Código ISO"
      })
    },
    ],
    URL: API.idiomas,
    listKey: 'idiomas'
  };
  return (
    <ReactGrid
      id='idiomas'
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
)(LanguageList);