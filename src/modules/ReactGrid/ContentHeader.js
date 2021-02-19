import Grid from "@material-ui/core/Grid/Grid";
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import AddIcon from "@material-ui/icons/Add";
import FormControl from "@material-ui/core/FormControl";
import {FilledInput, InputLabel, ListItemIcon, MenuItem, Select} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ReplyIcon from "@material-ui/icons/Reply";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import {useHistory} from "react-router-dom";
import {ChevronLeft, Save} from "@material-ui/icons";

export const ContentHeader = ({ grids }) => {
  return (
    <Grid container
      style={{
        backgroundColor: '#f2f2f2',
        padding: '20px'
      }}
    >
      {grids.map(grid => (
        <Grid key={grid.id} item xs={grid.breakpoints.xs} style={grid.style} >
          { grid.content }
        </Grid>
      ))}
    </Grid>
  );
};

const HeaderHeading= ({ children }) => {
  return<h1 style={{ color: '#6f6f6f' }}>{children}</h1>
}

export const ContentHeaderList = ({ title }) => {
  const history = useHistory();
  const list = [
    {
      id: 1,
      breakpoints: {
        xs: 5
      },
      content: <HeaderHeading>{title}</HeaderHeading>
    },
    {
      id: 2,
      breakpoints: {
        xs: 2
      },
      content: <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '5px'
      }}>
        <IconButton aria-label="refesh">
          <RefreshIcon fontSize="default" />
        </IconButton>
        <IconButton aria-label="add" onClick={() => history.push(`${history.location.pathname}/create`)}>
          <AddIcon fontSize="default" />
        </IconButton>
        <FormControl>
          <Select
            value={""}
            onChange={(e) => console.log(e)}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="">
              <em>Acciones</em>
            </MenuItem>
            <MenuItem value={10}>
              <ListItemIcon>
                <ClearIcon fontSize="small" />
              </ListItemIcon>
              Limpiar Filtro
            </MenuItem>
            <MenuItem value={20}>
              <ListItemIcon>
                <ImportExportIcon fontSize="small" />
              </ListItemIcon>
              Importar
            </MenuItem>
            <MenuItem value={30}>
              <ListItemIcon>
                <ReplyIcon fontSize="small" />
              </ListItemIcon>
              Exportar
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    },
    {
      id: 5,
      breakpoints: {
        xs: 5
      },
      content: <FormControl fullWidth variant="filled">
        <InputLabel htmlFor="filled-adornment-amount">Búsqueda</InputLabel>
        <FilledInput
          id="filled-adornment-amount"
          value={""}
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

export const ContentHeaderCreate = ({ title, onClick }) => {
  const history = useHistory();
  const list = [
    {
      id: 1,
      breakpoints: {
        xs: 5
      },
      content: <HeaderHeading><IconButton onClick={() => {history.goBack()}}><ChevronLeft /></IconButton>{title}</HeaderHeading>
    },
    {
      id: 2,
      breakpoints: {
        xs: 6
      },
      content: <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '5px'
      }}>
        <IconButton aria-label="refesh">
          <RefreshIcon fontSize="default" />
        </IconButton>
        <IconButton aria-label="add" onClick={() => {}}>
          <AddIcon fontSize="default" />
        </IconButton>
        <FormControl>
          <Select
            value={""}
            onChange={(e) => console.log(e)}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="">
              <em>Acciones</em>
            </MenuItem>
            <MenuItem value={10}>
              <ListItemIcon>
                <ClearIcon fontSize="small" />
              </ListItemIcon>
              Limpiar Filtro
            </MenuItem>
            <MenuItem value={20}>
              <ListItemIcon>
                <ImportExportIcon fontSize="small" />
              </ListItemIcon>
              Importar
            </MenuItem>
            <MenuItem value={30}>
              <ListItemIcon>
                <ReplyIcon fontSize="small" />
              </ListItemIcon>
              Exportar
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    },
    {
      id: 3,
      breakpoints: {
        xs: 1
      },
      style: {
        display: 'flex',
        flexDirection: 'row-reverse'
      },
      content: <IconButton onClick={onClick}>
        <Save />
      </IconButton>
    },
  ];

  return (
    <ContentHeader grids={list} />
  );
}