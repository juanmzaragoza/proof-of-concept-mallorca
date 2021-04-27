import React from "react";
import {compose} from "redux";
import {injectIntl} from "react-intl";
import {ChevronLeft, ChevronRight, Delete, Save, Undo, VerifiedUser} from "@material-ui/icons";

const withConstants = (PassedComponent) => {


  const WrappedComponent = ({ actions, ...props}) => {

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

    return <PassedComponent constants={{modulesConfig}} getters={{getModuleByName}} {...props} ></PassedComponent>;
  }

  return compose(
    injectIntl
  )(WrappedComponent);
}

export default withConstants;