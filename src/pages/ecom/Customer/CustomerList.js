import React, { useEffect } from "react";
import * as API from "../../../redux/api";
import ReactGrid from "../../../modules/ReactGrid";
import { bindActionCreators, compose } from "redux";
import { setBreadcrumbHeader, setListingConfig } from "../../../redux/pageHeader";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";

const CustomerList = ({ actions, ...props }) => {

  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Clientes.titulo",
        defaultMessage: " Clientes"
      }),
    });
    actions.setBreadcrumbHeader([
      { title: "Clientes", href: "/ecom/clientes" }
    ]);
  }, []);

  const listConfiguration = {
    title: props.intl.formatMessage({
      id: "Clientes.titulo",
      defaultMessage: "Clientes"
    }),
    columns: [
      {
        name: 'codi',
        title: props.intl.formatMessage({
          id: "Proveedores.codigo",
          defaultMessage: "Código"
        })
      },
      {
        name: 'nomFiscal',
        title: props.intl.formatMessage({
          id: "Proveedores.nombre_fiscal",
          defaultMessage: "Nombre fiscal"
        })
      },
  
      {
        name: 'familiaClient.description',
        title: props.intl.formatMessage({
          id: "Proveedores.familia",
          defaultMessage: "Familia"
        }),
        getCellValue: row => row.familiaClient?.description ? row.familiaClient.description : ""
      },
      {
        name: 'regimIva.description',
        title: props.intl.formatMessage({
          id: "Clientes.regimen.iva",
          defaultMessage: "Régimen IVA"
        }),
        getCellValue: row => row.regimIva?.description ? row.regimIva.description : ""
      },
      {
        name: 'tipusFacturacio.description',
        title: props.intl.formatMessage({
          id: "Clientes.fact.tipoFact",
          defaultMessage: "Tipo facturación"
        }),
        getCellValue: row => row.tipusFacturacio?.description ? row.tipusFacturacio.description : ""
      },
    ],
    URL: API.cliente,
    listKey: 'clients'
  };


  return (
    <>
      <ReactGrid id='cliente'
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
)(CustomerList);
