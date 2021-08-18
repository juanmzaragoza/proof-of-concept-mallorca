import React from "react";
import { DataTypeProvider } from "@devexpress/dx-react-grid";
import LOVAutocomplete from "../GenericForm/LOVAutocomplete";

/**
 * Example:
 * https://codesandbox.io/s/devextreme-react-grid-for-material-ui-7gkh5?file=/index.js
 * */

const LOVEditor = ({ value, onValueChange, column, onBlur, autoFocus, disabled, fields, ...rest }) => {

  const handleChange = value => {
    onValueChange(value);
  };

  const fieldIndex = fields.findIndex(field => field.key === column.name);
  const {id, key, selector, placeHolder, variant, extraQuery} = fields[fieldIndex]
  const identification = id? id:key;
  return (
    <LOVAutocomplete
      id={identification}
      responseKey={selector.key}
      labelResponseKey={selector.labelKey}
      sortBy={selector.sort}
      label={placeHolder}
      onChange={(e,v,r) => {
        e.stopPropagation();
        handleChange(v);
      }}
      value={rest.row[key]}
      options={selector.options}
      variant={variant}
      disabled={disabled}
      cannotCreate={selector.cannotCreate}
      creationComponents={selector.creationComponents}
      onBlur={onBlur}
      relatedWith={selector.relatedWith}
      transform={selector.transform}
      advancedSearchColumns={selector.advancedSearchColumns}
      extraQuery={extraQuery} />
  );
};

export const LOVFormatter = props => {
  return (
    <DataTypeProvider
      editorComponent={params => <LOVEditor {...params} {...props} />}
      for={props.fields.map(field => field.key)}
    />
  )
};