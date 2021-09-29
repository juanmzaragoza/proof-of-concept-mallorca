import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import {withValidations} from "../../../modules/wrappers";
import ReactGrid from "modules/ReactGrid";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import * as API from "redux/api";
import { Chip } from "@material-ui/core";

const SeriesIntracomunitariasList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Proyectos.serieIntracomunitari",
        defaultMessage: "Serie intracomuntaria",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "Proyectos.serieIntracomunitari",
          defaultMessage: "Serie intracomuntaria",
        }),
        href: "/fact/series-intracomunitarias",
      },
    ]);
  }, []);

  const ULTFAC = props.intl.formatMessage({
    id: "SerieVenta.ultimaFactura",
    defaultMessage: "Última factura",
  });
  const DIA1 = props.intl.formatMessage({
    id: "Proyectos.dia1",
    defaultMessage: "Dia 1",
  });
  const DIA2 = props.intl.formatMessage({
    id: "Proyectos.dia2",
    defaultMessage: "Dia 2",
  });
  const SERDEF = props.intl.formatMessage({
    id: "SerieIntracomunitaria.serieDefecto",
    defaultMessage: "Séries defecto",
  });

  const dia1 = {
    placeHolder: DIA1,
    type: "date",
    key: "dia1",
    required: true,
    breakpoints: {
      xs: 12,
      md: 4,
    },
    validationType: "string",
    validations: [...props.commonValidations.requiredValidation()],
  };

  const dia2 = {
    placeHolder: DIA2,
    type: "date",
    key: "dia2",
    required: true,
    breakpoints: {
      xs: 12,
      md: 4,
    },
    validationType: "string",
    validations: [...props.commonValidations.requiredValidation()],
  };

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
        title: ULTFAC,
        name: "ultimaFactura",
      },
      {
        title: DIA1,
        name: "dia1",
        getCellValue: (row) =>
        row.dia1 ? new Date(row.dia1).toLocaleDateString() : "",
        field: dia1,
        allowFilter:false,
      },

      {
        title: DIA2,
        name: "dia2",
        getCellValue: (row) =>
        row.dia2 ? new Date(row.dia2).toLocaleDateString() : "",
        field: dia2,
        allowFilter:false,
      },
      {
        title: SERDEF,
        name: "serieDefecto",
        getCellValue: (row) => {
          return row.serieDefecto && row.serieDefecto === true ? (
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
          );
        },
      },
    ],
    URL: API.serieIntracomunitaria,
    listKey: "serieIntracomunitarias",
    enableInlineEdition: true,
  };
  return (
    <ReactGrid id="serieIntracomunitaria" configuration={listConfiguration} />
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
  withValidations,
  injectIntl,
  connect(null, mapDispatchToProps)
)(SeriesIntracomunitariasList);
