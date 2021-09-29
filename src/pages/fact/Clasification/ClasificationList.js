import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import ReactGrid from "modules/ReactGrid";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import * as API from "redux/api";
import { TIPO_CLASIFICACION_SELECTOR_VALUES } from "constants/selectors";

const ClasificationList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Clasificaciones.titulo",
        defaultMessage: "Clasificaciones",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "Clasificaciones.titulo",
          defaultMessage: "Clasificaciones",
        }),
        href: "/fact/clasificaciones",
      },
    ]);
  }, []);

  const tipoClasificacion = {
    placeHolder: props.intl.formatMessage({
      id: "Clasificaciones.clasificacion",
      defaultMessage: "Clasificación",
    }),
    type: "select",
    key: "tipus",
    breakpoints: {
      xs: 12,
      md: 3,
    },
    selector: {
      options: TIPO_CLASIFICACION_SELECTOR_VALUES,
    },
  };

  const listConfiguration = {
    columns: [
   
      {
        name: "codiClassificacio",
        title: props.intl.formatMessage({
          id: "Clasificaciones.codigoClas",
          defaultMessage: "Código Clasificación",
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
        name: "tipus",
        title: props.intl.formatMessage({
          id: "Clasificaciones.clasificacion",
          defaultMessage: "Clasificación",
        }),
        getCellValue: (row) => {
          if (row.tipus) {
            if (row.tipus === "OBRES") {
              return props.intl.formatMessage({
                id: "Selector.obras",
                defaultMessage: "Obras",
              });
        
            } else {
              return props.intl.formatMessage({
                id: "Selector.servicios",
                defaultMessage: "Servicios",
              });
              
            }
          }
        },
        field:tipoClasificacion
      },
      {
        name: "categoria",
        title: props.intl.formatMessage({
          id: "Clasificaciones.categoria",
          defaultMessage: "Categoria",
        }),
      },
    ],
    URL: API.classificacions,
    listKey: "classificacios",
    enableInlineEdition: true,
  };
  return <ReactGrid id="classificacions" configuration={listConfiguration} />;
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
)(ClasificationList);
