import React, {useEffect} from "react";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";

import ReactGrid from "../../../modules/ReactGrid";
import {bindActionCreators,compose} from "redux";
import {setBreadcrumbHeader, setListingConfig} from "../../../redux/pageHeader";
import * as API from "../../../redux/api";

const ItemsFamilyList = ({ actions, ...props }) => {

  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "FamiliaArticulos.titulo",
        defaultMessage: "Familia de Artículos"
      }),
    });
    actions.setBreadcrumbHeader([
      {title: props.intl.formatMessage({
        id: "FamiliaArticulos.titulo",
        defaultMessage: "Familia de Artículos"
        }), href:"/article-familia"}
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
      { name: 'familiaCost',
        title: props.intl.formatMessage({
          id: "FamiliaArticulos.familiaCoste",
          defaultMessage: "Familia Coste"
        }),
        getCellValue: row => row.familiaCost?.description ?? ""
      },
      { name: 'delegacio',
        title: props.intl.formatMessage({
          id: "FamiliaArticulos.delegacion",
          defaultMessage: "Delegación"
        }),
        getCellValue: row => row.delegacio?.description ?? ""
      },
      { name: 'projecte',
        title: props.intl.formatMessage({
          id: "FamiliaArticulos.proyecto",
          defaultMessage: "Proyecto"
        }),
        getCellValue: row => row.projecte?.description ?? ""
      },
    ],
    URL: API.familiaArticle,
    listKey: 'articleFamilias'
  };
  return <ReactGrid id="familiaArticle" configuration={listConfiguration} />;
};

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
)(ItemsFamilyList);