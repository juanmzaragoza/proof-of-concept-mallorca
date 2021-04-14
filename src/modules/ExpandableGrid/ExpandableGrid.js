import React, {useEffect, useState} from 'react';
import {compose} from "redux";
import {injectIntl} from "react-intl";
import PropTypes from "prop-types";
import MomentUtils from '@date-io/moment';
import {
  Plugin,
  Template,
  TemplateConnector,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import {
  CustomPaging,
  EditingState,
  PagingState,
  RowDetailState,
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
import {Loading} from "../ReactGrid/Loading";
import ExpandableContent from "./ExpandableContent";
import {codiPostal} from "../../redux/api";
import ExpandablePopup from "./ExpandablePopup";

//TODO() apply intl
const RowDetail = ({ row }) => (
  <ExpandableContent data={row} columns={[
    {name: 'codi', title: 'Código'},
    {name: 'codiPostal', title: 'Código Postal', func: (cod) => cod.description},
    {name: 'nomAdresaComercial', title: 'Dirección Comercial'},
    {name: 'proveidor', title: 'Proveedor', func: (prov) => prov.description},
  ]} />
);

// Ref - https://devexpress.github.io/devextreme-reactive/react/grid/docs/guides/editing-in-popup/
const PopupEditing = React.memo(({ popupComponent: ExpandablePopup }) => (
  <Plugin>
    <Template name="popupEditing">
      <TemplateConnector>
        {(
          {
            rows,
            getRowId,
            addedRows,
            editingRowIds,
            createRowChange,
            rowChanges,
          },
          {
            changeRow, changeAddedRow, commitChangedRows, commitAddedRows,
            stopEditRows, cancelAddedRows, cancelChangedRows,
          },
        ) => {
          const isNew = addedRows.length > 0;
          let editedRow;
          let rowId;
          if (isNew) {
            rowId = 0;
            editedRow = addedRows[rowId];
          } else {
            [rowId] = editingRowIds;
            const targetRow = rows.filter(row => getRowId(row) === rowId)[0];
            editedRow = { ...targetRow, ...rowChanges[rowId] };
          }

          /**
           *  When change the formData object of values
           **/
          const processValueChange = (value) => {
            let changeArgs = {
              rowId,
              change: () => {},
            };
            Object.keys(value).map(key => {
              changeArgs = {
                ...changeArgs,
                change: createRowChange(editedRow, value[key], key),
              };
              if (isNew) {
                changeAddedRow(changeArgs);
              } else {
                changeRow(changeArgs);
              }
            })
          };
          const rowIds = isNew ? [0] : editingRowIds;
          const applyChanges = () => {
            if (isNew) {
              commitAddedRows({ rowIds });
            } else {
              stopEditRows({ rowIds });
              commitChangedRows({ rowIds });
            }
          };
          const cancelChanges = () => {
            if (isNew) {
              cancelAddedRows({ rowIds });
            } else {
              stopEditRows({ rowIds });
              cancelChangedRows({ rowIds });
            }
          };

          const open = editingRowIds.length > 0 || isNew;
          return (
            <ExpandablePopup
              open={open}
              row={editedRow}
              onChange={processValueChange}
              onApplyChanges={applyChanges}
              onCancelChanges={cancelChanges}
            />
          );
        }}
      </TemplateConnector>
    </Template>
    <Template name="root">
      <TemplatePlaceholder />
      <TemplatePlaceholder name="popupEditing" />
    </Template>
  </Plugin>
));

const getRowId = row => row.id;
const ExpandableGrid = ({ id, enabled = false, configuration,
                          enqueueSnackbar,
                          rows, totalCount, pageSize, loading, refreshData,
                          actions, ...props}) => {
  const [columns] = useState(configuration.columns);
  const [expandedRowIds, setExpandedRowIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(()=>{
    refreshData && enabled && actions.loadData({key: id, page: currentPage});
  },[refreshData]);

  useEffect(() =>{
    enabled && actions.loadData({key: id, page: currentPage});
  },[enabled, currentPage]);

  const commitChanges = ({ added, changed, deleted }) => {
    if (added) {
      //TODO() think about update multiple at same time
      actions.addData({key: id, data: added[0]});
    }
    if (changed) {
      //TODO() think about update multiple at same time
      const data = rows.find(row => !!changed[row.id]);
      actions.updateData({key: id, data: changed[data.id]});
    }
    if(deleted) {
      //TODO() change this if we allow to delete multiples
      actions.deleteData({key: id, id: deleted[0]});
    }
  };

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
        <Table />
        <TableHeaderRow />
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
        />
        <PagingPanel />
        <TableRowDetail
          contentComponent={RowDetail}
        />
        <PopupEditing popupComponent={ExpandablePopup} />
      </Grid>
      {loading && <Loading />}
    </Paper>
  );
};

ExpandableGrid.propTypes = {
  id: PropTypes.string.isRequired,
  enabled: PropTypes.bool,
  configuration: PropTypes.shape({
    columns: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      title: PropTypes.string
    })).isRequired
  })
};

export default compose(
  withSnackbar,
  injectIntl
)(ExpandableGrid);