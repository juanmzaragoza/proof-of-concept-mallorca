import React, {useEffect, useState} from 'react';
import {compose} from "redux";
import {injectIntl} from "react-intl";
import PropTypes from "prop-types";
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
import {PopupEditing, ExpandablePopup} from "./ExpandablePopup";

//TODO() apply intl
const RowDetail = ({ row }) => (
  <ExpandableContent data={row} columns={[
    {name: 'codi', title: 'Código'},
    {name: 'codiPostal', title: 'Código Postal', func: (cod) => cod.description},
    {name: 'nomAdresaComercial', title: 'Dirección Comercial'},
    {name: 'proveidor', title: 'Proveedor', func: (prov) => prov.description},
  ]} />
);

const getRowId = row => row.id;
const ExpandableGrid = ({ id, enabled = false, configuration,
                          enqueueSnackbar,
                          rows, totalCount, pageSize, loading, refreshData,
                          actions, ...props}) => {
  const [columns] = useState(configuration.columns);
  const [expandedRowIds, setExpandedRowIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [query] = useState([{columnName: 'proveidor.id', value: '"eyJpZGVudGlmaWNhZG9yQ29kaSI6IkxJTSIsImNvZGkiOiIwMDkwMzkifQ=="'}]);

  const doRequest = () => {
    actions.loadData({key: id, page: currentPage, query});
  }
  useEffect(()=>{
    refreshData && enabled && doRequest();
  },[refreshData]);

  useEffect(() =>{
    enabled && doRequest();
  },[enabled, currentPage]);

  const commitChanges = ({ added, changed, deleted }) => {
    if (added) {}
    if (changed) {}
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
        <PopupEditing id={id} popupComponent={ExpandablePopup} formComponents={configuration.formComponents} />
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
    })).isRequired,
    formComponents: PropTypes.array.isRequired
  })
};

export default compose(
  withSnackbar,
  injectIntl
)(ExpandableGrid);