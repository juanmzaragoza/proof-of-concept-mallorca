import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {withSnackbar} from "notistack";
import {injectIntl} from "react-intl";
import {bindActionCreators, compose} from "redux";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import {isEmpty, unionBy} from "lodash";
import Promise from "lodash/_Promise";
import DataGrid,
{
  Scrolling,
  Pager,
  Paging,
  HeaderFilter,
  FilterRow,
  Column,
  Editing,
  Button
} from 'devextreme-react/data-grid';
import CustomStore from "devextreme/data/custom_store";

import {
  getErrors,
  getLoading,
  getPageSize,
  getRows,
  getTotalCount
} from "redux/reactGrid/selectors";
import {
  deleteData,
  reset,
  searchData,
  updateData
} from "redux/reactGrid";
import {Loading} from "modules/shared/Loading";
import LOVCellComponent from "./LOVCellComponent";
import './styles.scss';

const ReactGrid = ({ configuration, enqueueSnackbar,
                     rows, loading, pageSize, totalCount, errors,
                     extraQuery, onClickRow,
                     actions, ...props }) => {

  const history = useHistory();
  const [columns] = useState(configuration.columns);
  const [currentPage, setCurrentPage] = useState(0);
  const [sorting, setSorting] = useState([]);
  const [filters, setFilters] = useState([]);

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
  },[extraQuery]);

  useEffect(()=>{
    if(!isEmpty(errors)){
      enqueueSnackbar(props.intl.formatMessage({
        id: "ReactGrid.error.algo_salio_mal",
        defaultMessage: "Ups! Algo ha salido mal :("
      }), {variant: 'error'});
    }
  },[errors]);

  const store = new CustomStore({
    key: 'id',
    load: (loadOptions) => {
      return new Promise((resolve, reject) => {
        resolve({
          data: rows,
          totalCount: totalCount,
        })
      })
    },
    update: (key, values) => {
      const row = rows.find(row => row.id === key);
      if(row){
        const changedRow = { ...row, ...values };
        actions.updateData({ key: props.id, id: row.id, data: changedRow });
      }
    }
  });

  /**
   * Handler to filter and sorting
   */
  const OPERATION_INDEX = 1;
  const REGEX_COLUMN_INDEX = 0;
  const filterValues = ({ column: {name: columnName}, value }) => {
    if(!value){
      setFilters(filters.filter(filter => filter.columnName !== columnName));
    } else{
      const filterElement = {columnName,value};
      const index = filters.findIndex(filter => filter.columnName === columnName);
      if(index > -1){
        const oldFilters = filters;
        oldFilters[index] = filterElement;
        setFilters([...oldFilters]);
      } else{
        setFilters([...filters, filterElement]);
      }
    }
  };
  const operations = {
    filterValue: filterValues,
    selectedFilterOperation: filterValues,
    sortOrder: ({ column: {name: columnName}, value }) => {
      // only one sorting at the same time
      setSorting([{columnName, direction: value }]);
    }
  }
  const handleOptionChanged = (e) => {
    // extract operation from fullName: "columns[1].filterValue"
    const operation = e.fullName.split('.')[OPERATION_INDEX];
    const regexResult = e.fullName.match(/\d+/);
    if(operation && regexResult){
      // extract index column
      const indexColumn = regexResult[REGEX_COLUMN_INDEX];
      // get column from the indexColumn
      const column = columns[indexColumn];
      const value = e.value;
      operations[operation] && operations[operation]({ column, value });
    }
  }

  return (
    <React.Fragment>
      <DataGrid
        id='gridContainer'
        keyExpr="id"
        dataSource={store}
        showBorders={true}
        columnAutoWidth={true}
        remoteOperations={true}
        rowAlternationEnabled={true}
        showRowLines={true}
        focusedRowEnabled={true}
        onOptionChanged={handleOptionChanged}
      >
        {!configuration.disabledFiltering && <HeaderFilter visible={false} />}
        {!configuration.disabledFiltering && <FilterRow visible={true} />}

        {columns.map((column,key) => {
          const extraProps = {};
          if(column.field && column.field.type === 'LOV'){
            const LOVCellComponentWithField = (props) => <LOVCellComponent field={column.field} {...props} />;
            extraProps['editCellComponent'] = LOVCellComponentWithField;
          }
          return <Column
            key={key}
            caption={column.title}
            dataField={column.name}
            calculateCellValue={column.getCellValue}
            filterOperations={['contains']}
            allowEditing={!column.inlineEditionDisabled}
            {...extraProps}
          />
        })}
        {!configuration.disabledActions && <Column type="buttons" width={90}>
          <Button icon="edit" onClick={e => history.push(`${history.location.pathname}/${e.row.data.id}`)}/>
          <Button icon="trash" onClick={e => deleteData(e.row.data)} />
        </Column>}

        {configuration.enableInlineEdition && <Editing
          allowUpdating={true}
          allowDeleting={true}
          mode="cell" />}

        <Scrolling rowRenderingMode='virtual'></Scrolling>
        <Paging
          defaultPageSize={pageSize}
          onPageIndexChange={setCurrentPage}  />
        <Pager
          visible={true}
          displayMode={'full'}
          showPageSizeSelector={false}
          showInfo={true}
          infoText={props.intl.formatMessage({
            id: "ReactGrid.paginado.info",
            defaultMessage: "Página {0} de {1} (Total {2} elementos)"
          })}
          showNavigationButtons={true} />
      </DataGrid>
      {loading && <Loading />}
    </React.Fragment>
  )
}

ReactGrid.propTypes = {
  id: PropTypes.string.isRequired,
  configuration: PropTypes.shape({
    columns: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      title: PropTypes.string,
      getCellValue: PropTypes.func,
      inlineEditionDisabled: PropTypes.bool,
      field: PropTypes.any
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
  connect(mapStateToProps, mapDispatchToProps)
)(ReactGrid);