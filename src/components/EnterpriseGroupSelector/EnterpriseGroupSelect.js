import React, {useEffect, useState} from "react";
import {compose} from "redux";

import {Autocomplete} from "@material-ui/lab";
import {injectIntl} from "react-intl";
import {Paper, TextField} from "@material-ui/core";
import {Domain, Build} from "@material-ui/icons";

import './_styles.scss';

const ENTERPRISE_TYPE = "enterprise";
const MODULE_TYPE = "module";

const EnterpriseGroupSelect = ({ loading, tree, actions, ...props}) => {
  const [value, setValue] = useState(null);
  const [opts, setOpts] = useState([]);

  useEffect(()=>{
    actions.loadTree();
  },[]);

  useEffect(()=>{
    const options = [];
    for(const enterprise of tree){
      options.push({type: ENTERPRISE_TYPE, title: enterprise.descripcio, value: enterprise.codi});
      for(const module of enterprise.empreses){
        options.push({type: MODULE_TYPE, title: module.nom, value: module.codi})
      }
    }
    setOpts(options);
  },[tree]);

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
        setValue(newValue);
        if(newValue.type === ENTERPRISE_TYPE){
          window.alert("dispatch change enterprise")
        } else if(newValue.type === MODULE_TYPE) {
          window.alert("dispatch change module")
        }
      }}
      getOptionLabel={(option) => {
        return option.title;
      }}
      renderOption={(option, state) => {
        if(option.type === ENTERPRISE_TYPE) {
          return (
            <div className={"enterprise-items-container"}>
              <div><Domain fontSize="small"/></div>
              <div className={"enterprise-items-title"}>{option.title}</div>
              <div className={"enterprise-items-icon-right"}><Build/></div>
            </div>
          )
        } else if(option.type === MODULE_TYPE){
          return (
            <div className={"module-items-container"}>
              <div>{option.title}</div>
            </div>
          )
        }
      }}
      noOptionsText={"todo() non-results"}
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

export default compose(injectIntl)(EnterpriseGroupSelect)