/* eslint-disable no-shadow */
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React, {useEffect, useState} from "react";
import GenericForm from "../GenericForm";

const ExpandablePopup = ({
                 row,
                 onChange,
                 onApplyChanges,
                 onCancelChanges,
                 open,
               }) => {

  const [formData ,setFormData] = useState({});

  const formComponents = [
    {
      placeHolder: "Telefóno",
      type: 'input',
      key: 'telefon',
      breakpoints: {
        xs: 12,
        md: 6
      },
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

  return (
    <Dialog open={open} onClose={onCancelChanges} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Employee Details</DialogTitle>
      <DialogContent>
        <GenericForm
          emptyPaper={true}
          formComponents={formComponents}
          formData={row}
          setFormData={setFormData}
          containerSpacing={0} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancelChanges} color="primary">
          Cancel
        </Button>
        <Button onClick={onApplyChanges} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
};

export default ExpandablePopup;