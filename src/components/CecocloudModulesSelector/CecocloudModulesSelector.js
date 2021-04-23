import React, {useEffect, useState} from "react";
import {Save, Undo, Delete, ChevronLeft, ChevronRight, VerifiedUser, Apps} from "@material-ui/icons";
import CecocloudMenu from "../CecocloudMenu";

const CecocloudModulesSelector = ({loading, modules, ...props}) => {
  const [items, setItems] = useState([]);

  const modulesConfig = {
    cita: {
      content: <><Save />&nbsp; {props.intl.formatMessage({id: "Modules.selector.cita",defaultMessage: "Citas"})}</>,
      onClick: () => window.alert("Aca toy!")
    },
    fact: {
      content: <><Undo />&nbsp; {props.intl.formatMessage({id: "Modules.selector.fact",defaultMessage: "Facturación"})}</>,
      onClick: () => window.alert("Aca toy!")
    },
    lici: {
      content: <><Delete />&nbsp; {props.intl.formatMessage({id: "Modules.selector.lici",defaultMessage: "Licitaciones"})}</>,
      onClick: () => window.alert("Aca toy!")
    },
    marc: {
      content: <><ChevronLeft />&nbsp; {props.intl.formatMessage({id: "Modules.selector.marc",defaultMessage: "Marcajes"})}</>,
      onClick: () => window.alert("Aca toy!")
    },
    rrhh: {
      content: <><ChevronRight />&nbsp; {props.intl.formatMessage({id: "Modules.selector.rrhh",defaultMessage: "Recursos Humanos"})}</>,
      onClick: () => window.alert("Aca toy!")
    },
    ecom: {
      content: <><VerifiedUser />&nbsp; {props.intl.formatMessage({id: "Modules.selector.ecom",defaultMessage: "Ecom"})}</>,
      onClick: () => window.alert("Aca toy!")
    },
    _default: {
      content: "-",
      onClick: () => {}
    }
  }

  useEffect(()=>{
    setItems(modules.map(module => !modulesConfig[module]?modulesConfig['_default']:modulesConfig[module]));
  },[modules]);

  return (
    <CecocloudMenu
      id="modules-menu"
      icon={<Apps />}
      items={items}
      noItemsText={!loading?
        props.intl.formatMessage({id: "Modules.selector.sin_resultados", defaultMessage: "No hay módulos cargados"})
        :
        `${props.intl.formatMessage({id: 'Comun.cargando', defaultMessage: 'Cargando'})}...`} />
  );
}

export default CecocloudModulesSelector;