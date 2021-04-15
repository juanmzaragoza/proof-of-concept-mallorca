/* eslint-disable no-shadow */
import React, {useEffect, useState} from "react";
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

import GenericForm from "../GenericForm";

export const ExpandablePopup = ({
                 row,
                 onChange,
                 onApplyChanges,
                 onCancelChanges,
                 open,
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
        <Button disabled={!isValid} onClick={save} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
};

// Ref - https://devexpress.github.io/devextreme-reactive/react/grid/docs/guides/editing-in-popup/
export const PopupEditing = React.memo(({ popupComponent: ExpandablePopup }) => (
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

          const open = (editingRowIds.length > 0 || isNew);
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