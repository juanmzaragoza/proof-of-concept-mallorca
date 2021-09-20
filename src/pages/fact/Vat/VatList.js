import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Chip } from "@material-ui/core";
import ReactGrid from "modules/ReactGrid";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import * as API from "redux/api";

const VatList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Iva.titulo",
        defaultMessage: "Iva",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "Iva.titulo",
          defaultMessage: "Iva",
        }),
        href: "/fact/iva",
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
        inlineEditionDisabled: true,
      },
      {
        name: "descripcio",
        title: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Descripción",
        }),
      },
      {
        name: "text",
        title: props.intl.formatMessage({
          id: "Iva.texto",
          defaultMessage: "Texto",
        }),
      },
      {
        name: "percentatgeIva",
        title: props.intl.formatMessage({
          id: "Iva.porcentaje",
          defaultMessage: "Porcentaje",
        }),
      },
      {
        name: "percentatgeRecarrecEquivalencia",
        title: props.intl.formatMessage({
          id: "Iva.recargo",
          defaultMessage: "Recargo",
        }),
      },
      {
        name: "codiComptabilitat",
        title: props.intl.formatMessage({
          id: "Iva.codigoCont",
          defaultMessage: "Código Contabilidad",
        }),
      },
      {
        name: "codiRecarrecComptabilitat",
        title: props.intl.formatMessage({
          id: "Iva.codigoRecCont",
          defaultMessage: "Código recargo contabilidad",
        }),
      },
      {
        name: "notCreApu",
        title: props.intl.formatMessage({
          id: "Clientes.notCreApu",
          defaultMessage: "No crear apunte sin importe 0",
        }),
        getCellValue: (row) =>{
          return row.notCreApu && row.notCreApu === true ? (
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
    ],
    URL: API.ives,
    listKey: "ivas",
    enableInlineEdition: true,
  };
  return <ReactGrid id="ives" configuration={listConfiguration} />;
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

export default compose(injectIntl, connect(null, mapDispatchToProps))(VatList);
