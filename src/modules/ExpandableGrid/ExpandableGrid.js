import React, {useEffect, useState} from 'react';
import {compose} from "redux";
import {injectIntl} from "react-intl";
import PropTypes from "prop-types";
import {
  CustomPaging,
  EditingState,
  PagingState,
  RowDetailState,
  SortingState
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditColumn,
  PagingPanel,
  TableRowDetail,
} from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';
import {withSnackbar} from "notistack";

import './styles.scss';
import {Loading} from "../shared/Loading";
import ExpandableContent from "./ExpandableContent";
import {PopupEditing, ExpandablePopup} from "./ExpandablePopup";

const TableComponent = ({ ...restProps }) => (
  <Table.Table {...restProps} className="table-striped" />
);

const getRowId = row => row.id;
const ExpandableGrid = ({ id, responseKey, configuration,
                          rows, totalCount, pageSize, loading, refreshData,
                          actions, readOnly, ...props}) => {
  const [columns] = useState(configuration.columns.filter(col => !col.hidden));
  const [expandedRowIds, setExpandedRowIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [sorting, setSorting] = useState([]);
  const [enabled, setEnabled] = useState(false);
  const [query, setQuery] = useState([]);

  useEffect(() =>{
    setEnabled(props.enabled);
    setQuery(configuration.query);
  },[props.enabled, configuration.query]);

  const doRequest = () => {
    actions.loadData({apiId: id, key: responseKey, page: currentPage, query: query || [], sorting});
  }
  
  useEffect(() =>{
    enabled && doRequest();
  },[enabled, currentPage, sorting]);

  useEffect(()=>{
    refreshData && enabled && doRequest();
  },[refreshData]);

  const commitChanges = ({ added, changed, deleted }) => {
    if (added) {}
    if (changed) {}
    if(deleted) {
      //TODO() change this if we allow to delete multiples
      actions.deleteData({key: id, id: deleted[0]});
    }
  };

  const RowDetail = ({ row }) => (
    <div className="row-detail-root">
      <ExpandableContent data={row}
                         columns={configuration.columns} />
    </div>
  );

  const RowComponent = (props) => {
    const expanded = expandedRowIds.filter(rowId => props.tableRow.rowId === rowId);
    const className = expanded.length > 0? "expanded-row":"";
    return <Table.Row {...props} className={className} />;
  }

  return (
    <Paper>
      <Grid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
      >
        <EditingState
          onCommitChanges={commitChanges}
        />
        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={setCurrentPage}
          pageSize={pageSize}
        />
        <CustomPaging
          totalCount={totalCount}
        />
        <RowDetailState
          expandedRowIds={expandedRowIds}
          onExpandedRowIdsChange={setExpandedRowIds}
        />
        <SortingState
          sorting={sorting}
          onSortingChange={setSorting}
        />
        <Table tableComponent={TableComponent} rowComponent={RowComponent}/>
        <TableHeaderRow showSortingControls />
        {!readOnly &&
        <TableEditColumn
          showAddCommand={enabled}
          showEditCommand
          showDeleteCommand
          messages={{
            'addCommand': props.intl.formatMessage({
              id: "Comun.nuevo",
              defaultMessage: "Nuevo"
            }),
            'editCommand': props.intl.formatMessage({
              id: "Comun.editar",
              defaultMessage: "Editar"
            }),
            'deleteCommand': props.intl.formatMessage({
              id: "Comun.borrar",
              defaultMessage: "Borrar"
            }),
          }}
          width="200"
        />}
        <PagingPanel />
        <TableRowDetail
          contentComponent={RowDetail}
        />
        <PopupEditing id={id}
                      popupComponent={ExpandablePopup}
                      title={configuration.title}
                      formComponents={configuration.formComponents}
                      extraPostBody={configuration.extraPostBody} />
      </Grid>
      {loading && <Loading />}
    </Paper>
  );
};

ExpandableGrid.propTypes = {
  id: PropTypes.string.isRequired,
  responseKey: PropTypes.string.isRequired,
  enabled: PropTypes.bool,
  configuration: PropTypes.shape({
    title: PropTypes.string,
    query: PropTypes.arrayOf(PropTypes.shape({ // for the searching
      columnName: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })),
    columns: PropTypes.arrayOf(PropTypes.shape({ // for the grid
      name: PropTypes.string,
      title: PropTypes.string,
      hidden: PropTypes.bool
    })).isRequired,
    formComponents: PropTypes.array.isRequired, // for the forms
    extraPostBody: PropTypes.object // body for the POST
  })
};

export default compose(
  withSnackbar,
  injectIntl
)(ExpandableGrid);