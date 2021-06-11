import React, {useEffect, useState} from 'react';
import classNames from 'clsx';
import { isEmpty } from 'lodash';
import Paper from '@material-ui/core/Paper';
import {CustomPaging, EditingState, PagingState, RowDetailState} from '@devexpress/dx-react-grid';
import {
  Grid, PagingPanel,
  Table,
  TableHeaderRow,
  TableInlineCellEditing, TableRowDetail,
  Toolbar,
} from '@devexpress/dx-react-grid-material-ui';
import GenericForm from "../GenericForm";

const getRowId = row => row.id;

const FocusableCell = ({ onClick, ...restProps }) => {
  return <Table.Cell {...restProps} tabIndex={0} onFocus={(e) => {console.log(e); onClick(e);}}/>
};

const InlineGrid = (props) => {
  const [expandedRowIds, setExpandedRowIds] = useState([]);
  const [columns] = useState([
    { name: 'name', title: 'Name' },
    { name: 'gender', title: 'Gender' },
    { name: 'city', title: 'City' },
    { name: 'car', title: 'Car' },
  ]);
  const [rows, setRows] = useState([
    {id: 1, name: 'Juanito', gender: 'Male', city: 'Buenos Aires', car: 'None'},
    {id: 2, name: 'Pedrin', gender: 'Male', city: 'Mallorca', car: 'Audi'},
  ]);
  const [editedCells, setEditedCells] = useState([]);

  const RowDetail = ({ row }) => (
    <GenericForm
      setFormData={() => {}}
      getFormData={() => {}}
      formComponents={[
        {
          placeHolder: 'Ejemplo',
          type: 'input',
          key: 'driprfcmp1',
          breakpoints: {
            xs: 12,
            md: 4
          },
        },
        {
          placeHolder: 'Ejemplo 2',
          type: 'input',
          key: 'driprfcmp3',
          breakpoints: {
            xs: 12,
            md: 4
          },
        },
        {
          placeHolder: 'Ejemplo 3',
          type: 'input',
          key: 'driprfcmp2',
          breakpoints: {
            xs: 12,
            md: 4
          },
        },
        {
          placeHolder: "Textarea ejemplo",
          type: 'input',
          key: 'observacions',
          breakpoints: {
            xs: 12,
            md: 12
          },
          text: {
            multiline: 4
          }
        }
      ]}
      //submitFromOutside={submitFromOutside}
      //onSubmit={(data) => handleSubmit(data)}
      fieldsContainerStyles={{padding: '10px 40px 40px 40px'}}
      //formDataLoaded={props.formDataLoaded}
    />
  );

  const commitChanges = ({ added, changed, deleted }) => {
    console.log(changed)
    let changedRows;
    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      changedRows = rows.map(row => {
        //setExpandedRowIds(changed[row.id]? [row.id]:[]);
        if(changed[row.id]){
          const changedRow = { ...row, ...changed[row.id] };
          window.alert("Llamar a servicio con:"+JSON.stringify(changedRow));
          return changedRow;
        } else{
          return row;
        }
      });
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = rows.filter(row => !deletedSet.has(row.id));
    }
    setRows(changedRows);
  };

  const addEmptyRow = () => {
    commitChanges({ added: [{}] });
  }

  const [jumpRow, setJumpRow] = useState(false);
  const InlineCellEditing = ({onKeyDown, ...props}) => {
    console.log(props)
    const handleOnKeyDown = (e) => {
      if(e.code === "Enter"){
        //addEmptyRow();
        //console.log(editedCells, parseInt(editedCells[0].rowId)+1, [{...editedCells[0], rowId: parseInt(editedCells[0].rowId)+1}])
        setEditedCells([{...editedCells[0], rowId: editedCells[0].rowId+1}]);
        setJumpRow(true);
        const {id, ...restRow} = rows[rows.length-1];
        if(props.tableRow.rowId === id
          && !isEmpty(restRow)){
          addEmptyRow();
        }
        //commitChanges({changed: {[props.row.id]: {[props.column.name]: props.value}}})
      }
    }

    return <TableInlineCellEditing.Cell onKeyDown={handleOnKeyDown} {...props} />
  }

  return (
    <Paper>
      <Grid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
      >
        <EditingState onCommitChanges={commitChanges}
                      editingCells={editedCells}
                      onEditingCellsChange={(editingCells) => {
                        //!expandedRowIds.length && setExpandedRowIds(editingCells.map(cell => cell.rowId));
                        //console.log(editingCells[0]?.rowId === 2 && editingCells[0].columnName === 'car')
                        console.log(editingCells)
                        if(jumpRow){
                          setJumpRow(false);
                          editingCells.length && setEditedCells(editingCells);
                        } else {
                          setEditedCells(editingCells);
                        }
                      }} />
        <RowDetailState
          expandedRowIds={expandedRowIds}
          onExpandedRowIdsChange={setExpandedRowIds}
        />
        <PagingState
          currentPage={0}
          onCurrentPageChange={() => {}}
          pageSize={10}
        />
        <CustomPaging
          totalCount={20}
        />
        <Table cellComponent={FocusableCell} />
        <TableHeaderRow />
        <TableInlineCellEditing selectTextOnEditStart cellComponent={InlineCellEditing} />
        <TableRowDetail
          contentComponent={RowDetail}
        />
        <PagingPanel />
      </Grid>
    </Paper>
  );
}

export default InlineGrid;