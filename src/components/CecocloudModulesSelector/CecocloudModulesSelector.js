import React, {useEffect, useState} from "react";
import {compose} from "redux";
import {Apps} from "@material-ui/icons";
import CecocloudMenu from "../CecocloudMenu";
import {injectIntl} from "react-intl";
import { withConstants } from "../../modules/wrappers";
import {getPlainFrom} from "../../helper/storage";
import {SELECTED_MODULE_LOCALSTORAGE_KEY} from "../../constants";

const CecocloudModulesSelector = ({loading, modules, actions, getters, ...props}) => {
  const [items, setItems] = useState([]);
  const [defaultValue, setDefaultValue] = useState(null);

  // if there is only 1 module -> select it by default
  useEffect(()=>{
    // if there is only 1 module -> select it by default
    setItems(modules.map(module => getters.getModuleByName(module)));
    if(modules.length === 1) {
      setDefaultValue(getters.getModuleByName(modules[0]));
    } else{
      // if there is a module selected in the local storage
      const selectedModule = getPlainFrom(SELECTED_MODULE_LOCALSTORAGE_KEY);
      if(selectedModule) {
        actions.selectModule(selectedModule);
        setDefaultValue(getters.getModuleByName(selectedModule));
      }
    }
  },[modules]);

  return (
    <CecocloudMenu
      id="modules-menu"
      icon={<Apps />}
      items={items}
      defaultValue={defaultValue}
      noItemsText={!loading?
        props.intl.formatMessage({id: "Modules.selector.sin_resultados", defaultMessage: "No hay módulos cargados"})
        :
        `${props.intl.formatMessage({id: 'Comun.cargando', defaultMessage: 'Cargando'})}...`} />
  );
}

export default compose(
  injectIntl,
  withConstants
)(CecocloudModulesSelector);