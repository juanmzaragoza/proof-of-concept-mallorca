import React, {useEffect} from "react";
import ReactGrid from "../ReactGrid";
import {bindActionCreators} from "redux";
import {setBreadcrumbHeader, setListingConfig} from "../../redux/pageHeader";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";

const SuppliersFamilyList = ({ actions, ...props }) => {

  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "FamiliaProveedores.titulo",
        defaultMessage: "Familias proveedor"
      }),
    });
    actions.setBreadcrumbHeader([
      {title: props.intl.formatMessage({
          id: "FamiliaProveedores.titulo",
          defaultMessage: "Familias proveedor"
        }), href:"/familia-proveedores"}
    ]);
  },[]);

  const listConfiguration = {
    columns: [
      { name: 'codi',
        title: props.intl.formatMessage({
          id: "FamiliaProveedores.codigo",
          defaultMessage: "Código"
        })
      },
      { name: 'nom',
        title: props.intl.formatMessage({
          id: "FamiliaProveedores.nombre",
          defaultMessage: "Nombre"
        })
      },
    ],
    URL: 'api/fact/familiesProveidor',
    listKey: 'familiaProveidors',
    enableInlineEdition: true
  };
  return (
    <ReactGrid configuration={listConfiguration} />
  );
}

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch)
  };
  return { actions };
};

export default injectIntl(connect(null,mapDispatchToProps)(SuppliersFamilyList));