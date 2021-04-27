import React, {useEffect, useState} from "react";
import {compose} from "redux";
import {Apps} from "@material-ui/icons";
import CecocloudMenu from "../CecocloudMenu";
import {injectIntl} from "react-intl";
import { withConstants } from "../../modules/wrappers";

const CecocloudModulesSelector = ({loading, modules, actions, getters, ...props}) => {
  const [items, setItems] = useState([]);

  useEffect(()=>{
    setItems(modules.map(module => getters.getModuleByName(module)));
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

export default compose(
  injectIntl,
  withConstants
)(CecocloudModulesSelector);