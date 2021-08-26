import React, { useEffect } from "react";
import * as API from "../../../redux/api";
import ReactGrid from "../../../modules/ReactGrid";
import { bindActionCreators, compose } from "redux";
import {
  setBreadcrumbHeader,
  setListingConfig,
} from "../../../redux/pageHeader";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { Chip } from "@material-ui/core";

const InvoiceComplementList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "ComplementosFactura.titulo",
        defaultMessage: " Complementos Factura",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "ComplementosFactura.titulo",
          defaultMessage: "Complemento sFactura",
        }),
        href: "/fact/complementos-factura",
      },
    ]);
  }, []);

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });

  const DESCRIPTION = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });

  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPTION, name: "descripcio" },
  ];

  const articleFamilia = {
    placeHolder: props.intl.formatMessage({
      id: "Proveedores.familia",
      defaultMessage: "Familia",
    }),
    type: "LOV",
    key: "articleFamilia",
    breakpoints: {
      xs: 12,
      md: 3,
    },
    selector: {
      key: "articleFamilias",
      labelKey: (data) => `${data.descripcio} (${data.codi})`,
      sort: "codi",
      cannotCreate: true,
      advancedSearchColumns: aSCodeAndDescription,
    },
  };

  const listConfiguration = {
    title: props.intl.formatMessage({
      id: "ComplementosFactura.titulo",
      defaultMessage: "Complementos Factura",
    }),
    columns: [
      {
        name: "codi",
        title: props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código",
        }),
        inlineEditionDisabled: true
      },
      {
        name: "descripcio",
        title: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Descripcion",
        }),
      },
      {
        name: "articleFamilia",
        title: props.intl.formatMessage({
          id: "Almacen.articulo",
          defaultMessage: "Artículo",
        }),
        getCellValue: (row) =>
          row.articleFamilia?.description ? row.articleFamilia?.description : "",
          field:articleFamilia

      },
      {
        name: "compteContable",
        title: props.intl.formatMessage({
          id: "Clientes.cuenta.contable",
          defaultMessage: "Cuenta contable",
        }),
      },
      
    ],
    URL: API.complementsFactura,
    listKey: "complementFacturas",
    enableInlineEdition: true
  };

  return (
    <>
      <ReactGrid id="complementsFactura" configuration={listConfiguration} />
    </>
  );
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
)(InvoiceComplementList);
