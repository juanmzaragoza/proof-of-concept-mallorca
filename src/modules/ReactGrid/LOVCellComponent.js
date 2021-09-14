import LOVAutocomplete from "../GenericForm/LOVAutocomplete";

const LOVCellComponent = ({ field, data }) => {

  const handleChange = value => {
    data.setValue(value);
  };

  const {id, key, selector, placeHolder, variant, extraQuery, disabled, onBlur} = field;
  const {row, value} = data;
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
    value={row.data[key]}
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