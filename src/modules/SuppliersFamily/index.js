import React from 'react';
import ReactGrid from '../ReactGrid';

const configuration = {
  title: 'Familias proveedor',
  columns: [
    { name: 'ShipCountry', title: 'Código' },
    { name: 'ShipCity', title: 'Nombre' },
    { name: 'ShipAddress', title: 'Address' }
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