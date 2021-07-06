import React from 'react';
import {Route, Switch} from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import StoreMallDirectoryOutlinedIcon from '@material-ui/icons/StoreMallDirectoryOutlined';
import ItemBrandList from "./ItemBrandList";
import ItemBrandCreate from "./ItemBrandCreate";
import withHeaders from "modules/wrappers/withHeaders";
import {BRAND_FACT_URL} from "constants/routes";

const brand = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${BRAND_FACT_URL}`} component={ItemBrandList}></Route>
      <Route path={`${BRAND_FACT_URL}/create`} component={ItemBrandCreate}></Route>
      <Route path={`${BRAND_FACT_URL}/:id`} component={ItemBrandCreate}></Route>
    </Switch>
  </Paper>
);

const component = {
  routeProps: {
    path: `${BRAND_FACT_URL}`,
    component: withHeaders(brand)
  },
  name: 'FAC_MARART',
  icon: <StoreMallDirectoryOutlinedIcon />
}
export default component;