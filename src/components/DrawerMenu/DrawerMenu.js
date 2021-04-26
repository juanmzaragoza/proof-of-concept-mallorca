import React from "react";
import {useHistory} from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import {makeStyles, useTheme} from "@material-ui/core/styles";

import modules from "modules";
import {Loading} from "../../modules/shared/Loading";

import {drawerWidth} from "../../constants/styles";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    height: '90px'
  },
}));

const DrawerMenu = ({loading, functionalities,...props}) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={props.open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={props.handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      {loading? <Loading />:<List>
        {modules
          .filter(module => module.routeProps)
          .map(module => (
            <ListItem button key={module.name} onClick={() => history.push(module.routeProps.path)}>
              <ListItemIcon>{module.icon}</ListItemIcon>
              <ListItemText primary={module.name} />
            </ListItem>
          ))
        }
      </List>}
      <Divider />
    </Drawer>
  )
}

export default DrawerMenu;