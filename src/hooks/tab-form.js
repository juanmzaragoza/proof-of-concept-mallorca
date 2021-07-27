import {useEffect, useState} from "react";
import {every} from "lodash";

export const useTabForm = (props) => {
  const [formIsValid, setFormIsValid] = useState(props.fields);
  const [touched, setTouched] = useState(props.fields);
  const [isVisible, setIsVisible] = useState(false);

  /** Effect to control if the component is visible or not */
  useEffect(() => {
    setIsVisible(true);
    return () => {
      setIsVisible(false);
    }
  },[]);

  useEffect(()=>{
    validation(every(formIsValid, (v) => v));
  },[JSON.stringify(formIsValid)]);

  const validation = (validity) => {
    isVisible && props.setIsValid && props.setIsValid(validity);
  }

  const addValidity = (key, value) => {
    formIsValid[key] = value;
    setFormIsValid(formIsValid);
  }

  const handleTouched = (key) => {
    setTouched({...touched,[key]: true});
  }

  return [touched, handleTouched, addValidity,formIsValid];
}