import React, {useState} from "react";

import {FormControl, InputLabel, ListItemIcon, Select} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import {Domain} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  enterpriseSelector: {
    minWidth: '180px',
    marginRight: '10px',
    color: 'white'
  },
  enterpriseSelectorLabel: {
    color: 'white',
    fontWeight: '600',
    marginTop: '5px',
  },
  enterpriseSelectorSelect: {
    '&:before': {
      borderColor: 'white',
    },
    '&:after': {
      borderColor: 'white',
    },
    marginTop: '5px',
    marginBottom: '15px',
    color: 'white'
  },
  enterpriseSelectorIcon: {
    fill: 'white'
  },
}));

const EnterpriseGroupSelect = (props) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.enterpriseSelector}>
      <InputLabel className={classes.enterpriseSelectorLabel} htmlFor="grouped-select">Enterprise's Group</InputLabel>
      <Select
        className={classes.enterpriseSelectorSelect}
        defaultValue=""
        id="grouped-select"
        inputProps={{
          classes: {
            icon: classes.enterpriseSelectorIcon
          },
        }}
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left"
          },
          getContentAnchorEl: null
        }}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={1}>
          <ListItemIcon>
            <Domain fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Aguilo Emp</Typography>
        </MenuItem>
        <MenuItem value={2}>Aguilo Emp</MenuItem>
        <MenuItem value={3}>
          <ListItemIcon>
            <Domain fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Limit</Typography>
        </MenuItem>
        <MenuItem value={4}>Limit Tecnologies</MenuItem>
        <MenuItem value={5}>LIMIT TECNOLOGIES S.L.</MenuItem>
        <MenuItem value={6}>Test</MenuItem>
      </Select>
    </FormControl>
  );
};

export default EnterpriseGroupSelect;