import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import { withSnackbar } from "notistack";
import { injectIntl } from "react-intl";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { isEmpty, unionBy } from "lodash";
import DataGrid, {
  Pager,
  Paging,
  HeaderFilter,
  FilterRow,
  Column,
  Editing,
  Button,
  MasterDetail,
  Selection,
  AsyncRule,
  Lookup,
  LoadPanel
} from "devextreme-react/data-grid";
import CustomStore from "devextreme/data/custom_store";

import {
  getErrors,
  getLoading,
  getPageSize,
  getRows,
  getTotalCount,
} from "redux/reactGrid/selectors";
import {
  deleteData,
  resetGrid,
  searchData,
  updateData,
  createData,
} from "redux/reactGrid";
import { Loading } from "modules/shared/Loading";
import LOVCellComponent from "./LOVCellComponent";

import "./styles.scss";
import createYupSchema from "../GenericForm/yupSchemaCreator";
import * as yup from "yup";

const loadPanelPosition = { of: '#gridContainer' };

const ReactGrid = React.memo(
  ({
    configuration,
    enqueueSnackbar,
    rows,
    loading,
    pageSize,
    totalCount,
    errors,
    extraQuery = [],
    onClickRow,
    actions,
    ...props
  }) => {
    const history = useHistory();
    const dataGrid = useRef(null);
    const [columns, setColumns] = useState(configuration.columns);
    const [currentPage, setCurrentPage] = useState(0);
    const [sorting, setSorting] = useState([]);
    const [filters, setFilters] = useState([]);
    const [expandedRow, setExpandedRow] = useState(null);

    const [expandedData, setExpandedData] = useState({});
    const [store, setStore] = useState(null);

    const [columnNameChanged, setColumnNameChanged] = useState(null);

    const deleteData = (row) => {
      actions.deleteData({ key: props.id, id: row.id });
    };

    const loadData = () => {
      const query =
        unionBy(extraQuery || [], filters, (filter) => filter.columnName) || [];
      const method = configuration.method;
      const body = configuration.body;
      actions.loadData({
        apiId: props.id,
        method,
        body,
        key: configuration.listKey,
        page: currentPage,
        query,
        sorting,
      });
    };

    useEffect(() => {
      return () => actions.reset();
    }, []);

    // executed when mounts component and when vars change
    useEffect(() => {
      loadData();
    }, [
      currentPage,
      JSON.stringify(sorting),
      JSON.stringify(filters),
      JSON.stringify(extraQuery),
    ]);

    // if the filters change
    useEffect(() => {
      setCurrentPage(0);
    }, [JSON.stringify(filters), JSON.stringify(extraQuery)]);

    useEffect(() => {
      if (!isEmpty(errors)) {
        enqueueSnackbar(
          props.intl.formatMessage({
            id: "ReactGrid.error.algo_salio_mal",
            defaultMessage: "Ups! Algo ha salido mal :(",
          }),
          { variant: "error" }
        );
      }
    }, [errors]);

    useEffect(() => {
      const customStore = new CustomStore({
        key: "id",
        load: (loadOptions) => {
          return new Promise((resolve, reject) => {
            resolve({
              data: rows,
              totalCount: totalCount,
            });
          });
        },
        update: (key, values) => {
          const changedRow = updateRow(key, values);
          if (changedRow) {
            actions.updateData({
              key: props.id,
              id: changedRow.id,
              data: changedRow,
            });
            expandedData && setExpandedData(changedRow);
          }
        },
        insert: (values) => {
          actions.createData({
            key: props.id,
            data: { ...values, ...(configuration.extraPostBody || {}) },
          });
        },
      });
      setStore(customStore);
    }, [JSON.stringify(rows), totalCount]);

    const updateRow = (key, values) => {
      let changedRow = null;
      const row = rows.find((row) => row.id === key);
      if (row) {
        changedRow = { ...row, ...values };
      }
      return changedRow;
    };

    /**
     * Handler to filter and sorting
     */
    const OPERATION_INDEX = 1;
    const REGEX_COLUMN_INDEX = 0;
    const filterValues = (e) => {
      const { column: { name: columnName }, value } = e;
      setColumnNameChanged(columnName);
      if (!value) {
        setFilters(
          filters.filter((filter) => filter.columnName !== columnName)
        );
      } else {
        const filterElement = { columnName, value };
        const index = filters.findIndex(
          (filter) => filter.columnName === columnName
        );
        if (index > -1) {
          const oldFilters = filters;
          oldFilters[index] = filterElement;
          setFilters([...oldFilters]);
        } else {
          setFilters([...filters, filterElement]);
        }
      }
    };
    const operations = {
      filterValue: filterValues,
      selectedFilterOperation: filterValues,
      sortOrder: ({ column: { name: columnName }, value }) => {
        // only one sorting at the same time
        setSorting([{ columnName, direction: value }]);
      },
    };
    const handleOptionChanged = (e) => {
      // extract operation from fullName: "columns[1].filterValue"
      const operation = e.fullName.split(".")[OPERATION_INDEX];
      const regexResult = e.fullName.match(/\d+/);
      if (operation && regexResult) {
        // extract index column
        const indexColumn = regexResult[REGEX_COLUMN_INDEX];
        // get column from the indexColumn
        const column = columns[indexColumn];
        const value = e.value;
        operations[operation] && operations[operation]({ column, value });
      }
    };

    const isExpandableEnabled = !!configuration.enableExpandableContent;
    const changeExpanded = (key = null, data = {}) => {
      setExpandedData(data);
      setExpandedRow(key);
    };
    const expandableOptions = isExpandableEnabled
      ? {
          onSelectionChanged: (e) => {
            e.component.collapseAll(-1);
            changeExpanded();
          },
          onFocusedRowChanged: (e) => {
            e.component.collapseAll(-1);
            if (e.row && !expandedRow) {
              e.component.expandRow(e.row.key);
              changeExpanded(e.row.key, e.row.data);
            } else {
              changeExpanded();
            }
          },
          //onRowCollapsed: (e) => {},
        }
      : {};

    const collapseAllRows = useCallback(() => {
      dataGrid.current.instance.collapseAll(-1);
      changeExpanded();
    }, [dataGrid, expandedRow, expandedData]);

    /** This component is like a decorator that adds properties to children */
    const ExpandableContent = () => {
      return props.children({
        ...props,
        row: expandedData,
        onCancel: () => {
          collapseAllRows();
        },
        onSuccess: (updatedData) => {
          collapseAllRows();
          setExpandedData(updatedData);
          loadData();
        },
      });
    };

    const handleValidation = (params) => {
      const {
        value,
        column: { name },
      } = params;
      //TODO(): i'm not very sure about how it's implemented
      const component = columns
        .map((column) => column.field)
        .find((comp) => comp && comp.key === name);
      if (component) {
        const schema = createYupSchema({}, { ...component, id: component.key });
        const validateSchema = yup.object().shape(schema);

        return new Promise((resolve, reject) => {
          validateSchema
            .validate({ [component.key]: value })
            .then((value) => {
              resolve(value);
            })
            .catch((e) => {
              reject(e.errors.join(" | "));
            });
        });
      }
      return new Promise((resolve, reject) => {
        resolve(true);
      });
    };

    const onSaving = React.useCallback((e) => {
      if(e.changes[0].type === 'insert'){
        const data = e.changes[0].data;
        e.cancel = true;
        e.promise = saveMiddleware( {
          id: props.id,
          data: {...data, ...(configuration.extraPostBody || {})},
        });
      }
    }, []);
    const saveMiddleware = async ({ id, data }) => {
      try {
        const result = await actions.createData({ key: id, data });
        dataGrid.current.instance.cancelEditData();
        return result;
      } catch ({ response: {status, data: body}}) {
        if (status === 400 && body.errors) {
          const errors = [];
          for (const err of body.errors) {
            errors.push(`${err.field}: ${err.defaultMessage}`)
          }
          throw props.intl.formatMessage({
            id: "Comun.error.revise_campos",
            defaultMessage: "Revise estos campos. ",
          })+errors.join(', ');
        }
      }
    }

    let editorElement = undefined;
    return (
      <React.Fragment>
        <LoadPanel
          position={loadPanelPosition}
          visible={loading}
        />
        <DataGrid
          id={`gridContainer`}
          ref={dataGrid}
          dataSource={store}
          showBorders={true}
          columnAutoWidth={true}
          remoteOperations={true}
          rowAlternationEnabled={true}
          showRowLines={true}
          focusedRowEnabled={true}
          onOptionChanged={handleOptionChanged}
          repaintChangesOnly={true}
          onInitNewRow={(e) => {
            // on init creation: disable field for creation
            const cols = configuration.columns.map((column) => ({
              ...column,
              inlineEditionDisabled: !!column.inlineCreationDisabled,
            }));
            setColumns(cols);
          }}
          onSaved={(e) => {
            // on finish creation: disable field for edition
            const cols = configuration.columns.map((column) => ({
              ...column,
              inlineEditionDisabled: !!column.inlineEditionDisabled,
            }));
            setColumns(cols);
          }}
          onSaving={onSaving}
          // focus when filtering
          // ref: https://supportcenter.devexpress.com/ticket/details/t357309/dxdatagrid-how-to-focus-filter-row-cell-after-create-grid#
          onCellPrepared={(e) => {
            const hasChanged = e.column.name === columnNameChanged;
            if (e.rowType === "filter" && hasChanged) {
              const cellElement = e.cellElement;
              editorElement = cellElement.querySelector(".dx-texteditor-input");
            }
          }}
          onContentReady={(e)=>{
            editorElement && editorElement.focus();
          }}
          {...expandableOptions}
        >
          {!configuration.disabledFiltering && <HeaderFilter visible={false} />}
          {!configuration.disabledFiltering && <FilterRow visible={true} />}

          {columns.map((column, key) => {
            const extraProps = {};
            if (column.field && column.field.type === "LOV") {
              const LOVCellComponentWithField = (props) => (
                <LOVCellComponent field={column.field} {...props} />
              );
              extraProps["editCellComponent"] = LOVCellComponentWithField;
            }


            return (
              <Column
                key={key}
                caption={column.title}
                dataField={column.name}
                cellRender={(cell) => {
                  const {
                    column: { name },
                    data,
                  } = cell;
                  return (
                    <Fragment>
                      {column.getCellValue
                        ? column.getCellValue(data)
                        : data[name]}
                    </Fragment>
                  );
                }}
                filterOperations={["contains"]}
                allowEditing={!column.inlineEditionDisabled}
                dataType={column.field?.type === "date" ? "date" : ""}
                allowFiltering={
                  column.allowFilter === undefined ? true : column.allowFilter
                }
                {...extraProps}
              >
                {column.field?.type === "select" && (
                  <Lookup
                    dataSource={column.field.selector.options}
                    valueExpr="value"
                    displayExpr="label"
                  />
                )}
                <AsyncRule validationCallback={handleValidation} />
              </Column>
            );
          })}
          {!configuration.disabledActions && (
            <Column type="buttons" width={90}>
              {!configuration.disabledUpdate && (
                <Button
                  icon="edit"
                  onClick={(e) =>
                    history.push(
                      `${history.location.pathname}/${e.row.data.id}`
                    )
                  }
                />
              )}
              {!configuration.disabledDelete && (
                <Button icon="trash" onClick={(e) => deleteData(e.row.data)} />
              )}
            </Column>
          )}
          <Selection mode="single" />
          <MasterDetail
            enabled={isExpandableEnabled}
            component={() => isExpandableEnabled && <ExpandableContent />}
          />

          {configuration.enableInlineEdition && (
            <Editing
              allowAdding={true}
              allowUpdating={true}
              allowDeleting={!configuration.disabledDelete}
              mode="cell"
            />
          )}

          <Paging
            pageSize={pageSize}
            defaultPageSize={10}
            onPageIndexChange={setCurrentPage}
          />
          <Pager
            visible={true}
            displayMode={"full"}
            showPageSizeSelector={false}
            showInfo={true}
            infoText={props.intl.formatMessage({
              id: "ReactGrid.paginado.info",
              defaultMessage: "Página {0} de {1} (Total {2} elementos)",
            })}
            showNavigationButtons={true}
          />
        </DataGrid>
        {loading && <Loading />}
      </React.Fragment>
    );
  },
  (oldProps, newProps) => JSON.stringify(oldProps) === JSON.stringify(newProps)
);

