import React, {useEffect, useState} from 'react';
import {withSnackbar} from "notistack";
import {injectIntl} from "react-intl";
import {bindActionCreators, compose} from "redux";
import {connect} from "react-redux";
import DataGrid,
{
  Scrolling,
  Pager,
  Paging,
  HeaderFilter,
  FilterRow,
  Column,
  Editing
} from 'devextreme-react/data-grid';

import {Loading} from "modules/shared/Loading";
import {
  getErrors,
  getLoading,
  getPageSize,
  getRows,
  getTotalCount
} from "redux/reactGrid/selectors";
import {deleteData, reset, searchData} from "redux/reactGrid";
import {isEmpty, unionBy} from "lodash";
import CustomStore from "devextreme/data/custom_store";
import Promise from "lodash/_Promise";


const allowedPageSizes = [5, 10, 'all'];
const ReactGrid = ({ configuration, enqueueSnackbar,
                     rows, loading, pageSize, totalCount, errors,
                     extraQuery, onClickRow,
                     actions, ...props }) => {

  const [columns] = useState(configuration.columns);
  const [currentPage, setCurrentPage] = useState(0);
  const [sorting, setSorting] = useState([]);
  const [filters, setFilters] = useState([]);

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
    key: 'codi',
    load: (loadOptions) => {
      return new Promise((resolve, reject) => {
        resolve({
          data: rows,
          totalCount: totalCount,
        })
      })
    },
  });

  const OPERATION_INDEX = 1;
  const REGEX_COLUMN_INDEX = 0;
  const filterValues = ({ column: {name: columnName}, value }) => {
    if(!value){
      setFilters(filters.filter(filter => filter.columnName !== columnName));
    } else{
      setFilters([...filters, {columnName, value }]);
    }
  };
  const operations = {
    filterValue: filterValues,
    selectedFilterOperation: filterValues,
    sortOrder: () => console.log("sort order op")
  }
  const handleOptionChanged = (e) => {
    // extract operation from fullName: "columns[1].filterValue"
    const operation = e.fullName.split('.')[OPERATION_INDEX];
    // extract index column
    const indexColumn = e.fullName.match(/\d+/)[REGEX_COLUMN_INDEX];
    // get column from the indexColumn
    const column = columns[indexColumn];
    const value = e.value;
    operations[operation] && operations[operation]({ column, value });
  }

  return (
    <React.Fragment>
      <DataGrid
        id='gridContainer'
        dataSource={store}
        showBorders={true}
        columnAutoWidth={true}
        remoteOperations={true}
        onOptionChanged={handleOptionChanged}
      >
        <HeaderFilter visible={true} allowSearch={true} />
        <FilterRow visible={true} />

        {columns.map((column,key) => {
          return <Column
            key={key}
            caption={column.title}
            dataField={column.name}
            calculateCellValue={column.getCellValue}
            filterOperations={['contains']} />
        })}
        <Editing
          mode="row"
          allowAdding
          allowDeleting
          allowUpdating />

        <Scrolling rowRenderingMode='virtual'></Scrolling>
        <Paging
          defaultPageSize={pageSize}
          onPageIndexChange={setCurrentPage}  />
        <Pager
          visible={true}
          allowedPageSizes={allowedPageSizes}
          displayMode={'full'}
          showPageSizeSelector={false}
          showInfo={true}
          infoText="Página {0} de {1} (Total {2} elementos)"
          showNavigationButtons={true} />
      </DataGrid>
      {loading && <Loading />}
    </React.Fragment>
  )
}

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