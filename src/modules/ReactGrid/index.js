import React, { useState, useEffect } from 'react';
import {bindActionCreators, compose} from "redux";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {withSnackbar} from "notistack";
import {isEmpty, unionBy} from "lodash";

import "./styles.scss";

import {
  FilteringState,
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
import {FormattedMessage, injectIntl} from "react-intl";
import {
  getErrors,
  getLoading,
  getPageSize,
  getRows,
  getTotalCount
} from "../../redux/reactGrid/selectors";
import {
  updateData,
  deleteData,
  searchData,
  reset
} from "../../redux/reactGrid";
import {TableCell, TextField} from "@material-ui/core";

const getRowId = row => row.id;

const TableComponent = ({ ...restProps }) => (
  <Table.Table {...restProps} className="table-striped with-padding" />
);

/** Avoid declaring statement inside render methods
 * https://devexpress.github.io/devextreme-reactive/react/common/docs/guides/performance-optimization/#avoid-declaring-statements-inside-render-methods
 */
const FilterCellBase = ({ filter, onFilter, column }) => {
  return (
    <TableCell>
      <TextField
        value={filter ? filter.value : ''}
        onChange={e => onFilter(e.target.value ? { value: e.target.value } : null)}
        label={<FormattedMessage id={"ReactGrid.filtros.buscar_por"} defaultMessage={"Buscar por {name}"} values={{name: column.title? column.title:""}}/>} />
    </TableCell>
  )
};

const FilterCell = (props) => {
  return <FilterCellBase {...props} />;
};

const ReactGrid = ({ configuration, enqueueSnackbar,
                     rows, loading, pageSize, totalCount, errors,
                     extraQuery, onClickRow,
                     actions, ...props }) => {

  const history = useHistory();
  const [columns] = useState(configuration.columns.map(({name, title, getCellValue}) => ({name, title, getCellValue})));
  const [editingStateColumnExtensions] = useState(configuration.columns.map(
    ({name: columnName, inlineEditionDisabled}) => ({columnName, editingEnabled: !inlineEditionDisabled}))
  );
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
    const method = configuration.method;
    const body = configuration.body;
    actions.loadData({ apiId: props.id, method, body, key: configuration.listKey, page: currentPage, query, sorting});
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

  const FocusableCell = ({ onClick, ...restProps }) => {
    return <Table.Cell {...restProps} tabIndex={0} onFocus={onClick} />
  };

  const TableRow = ({ row, ...restProps }) => (
    <Table.Row
      {...restProps}
      // eslint-disable-next-line no-alert
      onClick={() => onClickRow && onClickRow(row)}
      style={{
        cursor: configuration.enableInlineEdition? 'pointer':'auto',
      }}
    />
  );

  const commitChanges = ({ added, changed, deleted }) => {
    if (added) {}
    if (changed) {
      const row = rows.find(row => changed[row.id]);
      if(row){
        const changedRow = { ...row, ...changed[row.id] };
        actions.updateData({ key: props.id, id: row.id, data: changedRow });
      }
    }
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
        <EditingState
          onCommitChanges={commitChanges}
          columnExtensions={editingStateColumnExtensions} />

        <Table tableComponent={TableComponent}
               cellComponent={FocusableCell}
               rowComponent={TableRow}
               noDataText={"table-data"} />
        <TableHeaderRow showSortingControls />
        {!configuration.disabledFiltering && <TableFilterRow cellComponent={FilterCell} />}
        {configuration.enableInlineEdition && <TableInlineCellEditing selectTextOnEditStart={false} />}
        {!configuration.disabledActions && <ActionsColumn title={props.intl.formatMessage({
          id: "Comun.acciones",
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
      getCellValue: PropTypes.func,
      inlineEditionDisabled: PropTypes.bool
    })),
    listKey: PropTypes.string.isRequired,
    enableInlineEdition: PropTypes.bool,
    disabledActions: PropTypes.bool,
    disabledFiltering: PropTypes.bool,
    method: PropTypes.oneOf(['post','put','patch']),
    body: PropTypes.object
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
    updateData: bindActionCreators(updateData, dispatch),
    loadData: bindActionCreators(searchData, dispatch),
    deleteData: bindActionCreators(deleteData, dispatch),
    reset: bindActionCreators(reset, dispatch),
  };
  return { actions };
};

export default compose(
  withSnackbar,
  injectIntl,
  connect(mapStateToProps, mapDispatchToProps),
)(ReactGrid);