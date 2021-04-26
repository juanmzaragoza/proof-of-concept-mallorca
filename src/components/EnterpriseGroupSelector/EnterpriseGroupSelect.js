import React, {useEffect, useState} from "react";
import {compose} from "redux";

import {Autocomplete} from "@material-ui/lab";
import {injectIntl} from "react-intl";
import {Paper, TextField} from "@material-ui/core";
import {Domain, Build} from "@material-ui/icons";

import './_styles.scss';
import {getObjectFrom, setObjectOn} from "../../helper/storage";
import {ENTERPRISE_GROUP_VALUE_LOCALSTORAGE_KEY} from "../../constants";

const ENTERPRISE_TYPE = "enterprise";
const MODULE_TYPE = "module";

const EnterpriseGroupSelect = ({ loading, tree, isTokenRefreshed, actions, ...props}) => {
  const [value, setValue] = useState(null);
  const [opts, setOpts] = useState([]);

  // load all tree data
  useEffect(()=>{
    actions.loadTree();
  },[]);

  // after tree loaded => render options, get selected group and fire load modules
  useEffect(()=>{
    const options = [];
    for(const enterprise of tree){
      options.push({type: ENTERPRISE_TYPE, title: enterprise.descripcio, value: enterprise, isAdmin: enterprise.hasAdminPermission});
      for(const module of enterprise.empreses){
        if(module.activa) options.push({type: MODULE_TYPE, title: module.nom, enterprise, value: module});
      }
    }
    setOpts(options);
    if(tree.length > 0){
      const enterpriseGroup = getObjectFrom(ENTERPRISE_GROUP_VALUE_LOCALSTORAGE_KEY);
      if(enterpriseGroup) {
        setValue(enterpriseGroup);
        types[enterpriseGroup.type].setValue(value);
      }
    }
  },[tree]);

  // is not executed until token is refreshed
  useEffect(()=>{
    if(value && isTokenRefreshed) types[value.type].setValue(value);
  },[value,isTokenRefreshed]);

  // saves the selected value in localStorage
  const setSelectedValue = (value) => {
    setValue(value);
    setObjectOn(ENTERPRISE_GROUP_VALUE_LOCALSTORAGE_KEY, value);
  };

  const types = {
    [ENTERPRISE_TYPE]: {
      'onChange': (newValue) => {
        //TODO() dispatch change enterprise
        console.log("TODO(): dispatch change enterprise");
        setSelectedValue(newValue);
      },
      'render': (option) => (
        <div className={"enterprise-items-container"}>
          <div><Domain fontSize="small"/></div>
          <div className={"enterprise-items-title"}>{option.title}</div>
          {option.isAdmin && <div className={"enterprise-items-icon-right"}><Build/></div>}
        </div>
      ),
      'optionLabel': (option) => (
        `${option.title} / _`
      ),
      'setValue': (option) => {
        //TODO() -> start loading modules
      }
    },
    [MODULE_TYPE]: {
      'onChange': (newValue) => {
        // refresh token
        actions.refreshSession({id: newValue.enterprise.id, enterprise: newValue.value.id});
        // and load modules
        setSelectedValue(newValue);
      },
      'render': (option) => (
        <div className={"module-items-container"}>
          <div>{option.title}</div>
        </div>
      ),
      'optionLabel': (option) => (
        `${option.enterprise.descripcio} / ${option.title}`
      ),
      'setValue': (option) => {
        // load modules
        actions.loadModules();
      }
    }
  }

  return (
    <Autocomplete
      handleHomeEndKeys
      disableCloseOnSelect
      disableClearable
      fullWidth
      id={'enterprise-group'}
      className={"enterprise-selector-container"}
      options={opts}
      loading={loading}
      value={value}
      onChange={(e, newValue) => {
        types[newValue.type].onChange(newValue);
      }}
      getOptionLabel={(option) => {
        return types[option.type].optionLabel(option);
      }}
      renderOption={(option, state) => {
        return types[option.type].render(option);
      }}
      noOptionsText={props.intl.formatMessage({
        id: "EnterpriseGroup.selector.sin_resultados",
        defaultMessage: "No hay opciones disponibles"
      })}
      loadingText={`${props.intl.formatMessage({id: 'Comun.cargando', defaultMessage: 'Cargando'})}...`}
      renderInput={(params) =>
        <TextField {...params}
                   label={"Enterprise's Group"}
                   variant={props.variant ? props.variant : 'outlined'}
                   required={props.required}
                   InputProps={{
                     ...params.InputProps
                   }}/>}
      />
  );
};

export default compose(
  injectIntl
)(EnterpriseGroupSelect);