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
        id: "Rappel.titulo",
        defaultMessage: "Rappel",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "Rappel.titulo",
          defaultMessage: "Rappel",
        }),
        href: "/fact/rappel",
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
        name: "limitInferior",
        title: props.intl.formatMessage({
          id: "Rappel.limiteInferior",
          defaultMessage: "Límite Inferior",
        }),
      },
      {
        name: "limitSuperior",
        title: props.intl.formatMessage({
          id: "Rappel.limiteSuperior",
          defaultMessage: "Límite Superior",
        }),
      },
      {
        name: "percentatge",
        title: props.intl.formatMessage({
          id: "Rappel.porcentaje",
          defaultMessage: "Porcentaje",
        }),
      },
      {
        title: props.intl.formatMessage({
          id: "Rappel.escalado",
          defaultMessage: "Escalado",
        }),

        name: "escalat",
        getCellValue: (row) =>{
          return row.escalat && row.escalat === true ? (
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
          id: "Rappel.absoluto",
          defaultMessage: "Absoluto",
        }),
        name: "absolut",
        getCellValue: (row) =>{
          return row.absolut && row.absolut === true ? (
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
    URL: API.rappel,
    listKey: "rappels",
    enableInlineEdition: true,
  };
  return <ReactGrid id="rappel" configuration={listConfiguration} />;
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

export default compose(injectIntl, connect(null, mapDispatchToProps))(VatList);
