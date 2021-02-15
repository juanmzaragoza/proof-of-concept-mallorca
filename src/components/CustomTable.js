import React, { useReducer, useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  GroupingState,
  CustomGrouping,
  FilteringState,
  IntegratedFiltering,
  Table, SortingState,
  IntegratedSorting,
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
} from '@devexpress/dx-react-grid-material-ui';

import { Loading } from './Loading';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import {ActionsColumn} from "./ActionsColumn";

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

  const getQueryString = () => {
    if (!grouping.length) return URL;
    let queryString = `${URL}`;

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
          <Table />

          <VirtualTable />
          <TableHeaderRow showSortingControls />
          <TableFilterRow />
          <TableGroupRow />
          <Toolbar />
          <GroupingPanel showGroupingControls />
          <ActionsColumn title="Actions" actions={actions} />

        </Grid>
        {loading && <Loading />}
      </Paper>
  );
};

export default CustomTable;