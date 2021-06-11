import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import MuiGrid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

const states = [{ID: 1, name: 'nombre'}];

const DetailContent = ({ row, ...rest }) => {
  const {
    processValueChange,
    applyChanges,
    cancelChanges,
  } = rest;
  return (
    <MuiGrid container spacing={3}>
      <MuiGrid item xs={6}>
        <FormGroup>
          <TextField
            margin="normal"
            name="Prefix"
            label="Title"
            value={row.Prefix}
            onChange={processValueChange}
          />
          <TextField
            margin="normal"
            name="LastName"
            label="Last Name"
            value={row.LastName}
            onChange={processValueChange}
          />
          <FormControl margin="normal">
            <InputLabel id="select-helper-label">State</InputLabel>
            <Select
              name="StateID"
              value={row.StateID}
              onChange={processValueChange}
              labelId="select-helper-label"
            >
              {states.map(({ ID, Name }) => (
                <MenuItem key={ID} value={ID}>
                  {Name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </FormGroup>
      </MuiGrid>
      <MuiGrid item xs={6}>
        <FormGroup>
          <TextField
            margin="normal"
            name="FirstName"
            label="First Name"
            value={row.FirstName}
            onChange={processValueChange}
          />
          <TextField
            margin="normal"
            name="Position"
            label="Position"
            value={row.Position}
            onChange={processValueChange}
          />
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              label="Birth Date"
              margin="normal"
              value={row.BirthDate}
              onChange={(_, value) => processValueChange({
                target: { name: 'BirthDate', value: value.toDate() },
              })}
              format="MM/DD/YYYY"
            />
          </MuiPickersUtilsProvider>
        </FormGroup>
      </MuiGrid>
      <MuiGrid item xs={12}>
        <FormGroup>
          <TextField
            margin="normal"
            name="Notes"
            label="Notes"
            multiline
            rowsMax={4}
            value={row.Notes}
            onChange={processValueChange}
          />
        </FormGroup>
      </MuiGrid>
      <MuiGrid item xs={12}>
        <MuiGrid container spacing={3} justify="flex-end">
          <MuiGrid item>
            <Button onClick={applyChanges} variant="text" color="primary">
              Save
            </Button>
          </MuiGrid>
          <MuiGrid item>
            <Button onClick={cancelChanges} color="secondary">
              Cancel
            </Button>
          </MuiGrid>
        </MuiGrid>
      </MuiGrid>
    </MuiGrid>
  );
};

export default DetailContent;