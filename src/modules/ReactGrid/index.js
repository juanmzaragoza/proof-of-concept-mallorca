import React, { useReducer, useState, useEffect } from 'react';
import { default as GridContainer } from '@material-ui/core/Grid';
import {
  FilteringState,
  IntegratedFiltering,
  SortingState,
  IntegratedSorting,
  PagingState,
  CustomPaging,
  EditingState,
} from '@devexpress/dx-react-grid';
import {
  Table,
  Grid,
  TableHeaderRow,
  TableFilterRow,
  PagingPanel,
  TableInlineCellEditing,
} from '@devexpress/dx-react-grid-material-ui';

import Paper from '@material-ui/core/Paper';
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from '@material-ui/icons/Refresh';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import ReplyIcon from '@material-ui/icons/Reply';
import ClearIcon from '@material-ui/icons/Clear';
import ImportExportIcon from '@material-ui/icons/ImportExport';

import FormControl from "@material-ui/core/FormControl";
import {FilledInput, InputLabel, ListItemIcon, MenuItem, Select} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";

import {ActionsColumn} from "./ActionsColumn";
import { Loading } from './Loading';

const URL = 'https://js.devexpress.com/Demos/Mvc/api/DataGridWebApi/Orders';

const getRowId = row => row.OrderID;

const initialState = {
  data: [],
  loading: false,
  sorting: []
};

function reducer(state, { type, payload }) {

  switch (type) {
    case 'FETCH_SUCCESS':
      return {
        ...state,
        data: payload,
        loading: false,
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
      };
    case 'CHANGE_SORTING':
      return {
        ...state,
        sorting: payload
      }
    case 'CHANGE_LOADING':
      return {
        ...state,
        loading: payload
      }
    default:
      return state;
  }
}

const ReactGrid = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [columns] = useState([
    { name: 'ShipCountry', title: 'Country' },
    { name: 'ShipCity', title: 'City' },
    { name: 'ShipAddress', title: 'Address' }
  ]);

  const [totalCount, setTotalCount] = useState(0);
  const [pageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [lastQuery, setLastQuery] = useState();
  const { loading } = state;

  const actions = [
    {
      icon: <DeleteIcon/>,
      action: row => commitChanges({ deleted: [getRowId(row)] })
    }
  ];

  const changeFilters = (filters) => {
    console.log(filters);
  };

  const changeSorting = (value) => {
    dispatch({ type: 'CHANGE_SORTING', payload: value});
  }

  const changeLoading = (value) => {
    dispatch({ type: 'CHANGE_LOADING', payload: value});
  }

  const loadData = () => {

    let queryString = `${URL}?take=${pageSize}&skip=${pageSize * currentPage}`;

    if (sorting.length) {
      const sortingConfig = sorting
        .map(({ columnName, direction }) => ({
          selector: columnName,
          desc: direction === 'desc',
        }));
      const sortingStr = JSON.stringify(sortingConfig);
      queryString = `${queryString}&sort=${escape(`${sortingStr}`)}`;
    }

    if (queryString !== lastQuery && !loading) {
      changeLoading(true);
      fetch(queryString)
        .then(response => response.json())
        .then(({ data, totalCount: newTotalCount }) => {
          dispatch({ type: 'FETCH_SUCCESS', payload: data });
          //TODO() un-hardcoding this -> totalCount comes empty
          setTotalCount(100);
          changeLoading(false);
        })
        .catch(() => {
          dispatch({ type: 'FETCH_ERROR' });
          changeLoading(false);
        });
      setLastQuery(queryString);
    }
  };

  useEffect(() => loadData());

  const FocusableCell = ({ onClick, ...restProps }) => (
    <Table.Cell {...restProps} tabIndex={0} onFocus={onClick} />
  );

  const commitChanges = ({ changed, deleted }) => {
    let changedRows;
    if (changed) {
      changedRows = data.map(row => changed[getRowId(row)] ? { ...row, ...changed[getRowId(row)] } : row);
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = data.filter(row => !deletedSet.has(getRowId(row)));
    }

    dispatch({ type: 'FETCH_SUCCESS', payload: changedRows });
  };

  const {
    data, sorting
  } = state;
  return (
    <Paper style={{ position: 'relative' }}>
      <GridContainer container style={{
        backgroundColor: '#f2f2f2',
        padding: '20px'}}>
        <GridContainer item xs={5}>
          <h1 style={{ color: '#6f6f6f' }}>Marcajes</h1>
        </GridContainer>
        <GridContainer item xs={2}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '5px'
          }}>
            <IconButton aria-label="refesh">
              <RefreshIcon fontSize="default" />
            </IconButton>
            <IconButton aria-label="add">
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
        </GridContainer>
        <GridContainer item xs={5}>
          <FormControl fullWidth variant="filled">
            <InputLabel htmlFor="filled-adornment-amount">Búsqueda</InputLabel>
            <FilledInput
              id="filled-adornment-amount"
              value={""}
              onChange={e => console.log(e)}
              endAdornment={<InputAdornment position="end"><SearchIcon></SearchIcon></InputAdornment>}
            />
          </FormControl>
        </GridContainer>
      </GridContainer>
      <Grid
        rows={data}
        columns={columns}
        getRowId={getRowId}
      >
        {/* Sorting configuration */}
        <SortingState
          sorting={sorting}
          onSortingChange={changeSorting} />
        <IntegratedSorting />
        {/***************************/}
        {/* Filtering configuration */}
        <FilteringState
          defaultFilters={[]}
          onFiltersChange={changeFilters} />
        <IntegratedFiltering />
        {/***************************/}
        {/* Paging configuration */}
        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={setCurrentPage}
          pageSize={pageSize}
        />
        <CustomPaging
          totalCount={totalCount}
        />
        {/***************************/}
        <EditingState onCommitChanges={commitChanges} />

        <Table cellComponent={FocusableCell} />
        <TableHeaderRow showSortingControls />
        <TableFilterRow />
        <TableInlineCellEditing selectTextOnEditStart/>
        <ActionsColumn title="Actions" actions={actions} />
        <PagingPanel />

      </Grid>
      {loading && <Loading />}
    </Paper>
  );
};

export default ReactGrid;