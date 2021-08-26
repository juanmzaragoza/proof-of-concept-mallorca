import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import ReactGrid from "modules/ReactGrid";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import * as API from "redux/api";

const FactoringLineList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "LiniasFactoring.titulo",
        defaultMessage: "Linias Factoring",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "LiniasFactoring.titulo",
          defaultMessage: "Linias Factoring",
        }),
        href: "/fact/linias-factoring",
      },
    ]);
  }, []);

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });
  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });

  const banco = {
    placeHolder: props.intl.formatMessage({
      id: "LiniasFactoring.bancCodi",
      defaultMessage: "Banco",
    }),
    type: "LOV",
    key: "banc",
    breakpoints: {
      xs: 12,
      md: 5,
    },
    selector: {
      key: "bancs",
      labelKey: (data) => `${data.nom} (${data.codi})`,
      sort: "codi",
      transform: {
        apply: (bancs) => bancs && bancs.codi,
        reverse: (rows, codi) => rows.find((row) => row.codi == codi),
      },
      cannotCreate: true,

      advancedSearchColumns: [
        { title: CODE, name: "codi" },
        { title: NOM, name: "nom" },
      ],
    },
  };

  const listConfiguration = {
    columns: [
      {
        name: "contracteNumero",
        title: props.intl.formatMessage({
          id: "LiniasFactoring.numContrato",
          defaultMessage: "Num. Contrato",
        }),
        inlineEditionDisabled: true,
      },
      {
        name: "banc",
        title: props.intl.formatMessage({
          id: "LiniasFactoring.codigoBanco",
          defaultMessage: "Código Banco",
        }),

        field: banco,
      },
      {
        name: "bancNom",
        title: props.intl.formatMessage({
          id: "LiniasFactoring.nombreBanco",
          defaultMessage: "Nombre Banco",
        }),
      },
      {
        name: "bancNif",
        title: props.intl.formatMessage({
          id: "LiniasFactoring.cif",
          defaultMessage: "CIF",
        }),
      },
      {
        name: "importLimit",
        title: props.intl.formatMessage({
          id: "LiniasFactoring.importeLimite",
          defaultMessage: "Importe Límite",
        }),
      },
    ],
    URL: API.liniaFactoring,
    listKey: "liniaFactorings",
    enableInlineEdition: true,
  };
  return <ReactGrid id="liniaFactoring" configuration={listConfiguration} />;
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
)(FactoringLineList);
