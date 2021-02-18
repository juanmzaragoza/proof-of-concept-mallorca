import React from 'react';
import ReactGrid from '../ReactGrid';

const configuration = {
  title: 'Familias proveedor',
  columns: [
    { name: 'codi', title: 'Código' },
    { name: 'nom', title: 'Nombre' },
  ]
};

const SuppliersFamily = () => (
  <ReactGrid configuration={configuration} />
);

export default {
  routeProps: {
    path: '/familia-proveedores',
    component: SuppliersFamily
  },
  name: 'SuppliersFamily',
}