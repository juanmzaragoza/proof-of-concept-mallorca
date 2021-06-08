import React, {useEffect} from "react";
import ReactGrid from "../../modules/ReactGrid";
import {bindActionCreators,compose} from "redux";
import {setBreadcrumbHeader, setListingConfig} from "../../redux/pageHeader";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";

const Paises = ({ actions, ...props }) => {

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
        }), href:"/paises"}
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
    URL: 'api/fact/paisos',
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
)(Paises);