import React from 'react';
import ReactGrid from "../ReactGrid";

const SuppliersFamily = () => (
  <ReactGrid />
);

export default {
  routeProps: {
    path: '/familia-proveedores',
    component: SuppliersFamily
  },
  name: 'SuppliersFamily',
}