import React, { useEffect } from "react";
import ReactGrid from "../../modules/ReactGrid";
import { bindActionCreators, compose } from "redux";
import { setBreadcrumbHeader, setListingConfig } from "../../redux/pageHeader";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import * as API from "redux/api";

const BankOfficeList = ({ actions, ...props }) => {

  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "OficinasBancarias.titulo",
        defaultMessage: "Oficinas Bancarias",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "OficinasBancarias.titulo",
          defaultMessage: "Oficinas Bancarias",
        }),
        href: "/oficina-bancaria",
      },
    ]);
  }, []);

  const listConfiguration = {
    columns: [
      {
        name: "codi",
        title: props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código",
        }),
      },
      {
        name: "domicili",
        title: props.intl.formatMessage({
          id: "Comun.domicilio",
          defaultMessage: "Domicilio",
        }),
      },
      {
        name: "codiPostal",
        title: props.intl.formatMessage({
          id: "Comun.codigoPostal",
          defaultMessage: "Código Postal",
        }),
        getCellValue: row => row.codiPostal?.description ?? ""
      },
      {
        name: "banc",
        title: props.intl.formatMessage({
          id: "OficinasBancarias.banco",
          defaultMessage: "Banco",
        }),
        getCellValue: row => row.banc?.description ?? ""
      },
      {
        name: "telefon",
        title: props.intl.formatMessage({
          id: "Comun.telefono",
          defaultMessage: "Teléfono",
        }),
        
      },
    ],
    URL: API.oficinaBancaria,
    listKey: "oficinaBancarias",
  };
  return <ReactGrid id="oficinaBancaria" configuration={listConfiguration} />;
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

export default compose(
  injectIntl,
  connect(null, mapDispatchToProps)
)(BankOfficeList);
