import {useEffect, useState} from "react";
import Selector from "../GenericForm/Selector";

const LOVCellComponent = ({ field, data }) => {

  const {id, key, selector, placeHolder, variant, extraQuery, disabled, onBlur} = field;
  const [value, setValue] = useState(data.data[key]);

  useEffect(()=>{
    setValue(data.data[key]);
  },[data]);

  const handleChange = value => {
    setValue(value);
    data.setValue(value);

  };

  const identification = id? id:key;
  return   <Selector
  id={identification}
  options={selector.options}
  value={
    data.data[key]
  }
  onChange={(e) => {
    handleChange(e, e.target.value);
    
  }}
/>
};

export default LOVCellComponent;