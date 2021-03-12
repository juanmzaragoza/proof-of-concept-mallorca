import React from "react";
import {useHistory} from "react-router-dom";
import {CircularProgress, FilledInput, InputLabel, Tooltip} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import FormControl from "@material-ui/core/FormControl";
import {FormattedMessage} from "react-intl";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

import IconMenu from "modules/shared/IconMenu";
import ContentHeader from "./ContentHeader";
import BreadcrumbHeader from "./BreadcrumbHeader";
import {getLoading} from "../../redux/app/selectors";
import {bindActionCreators} from "redux";
import {setFireSaveFromHeader} from "../../redux/pageHeader";
import {connect} from "react-redux";

export const ListingHeader = ({ config: { title }, loadingIndicator }) => {
  const history = useHistory();
  const list = [
    {
      id: 1,
      breakpoints: {
        xs: 12,
        md: 5
      },
      content: <BreadcrumbHeader config={[{title: "Proveedores", href:"/proveedores"}]}/>
    },
    {
      id: 2,
      breakpoints: {
        xs: 12,
        md: 2
      },
      content: <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '5px'
      }}>
        {loadingIndicator && <IconButton><CircularProgress size={25}/></IconButton>}
        <Tooltip title="Refrescar" placement="top-start">
          <IconButton aria-label="refesh">
            <RefreshIcon fontSize="default" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Nuevo" placement="top-start">
          <IconButton aria-label="add" onClick={() => history.push(`${history.location.pathname}/create`)}>
            <AddIcon fontSize="default" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Eliminar" placement="top-start">
          <IconButton aria-label="delete">
            <DeleteIcon fontSize="default" />
          </IconButton>
        </Tooltip>
        <IconMenu options={[
          {key: 1, label: 'Limpiar Filtros'},
          {key: 2, label: 'Importar'},
          {key: 3, label: 'Exportar'}
        ]} />
      </div>
    },
    {
      id: 5,
      breakpoints: {
        xs: 12,
        md: 5
      },
      content: <FormControl fullWidth variant="filled">
        <InputLabel htmlFor="filled-adornment-amount"><FormattedMessage
          id="ContentHeader.busqueda"
          defaultMessage="Búsqueda"
        /></InputLabel>
        <FilledInput
          id="filled-adornment-amount"
          value={""}
          size={"small"}
          onChange={e => console.log(e)}
          endAdornment={<InputAdornment position="end"><SearchIcon></SearchIcon></InputAdornment>}
        />
      </FormControl>
    },
  ];

  return (
    <ContentHeader grids={list} />
  );
}

const mapStateToProps = (state, props) => {
  return {
    loadingIndicator: getLoading(state),
  };
};

export default connect(mapStateToProps,null)(ListingHeader);