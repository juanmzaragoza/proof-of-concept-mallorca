import React, { useEffect } from "react";
import * as API from "../../../redux/api";
import ReactGrid from "../../../modules/ReactGrid";
import { bindActionCreators, compose } from "redux";
import { setBreadcrumbHeader, setListingConfig } from "../../../redux/pageHeader";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";

const CustomerAddressList = ({ actions, ...props }) => {

  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "DireccionesClientes.titulo",
        defaultMessage: " Direcciones Clientes"
      }),
    });
    actions.setBreadcrumbHeader([
      { title: "Direcciones Clientes", href: "/fact/direcciones-clientes" }
    ]);
  }, []);

  const listConfiguration = {
    title: props.intl.formatMessage({
      id: "DireccionesClientes.titulo",
      defaultMessage: "Direcciones Clientes"
    }),
    columns: [
      {
        name: 'codi',
        title: props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código"
        })
      },
      {
        name: 'domicili',
        title: props.intl.formatMessage({
          id: "Comun.domicilio",
          defaultMessage: "Domicilio"
        })
      },
  
      {
        name: 'client.description',
        title: props.intl.formatMessage({
          id:   "Presupuestos.cliente",
          defaultMessage: "Cliente"
        }),
        getCellValue: row => row.client?.description ? row.client.description : ""
      },

      {
        name: 'codiPostal.description',
        title: props.intl.formatMessage({
          id: "Clientes.fact.codigoPostal",
          defaultMessage: "Código Postal"
        }),
        getCellValue: row => row.codiPostal?.description ? row.codiPostal.description : ""
      },
    ],
    URL: API.clientAdresa,
    listKey: 'clientAdresas'
  };


  return (
    <>
      <ReactGrid id='clientAdresa'
                 configuration={listConfiguration} />
    </>
  )
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
  connect(null, mapDispatchToProps)
)(CustomerAddressList);
