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
        id: "Paises.titulo",
        defaultMessage: "Paises"
      }),
    });
    actions.setBreadcrumbHeader([
      {title: props.intl.formatMessage({
          id: "Paises.titulo",
          defaultMessage: "Paises"
        }), href:"/ecom/paises"}
    ]);
  },[]);

  const listConfiguration = {
    columns: [
      { name: 'codi',
        title: props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código"
        }),
        inlineEditionDisabled: true
      },
      { name: 'nom',
        title: props.intl.formatMessage({
          id: "Comun.nombre",
          defaultMessage: "Nombre"
        })
      },
      { name: 'importRepartiment',
        title: props.intl.formatMessage({
          id: "Paises.importeReparto",
          defaultMessage: "importe reparto"
        })
      },
      { name: 'importMinimRepartiment',
      title: props.intl.formatMessage({
        id: "Paises.importeMinimoReparto",
        defaultMessage: "importe mínimo reparto"
      })
    },
    ],
    URL: API.paisos,
    listKey: 'paises',
    enableInlineEdition: true
  };
  return (
    <ReactGrid
      id='paisos'
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