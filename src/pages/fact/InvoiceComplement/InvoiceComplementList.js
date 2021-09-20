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

  const TYPE = props.intl.formatMessage({
    id: "TiposVencimiento.tipo",
    defaultMessage: "Tipo",
  });

  const aSCodeAndType = [
    { title: CODE, name: "codi" },
    { title: TYPE, name: "tipus" },
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

  const tipusCost = {
    placeHolder: props.intl.formatMessage({
      id: "Articulos.costes.tipoCoste",
      defaultMessage: "Tipo coste",
    }),
    type: "LOV",
    key: "tipusCost",
    breakpoints: {
      xs: 12,
      md: 3,
    },
    selector: {
      key: "tipusCosts",
      labelKey: (data) => `${data.tipus} (${data.codi})`,
      sort: "codi",
      cannotCreate: true,
      advancedSearchColumns: aSCodeAndType,
    },
  };

  const iva = {
    placeHolder: props.intl.formatMessage({
      id: "Clientes.iva",
      defaultMessage: "IVA",
    }),
    type: "LOV",
    key: "iva",
    id: "ivaFact",
    breakpoints: {
      xs: 12,
      md: 2,
    },
    selector: {
      key: "ivas",
      labelKey: (data) => `${data.descripcio} (${data.codi})`,
      sort: "descripcio",
      advancedSearchColumns: aSCodeAndDescription,
      cannotCreate: true,
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
        inlineEditionDisabled: true,
      },
      {
        name: "descripcio",
        title: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Descripcion",
        }),
      },
      {
        title: props.intl.formatMessage({
          id: "ComplementosFactura.incrementarFactura",
          defaultMessage: "Incrementar Factura",
        }),

        name: "incrementarFactura",
        getCellValue: (row) =>{
          return row.incrementarFactura && row.incrementarFactura === true ? (
            <Chip
              label={props.intl.formatMessage({
                id: "Comun.SI",
                defaultMessage: "SI",
              })}
              variant="outlined"
            />
          ) : (
            <Chip
              label={props.intl.formatMessage({
                id: "Comun.NO",
                defaultMessage: "NO",
              })}
              variant="outlined"
            />
          )},

      },
      {
        title: props.intl.formatMessage({
          id: "ComplementosFactura.incrementarBase",
          defaultMessage: "Incrementar Base",
        }),
        name: "incrementarBaseImposable",
        getCellValue: (row) =>{
          return row.incrementarBaseImposable && row.incrementarBaseImposable === true ? (
            <Chip
              label={props.intl.formatMessage({
                id: "Comun.SI",
                defaultMessage: "SI",
              })}
              variant="outlined"
            />
          ) : (
            <Chip
              label={props.intl.formatMessage({
                id: "Comun.NO",
                defaultMessage: "NO",
              })}
              variant="outlined"
            />
          )},

      },
      {
        title: props.intl.formatMessage({
          id: "ComplementosFactura.distribuirCos",
          defaultMessage: "distribuir Costes entre Artículos",
        }),

        name: "distribuirCostosEntreArticles",
        getCellValue: (row) =>{
          return row.distribuirCostosEntreArticles && row.distribuirCostosEntreArticles === true ? (
            <Chip
              label={props.intl.formatMessage({
                id: "Comun.SI",
                defaultMessage: "SI",
              })}
              variant="outlined"
            />
          ) : (
            <Chip
              label={props.intl.formatMessage({
                id: "Comun.NO",
                defaultMessage: "NO",
              })}
              variant="outlined"
            />
          )},

      },
      {
        title: props.intl.formatMessage({
          id: "ComplementosFactura.aplicarDtoCorto",
          defaultMessage: "Aplicar Dto",
        }),

        name: "aplicarDescompte",
        getCellValue: (row) =>{
          return row.aplicarDescompte && row.aplicarDescompte === true ? (
            <Chip
              label={props.intl.formatMessage({
                id: "Comun.SI",
                defaultMessage: "SI",
              })}
              variant="outlined"
            />
          ) : (
            <Chip
              label={props.intl.formatMessage({
                id: "Comun.NO",
                defaultMessage: "NO",
              })}
              variant="outlined"
            />
          )},

      },
      {
        tittle: props.intl.formatMessage({
          id: "Articulos.costes.tipoCoste",
          defaultMessage: "Tipo coste",
        }),

        name: "tipusCost",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        getCellValue: (row) =>
          row.tipusCost?.description ? row.tipusCost?.description : "",
        field: tipusCost,
      },
      {
        name: "articleFamilia",
        title: props.intl.formatMessage({
          id: "ComplementosFactura.familiaArticulos",
          defaultMessage: "Familia Articulos",
        }),
        getCellValue: (row) =>
          row.articleFamilia?.description
            ? row.articleFamilia?.description
            : "",
        field: articleFamilia,
      },
      {
        name: "iva",
        title: props.intl.formatMessage({
          id: "Clientes.iva",
          defaultMessage: "IVA",
        }),
        getCellValue: (row) =>
          row.iva?.description ? row.iva?.description : "",
        field: iva,
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
    enableInlineEdition: true,
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
