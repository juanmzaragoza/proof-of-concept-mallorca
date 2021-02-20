import React, { useReducer, useState, useEffect } from 'react';
import PropTypes from "prop-types";
import {withSnackbar} from "notistack";

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

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import {ActionsColumn} from "./ActionsColumn";
import { Loading } from './Loading';
import Axios from "../services/Axios";
import { ContentHeaderList } from "./ContentHeader";
import {useHistory} from "react-router-dom";

const URL = 'https://js.devexpress.com/Demos/Mvc/api/DataGridWebApi/Orders';

const getRowId = row => row.id;

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

const ReactGrid = ({ configuration, enqueueSnackbar }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();
  const [columns] = useState(configuration.columns);

  const [totalCount, setTotalCount] = useState(0);
  const [pageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [lastQuery, setLastQuery] = useState();

  const { loading } = state;

  const actions = [
    {
      icon: <DeleteIcon />,
      action: row => deleteData(row)
    },
    {
      icon: <EditIcon />,
      action: row => history.push(`${history.location.pathname}/${row.id}`)
    },
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

  const deleteData = (row) => {
    const queryString = `api/fact/familiesProveidor/${row.id}`;
    Axios.delete(queryString,{
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }),
    })
      .then(({status, data, ...rest}) => {
        commitChanges({ deleted: [getRowId(row)] });
      })
      .catch(error => {
        const status = error.response.status;
        if(status === 400){
          enqueueSnackbar("Ups! Algo ha salido mal :(", {variant: 'error'});
        } else if(status === 500) {
          window.alert("INTERVAL SERVER ERROR");
        } else if(status === 403){
          window.alert("FORBIDDEN")
        }
      });
  };

  /*const loadData = () => {

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
  };*/

  const loadData = () => {
    const URL = 'api/fact/familiesProveidor';
    let queryString = `${URL}?size=${pageSize}&page=${currentPage}`;
    if (queryString !== lastQuery && !loading) {
      changeLoading(true);
      Axios.get(queryString)
        .then(({data}) => data)
        .then(({_embedded, page}) => {
          dispatch({ type: 'FETCH_SUCCESS', payload: _embedded.familiaProveidors });
          //TODO() un-hardcoding this -> totalCount comes empty
          setTotalCount(page.totalElements);
          changeLoading(false);
        })
        .catch(() => {
          dispatch({ type: 'FETCH_ERROR' });
          changeLoading(false);
          enqueueSnackbar("Ups! Algo ha salido mal :(", {variant: 'error'});
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
  const {
    title
  } = configuration;
  return (
    <>
      <ContentHeaderList title={title} />
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
        <ActionsColumn title="Actions" actions={data && data.length?actions:[]} />
        <PagingPanel />

      </Grid>
      {loading && <Loading />}
    </>
  );
};

ReactGrid.propTypes = {
  configuration: PropTypes.shape({
    title: PropTypes.string,
    columns: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      title: PropTypes.string
    }))
  })
};

export default withSnackbar(ReactGrid);