ReactGrid.propTypes = {
  id: PropTypes.string.isRequired,
  configuration: PropTypes.shape({
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        title: PropTypes.string,
        getCellValue: PropTypes.func,
        inlineEditionDisabled: PropTypes.bool,
        inlineCreationDisabled: PropTypes.bool,
        field: PropTypes.any,
      })
    ),
    listKey: PropTypes.string.isRequired,
    enableInlineEdition: PropTypes.bool,
    // it disables all the actions
    disabledActions: PropTypes.bool,
    // it disables each independent action
    disabledUpdate: PropTypes.bool,
    disabledDelete: PropTypes.bool,
    disabledFiltering: PropTypes.bool,
    enableExpandableContent: PropTypes.bool,
    method: PropTypes.oneOf(["post", "put", "patch"]),
    body: PropTypes.object,
    extraPostBody: PropTypes.object,
  }),
  extraQuery: PropTypes.arrayOf(
    PropTypes.shape({
      columnName: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
};

const mapStateToProps = (state, props) => {
  return {
    rows: getRows(state, props.id),
    totalCount: getTotalCount(state, props.id),
    loading: getLoading(state, props.id),
    pageSize: getPageSize(state, props.id),
    errors: getErrors(state, props.id),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    createData: bindActionCreators(createData, dispatch),
    updateData: bindActionCreators(updateData, dispatch),
    loadData: bindActionCreators(searchData, dispatch),
    deleteData: bindActionCreators(deleteData, dispatch),
    reset: bindActionCreators(() => resetGrid({ gridId: props.id }), dispatch),
  };
  return { actions };
};

export default compose(
  withSnackbar,
  injectIntl,
  connect(mapStateToProps, mapDispatchToProps)
)(ReactGrid);
