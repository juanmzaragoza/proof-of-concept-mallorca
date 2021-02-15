import React, { useReducer, useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { default as GridContainer } from '@material-ui/core/Grid';
import {
  GroupingState,
  CustomGrouping,
  FilteringState,
  IntegratedFiltering,
  Table, SortingState,
  IntegratedSorting,
  PagingState,
  CustomPaging,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  VirtualTable,
  TableHeaderRow,
  TableGroupRow,
  GroupingPanel,
  DragDropProvider,
  Toolbar,
  TableFilterRow,
  PagingPanel
} from '@devexpress/dx-react-grid-material-ui';

import { Loading } from './Loading';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import {ActionsColumn} from "./ActionsColumn";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from '@material-ui/icons/Refresh';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import ReplyIcon from '@material-ui/icons/Reply';
import ClearIcon from '@material-ui/icons/Clear';
import ImportExportIcon from '@material-ui/icons/ImportExport';

import FormControl from "@material-ui/core/FormControl";
import {FilledInput, Input, InputLabel, ListItemIcon, MenuItem, Select} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";

const URL = 'https://js.devexpress.com/Demos/Mvc/api/DataGridWebApi/Orders';

const getRowId = row => row.OrderID;
const getChildGroups = groups => groups
    .map(group => ({ key: group.key, childRows: group.items }));

const initialState = {
  data: [],
  grouping: [],
  expandedGroups: [],
  tempGrouping: null,
  tempExpandedGroups: null,
  loading: true,
  sorting: []
};

function reducer(state, { type, payload }) {
  const { grouping, expandedGroups, tempGrouping } = state;

  switch (type) {
    case 'CHANGE_GROUPING':
      return {
        ...state,
        loading: true,
        grouping: payload,
        tempGrouping: tempGrouping === null ? grouping : tempGrouping,
        tempExpandedGroups: expandedGroups,
      };
    case 'SET_EXPANDED_GROUPS':
      return {
        ...state,
        expandedGroups: payload,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        data: payload,
        tempGrouping: null,
        tempExpandedGroups: null,
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

const CustomTable = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [columns] = useState([
    { name: 'ShipCountry', title: 'Country' },
    { name: 'ShipCity', title: 'City' },
    { name: 'ShipAddress', title: 'Address' }
  ]);

  const [totalCount, setTotalCount] = useState(0);
  const [pageSize] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);
  const [lastQuery, setLastQuery] = useState();
  const { grouping, loading } = state;

  const actions = [
    {
      icon: <DeleteIcon/>,
      action: id => alert('edit id: ' + id)
    },
    {
      icon: <EditIcon/>,
      action: id => alert('edit id: ' + id)
    }
  ];

  const changeGrouping = (value) => {
    dispatch({ type: 'CHANGE_GROUPING', payload: value });
  };

  const changeFilters = (filters) => {
    console.log(filters);
  };

  const setExpandedGroups = (value) => {
    dispatch({ type: 'SET_EXPANDED_GROUPS', payload: value });
  };

  const changeSorting = (value) => {
    dispatch({ type: 'CHANGE_SORTING', payload: value});
  }

  const changeLoading = (value) => {
    dispatch({ type: 'CHANGE_LOADING', payload: value});
  }

  const getQueryString = () => {
    if (!grouping.length) return URL;
    let queryString = `${URL}&take=${pageSize}&skip=${pageSize * currentPage}`;

    const groupConfig = grouping
        .map(columnGrouping => ({
          selector: columnGrouping.columnName,
          isExpanded: true,
        }));

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
          console.log(data, newTotalCount)
          setTotalCount(newTotalCount);
          changeLoading(false);
        })
        .catch(() => changeLoading(false));
      setLastQuery(queryString);
    }

    return `${queryString}?group=${JSON.stringify(groupConfig)}`;
  };

  const loadData = () => {
    if (!loading) return;

    const queryString = getQueryString();
    fetch(queryString, { mode: 'cors' })
        .then(response => response.json())
        .then((orders) => {
          dispatch({ type: 'FETCH_SUCCESS', payload: orders.data });
        })
        .catch(() => dispatch({ type: 'FETCH_ERROR' }));
  };

  useEffect(() => loadData());

  const {
    data, expandedGroups, tempGrouping, tempExpandedGroups, sorting
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
              <RefreshIcon fontSize="medium" />
            </IconButton>
            <IconButton aria-label="add">
              <AddIcon fontSize="medium" />
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
          {/* Grouping configuration */}
          <DragDropProvider />
          <GroupingState
              grouping={grouping}
              onGroupingChange={changeGrouping}
              expandedGroups={expandedGroups}
              onExpandedGroupsChange={setExpandedGroups}
          />
          <CustomGrouping
              getChildGroups={getChildGroups}
              grouping={tempGrouping}
              expandedGroups={tempExpandedGroups}
          />
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
          <Table />

          <VirtualTable />
          <TableHeaderRow showSortingControls />
          <TableFilterRow />
          <TableGroupRow />
          <Toolbar />
          <GroupingPanel showGroupingControls />
          <ActionsColumn title="Actions" actions={actions} />
          <PagingPanel />

        </Grid>
        {loading && <Loading />}
      </Paper>
  );
};

export default CustomTable;