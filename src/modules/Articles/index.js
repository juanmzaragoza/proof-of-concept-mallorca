import React from 'react';
import {LocalMall} from "@material-ui/icons";
import {injectIntl} from "react-intl";
import Paper from "@material-ui/core/Paper";
import {Route, Switch} from "react-router-dom";

import {ContentHeaderList} from "modules/ReactGrid/ContentHeader";
import ReactGrid from "../ReactGrid";
import AdvancedFilters from "./AdvancedFilters";

const URL = '/articulos';

const ArticlesList = (props) => {
  const listConfiguration = {
    title: props.intl.formatMessage({
      id: "Articulos.titulo",
      defaultMessage: "Articulos"
    }),
    columns: [
      { name: 'codi',
        title: props.intl.formatMessage({
          id: "Articulos.codigo",
          defaultMessage: "Código"
        })
      },
      { name: 'nom',
        title: props.intl.formatMessage({
          id: "Articulos.nombre",
          defaultMessage: "Nombre"
        })
      },
      { name: 'act',
        title: props.intl.formatMessage({
          id: "Articulos.activo",
          defaultMessage: "Activo"
        })
      },
    ],
    URL: 'api/fact/articulos'
  };
  return (
    <>
      <ContentHeaderList title={props.intl.formatMessage({
        id: "Articulos.titulo",
        defaultMessage: "Articulos"
      })} />
      <AdvancedFilters />
      <ReactGrid configuration={listConfiguration} />
    </>
  )
};

const ArticlesListIntl = injectIntl(ArticlesList);

const Articles = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={ArticlesListIntl}></Route>
      {/*<Route path={`${URL}/create`} component={SuppliersFamilyCreateIntl}></Route>
      <Route path={`${URL}/:id`} component={SuppliersFamilyCreateIntl}></Route>*/}
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: Articles
  },
  name: 'Articles',
  icon: <LocalMall />
}