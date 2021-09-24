import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { TIPO_REG_IVA_SELECTOR_VALUES } from "constants/selectors";
import ReactGrid from "modules/ReactGrid";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import * as API from "redux/api";
import { Chip } from "@material-ui/core";

const RegimeVatList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "RegimenIva.titulo",
        defaultMessage: "Régimen Iva",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "RegimenIva.titulo",
          defaultMessage: "Régimen Iva",
        }),
        href: "/fact/iva",
      },
    ]);
  }, []);

  const tipo = {
    placeHolder: props.intl.formatMessage({
      id: "RegimenIva.tipoReg",
      defaultMessage: "Tipo Régimen IVA",
    }),
    type: "select",
    key: "tip",
    breakpoints: {
      xs: 12,
      md: 3,
    },
    selector: {
      options: TIPO_REG_IVA_SELECTOR_VALUES,
    },
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
        name: "codiComptabilitat",
        title: props.intl.formatMessage({
          id: "Iva.codigoCont",
          defaultMessage: "Código contabilidad",
        }),
      },
      {
        name: "tip",
        title: props.intl.formatMessage({
          id: "Iva.tipoRegimen",
          defaultMessage: "Tipo Régimen IVA ",
        }),
        getCellValue: (row) => {
          if (row.tip) {
            if (row.tip === "AGRARI") {
              return props.intl.formatMessage({
                id: "Selector.agrario",
                defaultMessage: "Agrario",
              });
            } else if (row.tip === "GENERAL") {
              return props.intl.formatMessage({
                id: "Selector.general",
                defaultMessage: "General",
              });
            } else {
              return props.intl.formatMessage({
                id: "Selector.intercomunitario",
                defaultMessage: "Intercomunitario",
              });
            }
          }
        },

        field: tipo,
        allowFilter: false,
      },
      {
        name: "codiFacturaElectronica",
        title: props.intl.formatMessage({
          id: "RegimenIva.codigoFact",
          defaultMessage: "Código factura electrónica",
        }),
      },
      {
        name: "sitCodClaExd",
        title: props.intl.formatMessage({
          id: "RegimenIva.clavesExpedida",
          defaultMessage: "Claves factura expedida",
        }),
      },
      {
        name: "sitCodClaReb",
        title: props.intl.formatMessage({
          id: "RegimenIva.clavesRecibida",
          defaultMessage: "Claves recibida",
        }),
      },
    ],
    URL: API.regimsIva,
    listKey: "regimIvas",
    enableInlineEdition: true,
  };
  return <ReactGrid id="regimsIva" configuration={listConfiguration} />;
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
)(RegimeVatList);
