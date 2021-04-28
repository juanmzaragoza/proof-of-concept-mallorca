import React from "react";
import {compose} from "redux";
import {injectIntl} from "react-intl";
import {ChevronLeft, ChevronRight, Delete, Save, Undo, VerifiedUser} from "@material-ui/icons";
import LocalMall from "@material-ui/icons/LocalMall";

const withConstants = (PassedComponent) => {


  const WrappedComponent = ({ actions, ...props}) => {

    /** To use it, we have to bind in the wrapped component an action selectModule */
    const modulesConfig = {
      cita: {
        content: <><Save />&nbsp; {props.intl.formatMessage({id: "Modules.selector.cita",defaultMessage: "Citas"})}</>,
        onClick: () => actions && actions.selectModule('cita')
      },
      fact: {
        content: <><Undo />&nbsp; {props.intl.formatMessage({id: "Modules.selector.fact",defaultMessage: "Facturación"})}</>,
        onClick: () => actions && actions.selectModule('fact')
      },
      lici: {
        content: <><Delete />&nbsp; {props.intl.formatMessage({id: "Modules.selector.lici",defaultMessage: "Licitaciones"})}</>,
        onClick: () => actions && actions.selectModule('lici')
      },
      marc: {
        content: <><ChevronLeft />&nbsp; {props.intl.formatMessage({id: "Modules.selector.marc",defaultMessage: "Marcajes"})}</>,
        onClick: () => actions && actions.selectModule('marc')
      },
      rrhh: {
        content: <><ChevronRight />&nbsp; {props.intl.formatMessage({id: "Modules.selector.rrhh",defaultMessage: "Recursos Humanos"})}</>,
        onClick: () => actions && actions.selectModule('rrhh')
      },
      ecom: {
        content: <><VerifiedUser />&nbsp; {props.intl.formatMessage({id: "Modules.selector.ecom",defaultMessage: "Ecom"})}</>,
        onClick: () => actions && actions.selectModule('ecom')
      },
      _default: {
        content: "-",
        onClick: () => {}
      }
    }
    const getModuleByName = (module) => {
      return !modulesConfig[module]? modulesConfig['_default']:modulesConfig[module];
    }

    /**
     * Example
     * {
     *  key: 'FAC_CP', // not mandatory for routes with children
     *  title: 'Proveedores',
     *  path: 'FAC_CP', // or has path or has children but not both
     * },
     * {
     *  title: 'FAC_PEUDOC',
     *  children: [
     *  {
     *    key: 'FAC_PROVEI',
     *    title: 'FAC_PROVEI',
     *    path: 'FAC_PROVEI',
     *  },
     *  {
     *    title: 'FAC_PROTIP',
     *    children: [
     *      {
     *        key: 'FAC_PROVIN',
     *        title: 'FAC_PROVIN',
     *        path: 'FAC_PROVIN',
     *      }
     *    ]
     *  }
     *  ]
     * }
     */
    const menuRoutes = [
      {
        key: 'FAC_CP', // not mandatory for routes with children
        title: props.intl.formatMessage({id: "Proveedores.titulo",defaultMessage: "Proveedores"}),
        path: 'FAC_CP', // or has path or has children but not both
        icon: <LocalMall />
      },
      {
        key: 'FAC_PEUDOC', // not mandatory for routes with children
        title: props.intl.formatMessage({id: "FamiliaProveedores.titulo",defaultMessage: "Familia de Proveedores"}),
        path: 'FAC_PEUDOC', // or has path or has children but not both
        icon: <LocalMall />
      },
    ];

    return <PassedComponent
      constants={{modulesConfig, menuRoutes}}
      getters={{getModuleByName}} {...props}
      actions={actions} ></PassedComponent>;
  }

  return compose(
    injectIntl
  )(WrappedComponent);
}

export default withConstants;