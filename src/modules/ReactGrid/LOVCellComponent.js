import {useEffect, useState} from "react";
import LOVAutocomplete from "../GenericForm/LOVAutocomplete";

const LOVCellComponent = ({ field, data }) => {

  const {id, key, selector, placeHolder, variant, extraQuery, disabled, onBlur} = field;
  const [value, setValue] = useState(data.data[key]);

  useEffect(()=>{
    setValue(data.data[key]);
  },[data]);

  const handleChange = value => {
    setValue(value);
    data.setValue(value);
    data.component.updateDimensions();
  };

  const identification = id? id:key;
  return <LOVAutocomplete
    id={identification}
    responseKey={selector.key}
    labelResponseKey={selector.labelKey}
    sortBy={selector.sort}
    label={placeHolder}
    onChange={(e,v,r) => {
      e.stopPropagation();
      handleChange(v);
    }}
    value={value}
    options={selector.options}
    variant={variant}
    //disabled={disabled}
    cannotCreate={selector.cannotCreate}
    creationComponents={selector.creationComponents}
    //onBlur={onBlur}
    relatedWith={selector.relatedWith}
    transform={selector.transform}
    advancedSearchColumns={selector.advancedSearchColumns}
    extraQuery={extraQuery} />
};

export default LOVCellComponent;