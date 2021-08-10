import React, { useEffect, useState } from "react";
import * as API from "redux/api";
import ReactGrid from "modules/ReactGrid";
import { bindActionCreators, compose } from "redux";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { Chip } from "@material-ui/core";

const BoxList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Cajas.titulo",
        defaultMessage: " Cajas",
      }),
    });
    actions.setBreadcrumbHeader([{ title: "Cajas", href: "/fact/cajas" }]);
  }, []);

  const listConfiguration = {
    title: props.intl.formatMessage({
      id: "Cajas.titulo",
      defaultMessage: "Cajas",
    }),
    columns: [
      {
        name: "codi",
        title: props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código",
        }),
      },
      {
        name: "descripcio",
        title: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Descripción",
        }),
      },
      {
        name: "ferApuntComptable",
        title: props.intl.formatMessage({
          id: "Cajas.apunteContable",
          defaultMessage: "Apunte Contable",
        }),
        getCellValue: (row) =>
          row.ferApuntComptable && row.ferApuntComptable === true ? (
            <Chip
              label={props.intl.formatMessage({
                id: "Comun.SI",
                defaultMessage: "SI",
              })}
            />
          ) : (
            <Chip
              label={props.intl.formatMessage({
                id: "Comun.NO",
                defaultMessage: "NO",
              })}
            />
          ),
      },
      {
        name: "tipusAssentamentComptable",
        title: props.intl.formatMessage({
          id: "Cajas.tipoAsiento",
          defaultMessage: "Tipo Asiento",
        }),
      },
      {
        name: "diariComptable",
        title: props.intl.formatMessage({
          id: "Cajas.diarioContable",
          defaultMessage: "Diario Contable",
        }),
      },
      {
        name: "compteComptable",
        title: props.intl.formatMessage({
          id: "Cajas.cuentaCajas",
          defaultMessage: "Cuenta Contable",
        }),
      },
      {
        name: "dataSaldoInicial",
        title: props.intl.formatMessage({
          id: "Cajas.fechaSaldo",
          defaultMessage: "Fecha Saldo Inicial",
        }),
        getCellValue: row => row.dataSaldoInicial ? new Date(row.dataSaldoInicial).toLocaleDateString() : ""
      },

     
    ],
    URL: API.caixa,
    listKey: "caixas",
  };

  return <ReactGrid id="caixa" configuration={listConfiguration} />;
};
const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

export default compose(injectIntl, connect(null, mapDispatchToProps))(BoxList);
