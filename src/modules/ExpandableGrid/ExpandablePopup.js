/* eslint-disable no-shadow */
import React, {useEffect, useState} from "react";
import {bindActionCreators,compose} from "redux";
import {withSnackbar} from "notistack";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import {isEmpty} from "lodash";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {
  Plugin,
  Template,
  TemplateConnector,
  TemplatePlaceholder
} from "@devexpress/dx-react-core";

import GenericForm from "modules/GenericForm";
import {
  getErrorsByKey,
  getIsCreatedByKey,
  getIsUpdatedByKey,
  getLoadingByKey
} from "redux/grids/selectors";
import {
  addData,
  successfullyEdited,
  updateData
} from "redux/grids";
import {Loading} from "../ReactGrid/Loading";

export const ExpandablePopup = ({
                 row,
                 onChange,
                 onApplyChanges,
                 onCancelChanges,
                 open, loading
               }) => {

  const [formData ,setFormData] = useState({});
  const [submitFromOutside, setSubmitFromOutside] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const formComponents = [
    {
      placeHolder: "Telefóno",
      type: 'input',
      key: 'telefon',
      breakpoints: {
        xs: 12,
        md: 6
      },
      required: true,
      validationType: "string",
      validations:  [
        {
          type: "required",
          params: ["Este campo es obligatorio"]
        },
        {
          type: "nullable",
          params: [true]
        },
      ]
    },
    {
      placeHolder: "Fax",
      type: 'input',
      key: 'fax',
      breakpoints: {
        xs: 12,
        md: 6
      },
    },];

  useEffect(()=>{
    onChange(formData);
  },[formData]);

  const save = (e) => {
    setSubmitFromOutside(true);
    isValid && onApplyChanges(e);
  }

  useEffect(()=>{
    if(submitFromOutside)
      setSubmitFromOutside(false);
  },[submitFromOutside]);

  return (
    <Dialog open={open} onClose={onCancelChanges} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Employee Details</DialogTitle>
      <DialogContent>
        <GenericForm
          emptyPaper={true}
          containerSpacing={0}
          formComponents={formComponents}
          formData={row}
          setFormData={setFormData}
          submitFromOutside={submitFromOutside}
          handleIsValid={setIsValid}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancelChanges} color="primary">
          Cancel
        </Button>
        <Button disabled={!isValid || loading} onClick={save} color="primary">
          Save {loading && <Loading size={24} />}
        </Button>
      </DialogActions>
    </Dialog>
  )
};

// Ref - https://devexpress.github.io/devextreme-reactive/react/grid/docs/guides/editing-in-popup/
export const PopupEditingStateless = React.memo(({ popupComponent: ExpandablePopup, ...props }) => {

  /** Show errors */
  useEffect(()=>{
    if(!isEmpty(props.errors)){
      props.enqueueSnackbar(props.intl.formatMessage({
        id: "ReactGrid.error.algo_salio_mal",
        defaultMessage: "Ups! Algo ha salido mal :(",
      }), {variant: 'error'});
    }
  },[props.errors]);

  return(
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

          /** When service is called, these components are used */
          const CreatedState = () => {
            useEffect(()=>{
              if(props.created) {
                commitAddedRows({ rowIds });
                props.actions.success({key: props.id});
                props.enqueueSnackbar(props.intl.formatMessage({
                  id: "CreateUpdateForm.creacion_correcta",
                  defaultMessage: "Registro creado correctamente"
                }), {variant: 'success'});
              }
            },[props.created]);
            return (<></>);
          }

          const UpdatedState = () => {
            useEffect(()=>{
              if(props.updated) {
                stopEditRows({ rowIds });
                commitChangedRows({ rowIds });
                props.actions.success({key: props.id});
                props.enqueueSnackbar(props.intl.formatMessage({
                  id: "CreateUpdateForm.actualizacion_correcta",
                  defaultMessage: "Registro actualizado correctamente"
                }), {variant: 'success'});
              }
            },[props.updated]);
            return (<></>);
          }

          /** Service call */
          const rowIds = isNew ? [0] : editingRowIds;
          const applyChanges = () => {
            if (isNew) {
              props.actions.addData({key: props.id, data: editedRow});
            } else {
              const {id, ...data} = editedRow;
              props.actions.updateData({key: props.id, id, data});
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

          const open = (editingRowIds.length > 0 || isNew);
          return (
            <>
              <ExpandablePopup
                open={open}
                row={editedRow}
                onChange={processValueChange}
                onApplyChanges={applyChanges}
                onCancelChanges={cancelChanges}
                loading={props.loading}
              />
              <CreatedState />
              <UpdatedState />
            </>
          );
        }}
      </TemplateConnector>
    </Template>
    <Template name="root">
      <TemplatePlaceholder />
      <TemplatePlaceholder name="popupEditing" />
    </Template>
  </Plugin>
  )}
);

const mapStateToProps = (state, props) => {
  return {
    loading: getLoadingByKey(state, props.id),
    created: getIsCreatedByKey(state, props.id),
    updated: getIsUpdatedByKey(state, props.id),
    errors: getErrorsByKey(state, props.id),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    updateData: bindActionCreators(updateData, dispatch),
    addData: bindActionCreators(addData, dispatch),
    success: bindActionCreators(successfullyEdited, dispatch),
  };
  return { actions };
};


export const PopupEditing = compose(
  withSnackbar,
  injectIntl,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(PopupEditingStateless);