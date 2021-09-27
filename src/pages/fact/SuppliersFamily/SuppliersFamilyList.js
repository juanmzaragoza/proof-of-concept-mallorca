import React, { useEffect } from "react";
import ReactGrid from "../../../modules/ReactGrid";
import { bindActionCreators, compose } from "redux";
import {
  setBreadcrumbHeader,
  setListingConfig,
} from "../../../redux/pageHeader";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import * as API from "redux/api";
import MasterDetailedForm from "../../../modules/ReactGrid/MasterDetailForm";
import {withValidations} from "../../../modules/wrappers";

const SuppliersFamilyList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "FamiliaProveedores.titulo",
        defaultMessage: "Familias proveedor",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "FamiliaProveedores.titulo",
          defaultMessage: "Familias proveedor",
        }),
        href: "/fact/familia-proveedores",
      },
    ]);
  }, []);

  const listConfiguration = {
    columns: [
      {
        name: "codi",
        title: props.intl.formatMessage({
          id: "FamiliaProveedores.codigo",
          defaultMessage: "Código",
        }),
        inlineEditionDisabled: true,
      },
      {
        name: "nom",
        title: props.intl.formatMessage({
          id: "FamiliaProveedores.nombre",
          defaultMessage: "Nombre",
        }),
      },
      {
        name: "ctacprcmp",
        title: props.intl.formatMessage({
          id: "FamiliaProveedores.ctaprcmp",
          defaultMessage: "Cuenta Compras",
        }),
      },
      {
        name: "tipasicmp",
        title: props.intl.formatMessage({
          id: "FamiliaProveedores.tipasicmp",
          defaultMessage: "Tipo Asig. Fac",
        }),
      },
      {
        name: "dricmp",
        title: props.intl.formatMessage({
          id: "FamiliaProveedores.dricmp",
          defaultMessage: "Diario Fac",
        }),
      },
      {
        name: "driprfcmp",
        title: props.intl.formatMessage({
          id: "FamiliaProveedores.driprfcmp",
          defaultMessage: "Diario Prof.",
        }),
      },

      {
        name: "observacions",
        title: props.intl.formatMessage({
          id: "Comun.observaciones",
          defaultMessage: "Observaciones",
        }),
      },
    ],
    URL: API.familiaProveidor,
    listKey: "familiaProveidors",
    enableInlineEdition: true,
    enableExpandableContent: true
  };

  const formComponents = [
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaProveedores.codigo",
        defaultMessage: "Código",
      }),
      type: "input",
      key: "codi",
      required: true,
      breakpoints: {
        xs: 12,
        md: 1,
      },
      noEditable: true,
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 4),
        // ...props.stringValidations.fieldExistsValidation(
        //   "familiaProveidor",
        //   "codi",
        //   props.intl.formatMessage({
        //     id: "FamiliaProveedores.codigo",
        //     defaultMessage: "Código",
        //   })
        // ),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaProveedores.nombre",
        defaultMessage: "Nombre",
      }),
      type: "input",
      key: "nom",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 30),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaProveedores.ctaprcmp",
        defaultMessage: "Cuenta Compras",
      }),
      type: "input",
      key: "ctacprcmp",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: props.stringValidations.minMaxValidation(1, 10),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaProveedores.tipasicmp",
        defaultMessage: "Tipo Asig. Fac",
      }),
      type: "input",
      key: "tipasicmp",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: props.stringValidations.minMaxValidation(1, 2),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaProveedores.dricmp",
        defaultMessage: "Diario Fac",
      }),
      type: "input",
      key: "dricmp",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: props.stringValidations.minMaxValidation(1, 2),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaProveedores.driprfcmp",
        defaultMessage: "Diario Prof.",
      }),
      type: "input",
      key: "driprfcmp",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: props.stringValidations.minMaxValidation(1, 2),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaProveedores.observaciones",
        defaultMessage: "Observaciones",
      }),
      type: "input",
      key: "observacions",
      breakpoints: {
        xs: 12,
        md: 12,
      },
      text: {
        multiline: 4,
      },
    },
  ];

  return (
    <ReactGrid id="familiaProveidor" configuration={listConfiguration}>
      {(props) => (
        <MasterDetailedForm
          url={API.familiaProveidor}
          formComponents={formComponents}
          {...props}
        />
      )}
    </ReactGrid>
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
)(SuppliersFamilyList);
