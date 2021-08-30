import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import ReactGrid from "modules/ReactGrid";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import * as API from "redux/api";

const CertificationList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Certificaciones.titulo",
        defaultMessage: "Certificaciones",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "Certificaciones.titulo",
          defaultMessage: "Certificaciones",
        }),
        href: "/fact/certificaciones",
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

  const divisa = {
    placeHolder: props.intl.formatMessage({
      id: "Proveedores.divisa",
      defaultMessage: "Divisa",
    }),
    type: "LOV",
    key: "divisa",
    breakpoints: {
      xs: 12,
      md: 3,
    },
    selector: {
      key: "divisas",
      labelKey: (data) => `${data.nom} (${data.codi})`,
      sort: "nom",
      advancedSearchColumns: [
        { title: CODE, name: "codi" },
        { title: NOM, name: "nom" },
      ],
      cannotCreate: true,
    },
  };

  const listConfiguration = {
    columns: [
      {
        name: "numeroCertificat",
        title: props.intl.formatMessage({
          id: "Certificaciones.numeroCertificado",
          defaultMessage: "Número Certificado",
        }),
        inlineEditionDisabled: true,
      },
      {
        name: "presupostCodi",
        title: props.intl.formatMessage({
          id: "Certificaciones.presupuestoCodigo",
          defaultMessage: "Presupuesto Código",
        }),
        inlineEditionDisabled: true,
      },
      {
        name: "numeroCertificatClient",
        title: props.intl.formatMessage({
          id: "Certificaciones.numeroCertificadoCliente",
          defaultMessage: "Número Certificado Cliente",
        }),
      },
      {
        name: "divisa",
        title: props.intl.formatMessage({
          id: "Divisas.titulo",
          defaultMessage: "Divisa",
        }),
        getCellValue: (row) => row.divisa?.description ?? "",
        field: divisa,
      },
    ],
    URL: API.certificacio,
    listKey: "certificacios",
    enableInlineEdition: true,
  };
  return <ReactGrid id="certificacio" configuration={listConfiguration} />;
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
)(CertificationList);
