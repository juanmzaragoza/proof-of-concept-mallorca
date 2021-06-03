import React, { useState, useEffect } from 'react';
import {bindActionCreators, compose} from "redux";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {withSnackbar} from "notistack";
import {isEmpty, unionBy} from "lodash";

import "./styles.scss";

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
import { Loading } from '../shared/Loading';
import {useHistory} from "react-router-dom";
import {injectIntl} from "react-intl";
import {
  getErrors,
  getLoading,
  getPageSize,
  getRows,
  getTotalCount
} from "../../redux/reactGrid/selectors";
import {deleteData, searchData, reset} from "../../redux/reactGrid";

const getRowId = row => row.id;

const TableComponent = ({ ...restProps }) => (
  <Table.Table {...restProps} className="table-striped with-padding" />
);

const ReactGrid = ({ configuration, enqueueSnackbar,
                     rows, loading, pageSize, totalCount, errors,
                     extraQuery, onClickRow,
                     actions, ...props }) => {

  const history = useHistory();
  const [columns] = useState(configuration.columns);
  const [currentPage, setCurrentPage] = useState(0);
  const [sorting, setSorting] = useState([]);
  const [filters, setFilters] = useState([]);

  const rightMenu = [
    {
      icon: <DeleteIcon />,
      action: row => deleteData(row)
    },
    {
      icon: <EditIcon />,
      action: row => history.push(`${history.location.pathname}/${row.id}`)
    },
  ];

  const deleteData = (row) => {
    actions.deleteData({ key: props.id, id: row.id });
  };

  const loadData = () => {
    const query = unionBy(extraQuery || [],filters,(filter) => filter.columnName) || [];
    actions.loadData({ apiId: props.id, key: configuration.listKey, page: currentPage, query, sorting});
  };

  // executed when mounts component and when vars change
  useEffect(() => loadData(),[currentPage,sorting,filters,extraQuery]);

  // if the filters change
  useEffect(() => {
    setCurrentPage(0);
  },[filters,extraQuery]);

  useEffect(()=>{
    if(!isEmpty(errors)){
      enqueueSnackbar(props.intl.formatMessage({
        id: "ReactGrid.error.algo_salio_mal",
        defaultMessage: "Ups! Algo ha salido mal :("
      }), {variant: 'error'});
    }
  },[errors]);

  const FocusableCell = ({ onClick, ...restProps }) => (
    <Table.Cell {...restProps} tabIndex={0} onFocus={onClick} />
  );

  const TableRow = ({ row, ...restProps }) => (
    <Table.Row
      {...restProps}
      // eslint-disable-next-line no-alert
      onClick={() => onClickRow && onClickRow(row)}
      style={{
        cursor: 'pointer',
      }}
    />
  );

  const commitChanges = ({ added, changed, deleted }) => {
    if (added) {}
    if (changed) {}
    if(deleted) {
      actions.deleteData({ key: props.id, id: deleted[0] });
    }
  };

  return (
    <>
      <Grid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
      >
        {/* Sorting configuration */}
        <SortingState
          sorting={sorting}
          onSortingChange={setSorting} />
        <IntegratedSorting />
        {/***************************/}
        {/* Filtering configuration */}
        <FilteringState
          defaultFilters={[]}
          onFiltersChange={setFilters} />
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

        <Table tableComponent={TableComponent}
               cellComponent={FocusableCell}
               rowComponent={TableRow}
               noDataText={"table-data"} />
        <TableHeaderRow showSortingControls />
        <TableFilterRow />
        {configuration.enableInlineEdition && <TableInlineCellEditing selectTextOnEditStart />}
        {!configuration.disabledActions && <ActionsColumn title={props.intl.formatMessage({
          id: "ReactGrid.actions_column",
          defaultMessage: "Acciones"
        })} actions={rows && rows.length? rightMenu:[]} />}
        <PagingPanel />

      </Grid>
      {loading && <Loading />}
    </>
  );
};

ReactGrid.propTypes = {
  id: PropTypes.string.isRequired,
  configuration: PropTypes.shape({
    title: PropTypes.string,
    columns: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      title: PropTypes.string,
      getCellValue: PropTypes.func
    })),
    listKey: PropTypes.string.isRequired,
    enableInlineEdition: PropTypes.bool,
    disabledActions: PropTypes.bool
  }),
  extraQuery: PropTypes.arrayOf(PropTypes.shape({
    columnName: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }))
};

const mapStateToProps = (state, props) => {
  return {
    rows: getRows(state),
    totalCount: getTotalCount(state),
    loading: getLoading(state),
    pageSize: getPageSize(state),
    errors: getErrors(state),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    loadData: bindActionCreators(searchData, dispatch),
    deleteData: bindActionCreators(deleteData, dispatch),
    reset: bindActionCreators(reset, dispatch),
  };
  return { actions };
};

export default compose(
  withSnackbar,
  injectIntl,
  connect(mapStateToProps, mapDispatchToProps)
)(ReactGrid);