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
      key: 'codi',
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
      key: 'nomComercial',
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
      key: 'nomFiscal',
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
      key: 'nif',
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
      key: 'alias',
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
      type: 'LOV',
      key: 'familiaProveidor',
      required: true,
      breakpoints: {
        xs: 12,
        md: 6
      },
      variant: 'outlined',
      selector: {
        key: 'familiaProveidors',
        labelKey: (data) => `${data.nom} (${data.codi})`,
        sort: 'nom',
        creationComponents: [
          {
            type: 'input',
            key: 'codi',
            placeHolder: props.intl.formatMessage({id: "Comun.codigo", defaultMessage: "Código"}),
            required: true,
            noEditable: true,
            breakpoints: {
              xs: 12,
              md: 6
            }
          },
          {
            type: 'input',
            key: 'nom',
            placeHolder: props.intl.formatMessage({id: "Comun.nombre", defaultMessage: "Nombre"}),
            required: true,
            breakpoints: {
              xs: 12,
              md: 6
            }
          }
        ]
      },
    },
  ]);

  const clearFilters = () => {
    actions.resetFilters();
  };

  const actionButtons = () => {
    const filtered = _.omitBy(filters, data => data === "" || !data);
    return (
      <div className="actions-buttons-actions">
        <div className="left-side">
          <Button onClick={() => setShowMore(!showMore)}>{!showMore? "+ Ver más":"- Ver menos"}</Button>
          {
            !_.isEmpty(filtered)? <b>Filtrados</b>:null
          }
          {_.map(filtered, (value, key) => <Chip key={key} label={value} variant="outlined" />)}
        </div>
        <div className="right-side">
          <Button variant="contained" color="secondary" onClick={() => clearFilters()}>Limpiar Filtros</Button>
          <Button variant="contained" color="primary">Filtrar</Button>
        </div>
      </div>
    )
  };

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