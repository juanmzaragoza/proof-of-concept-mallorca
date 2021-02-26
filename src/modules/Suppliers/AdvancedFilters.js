import React, {useState} from "react";
import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import {injectIntl} from "react-intl";

import Button from "@material-ui/core/Button";
import {Chip, Fade, Paper} from "@material-ui/core";
import _ from 'lodash';

import GenericForm from "modules/GenericForm";
import {getFilters} from "redux/advancedFilters/selectors";
import {add, reset} from "redux/advancedFilters";

import "./styles.scss";

const AdvancedFilters = ({actions, filters, ...props}) => {
  const [showMore, setShowMore] = useState(false);

  const [showedFields, ] = useState([
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.codigo",
        defaultMessage: "Código"
      }),
      type: 'input',
      key: '1aa',
      breakpoints: {
        xs: 12,
        md: 3
      },
      variant: 'outlined'
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.nombre_comercial",
        defaultMessage: "Nombre Comercial"
      }),
      type: 'input',
      key: '2',
      breakpoints: {
        xs: 12,
        md: 3
      },
      variant: 'outlined'
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.nombre_fiscal",
        defaultMessage: "Nombre Fiscal"
      }),
      type: 'input',
      key: '3',
      breakpoints: {
        xs: 12,
        md: 3
      },
      variant: 'outlined'
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.nif",
        defaultMessage: "NIF"
      }),
      type: 'input',
      key: '4',
      breakpoints: {
        xs: 12,
        md: 3
      },
      variant: 'outlined'
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.alias",
        defaultMessage: "Alias"
      }),
      type: 'input',
      key: '5',
      breakpoints: {
        xs: 12,
        md: 6
      },
      variant: 'outlined'
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.familia",
        defaultMessage: "Familia"
      }),
      type: 'input',
      key: '6',
      breakpoints: {
        xs: 12,
        md: 6
      },
      variant: 'outlined'
    },
  ]);

  const clearFilters = () => {
    actions.resetFilters();
  };

  const actionButtons = () => (
    <div className="actions-buttons-actions">
      <div className="left-side">
        <Button onClick={() => setShowMore(!showMore)}>{!showMore? "+ Ver más":"- Ver menos"}</Button>
        {
          !_.isEmpty(_.omitBy(filters, data => data === ""))? <b>Filtrados</b>:null
        }
        {_.map(_.omitBy(filters, data => data === ""), (value, key) => <Chip key={key} label={value} variant="outlined" />)}
      </div>
      <div className="right-side">
        <Button variant="contained" color="secondary" onClick={() => clearFilters()}>Limpiar Filtros</Button>
        <Button variant="contained" color="primary">Filtrar</Button>
      </div>
    </div>
  );

  return <Paper elevation={3} className="advanced-filters-root">
    <Fade in={showMore} unmountOnExit={true}>
      <div>
        <GenericForm formComponents={showedFields}
                     setFormData={actions.setFilters}
                     formData={filters} emptyPaper={true} />
      </div>
    </Fade>
    {actionButtons()}
  </Paper>;
};

const mapStateToProps = (state, props) => {
  return {
    filters: getFilters(state)
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setFilters: bindActionCreators(add, dispatch),
    resetFilters: bindActionCreators(reset, dispatch)
  };
  return { actions };
};

const component = injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvancedFilters));
export default component;