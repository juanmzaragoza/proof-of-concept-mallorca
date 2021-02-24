import React from 'react';
import {LocalMall} from "@material-ui/icons";

const URL = '/articulos';

const Articles = () => {
  return (
    <div>Articles</div>
  )
};

export default {
  routeProps: {
    path: `${URL}`,
    component: Articles
  },
  name: 'Articles',
  icon: <LocalMall />
}