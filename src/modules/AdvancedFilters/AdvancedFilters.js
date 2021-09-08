import {useState} from "react";
import PropTypes from "prop-types";
import { find } from "lodash";

import Button from "@material-ui/core/Button";
import {Chip, Fade, Paper} from "@material-ui/core";
import _ from 'lodash';

import GenericForm from "modules/GenericForm";

import "./styles.scss";

const AdvancedFilters = ({actions, filters, getValueByKey, fields = [], ...props}) => {
  const [showMore, setShowMore] = useState(false);

  const [showedFields, ] = useState(fields);

  /** Reset filters */
  const clearFilters = () => {
    actions.resetFilters();
    props.handleSearch([]);
  };

  /** The way we're render the chip */
  const showInChip = {
    'LOV': (field, data) => field.selector.labelKey(data),
    '_default': (key, data) => data
  }
  const getLabel = (key, data) => {
    const field = find(fields, (field) => field.key === key);
    return showInChip[field.type]? showInChip[field.type](field,data) : showInChip['_default'](field,data);
  }

  /** The way we're sending the data to backend */
  const valuesService = {
    'LOV': (key) => getValueByKey(key).codi,
    '_default': (key) => getValueByKey(key)
  }
  const getValue = (field) => valuesService[field.type]? valuesService[field.type](field.key) : valuesService['_default'](field.key);

  const actionButtons = () => {
    const filtered = _.omitBy(fields,field => !getValueByKey(field.key) || getValueByKey(field.key) === "");
    return (
      <div className="actions-buttons-actions">
        <div className="left-side">
          <Button onClick={() => setShowMore(!showMore)}>{!showMore? props.intl.formatMessage({
            id: "Filtros.ver_mas",
            defaultMessage: "+ Ver más"
          }):props.intl.formatMessage({
            id: "Filtros.ver_menos",
            defaultMessage: "- Ver menos"
          })}</Button>
          {
            !_.isEmpty(filtered)? <b>{props.intl.formatMessage({id: "Filtros.filtrados", defaultMessage: "Filtrados"})}</b>:null
          }
          {_.map(filtered, (field) => <Chip key={field.key} label={getLabel(field.key,getValueByKey(field.key))} variant="outlined" />)}
        </div>
        <div className="right-side">
          <Button variant="contained" color="secondary" onClick={() => clearFilters()}>{props.intl.formatMessage({id: "Filtros.limpiar", defaultMessage: "Limpiar Filtros"})}</Button>
          <Button variant="contained" color="primary" onClick={() => {
            const advFilters = fields
              .filter(field => !!getValueByKey(field.key))
              .map(field => ({columnName: field.key, value: getValue(field)}));
            props.handleSearch(advFilters)
          }}>{props.intl.formatMessage({id: "Filtros.filtrar", defaultMessage: "Filtrar"})}</Button>
        </div>
      </div>
    )
  };

  return <Paper elevation={3} className="advanced-filters-root">
    <Fade in={showMore} unmountOnExit={true}>
      <div>
        <GenericForm formComponents={showedFields}
                     setFormData={actions.setFilters}
                     getFormData={getValueByKey}
                     emptyPaper={true} />
      </div>
    </Fade>
    {actionButtons()}
  </Paper>;
};

AdvancedFilters.propTypes = {
  fields: PropTypes.array,
  handleSearch: PropTypes.func.isRequired
}

export default AdvancedFilters;