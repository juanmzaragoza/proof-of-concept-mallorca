import React, {useEffect} from "react";
import ReactGrid from "../../modules/ReactGrid";
import {bindActionCreators,compose} from "redux";
import {setBreadcrumbHeader, setListingConfig} from "../../redux/pageHeader";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";

const Idiomes = ({ actions, ...props }) => {

  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Idiomas.titol",
        defaultMessage: "Idiomes"
      }),
    });
    actions.setBreadcrumbHeader([
      {title: props.intl.formatMessage({
          id: "Idiomas.titol",
          defaultMessage: "Idiomes"
        }), href:"/idiomes"}
    ]);
  },[]);

  const listConfiguration = {
    columns: [
      { name: 'codi',
        title: props.intl.formatMessage({
          id: "Idiomas.codigo",
          defaultMessage: "Código"
        })
      },
      { name: 'descripcio',
        title: props.intl.formatMessage({
          id: "Idiomas.nombre",
          defaultMessage: "Nombre"
        })
      },
    ],
    URL: 'api/fact/idiomes',
    listKey: 'idiomas'
  };
  return (
    <ReactGrid
      id='idioma'
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
)(Idiomes);