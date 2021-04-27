import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import clsx from "clsx";

import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import LocalMall from "@material-ui/icons/LocalMall";

import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Collapse from '@material-ui/core/Collapse';

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
    height: '90px'
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  justifySpaceBetween: {
    justifyContent: 'space-between',
  },
  drawerTitle: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 'large'
  },
  nested: {
    paddingLeft: theme.spacing(2),
  },
}));

const routes = [
  {
    key: 'FAC_CP',
    title: 'FAC_CP',
    path: 'FAC_CP', // or has path or has children but not both
  },
  {
    key: 'FAC_PEUDOC',
    title: 'FAC_PEUDOC',
    children: [
      {
        key: 'FAC_PROVEI',
        title: 'FAC_PROVEI',
        path: 'FAC_PROVEI',
      },
      {
        key: 'FAC_PROTIP',
        title: 'FAC_PROTIP',
        children: [
          {
            key: 'FAC_PROVIN',
            title: 'FAC_PROVIN',
            path: 'FAC_PROVIN',
          }
        ]
      }
    ]
  }
];

const DrawerMenu = ({loading, functionalities, selectedModule, getters, ...props}) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  const [title, setTitle] = useState(null);

  useEffect(()=>{
    console.log(functionalities)
  },[functionalities]);

  useEffect(()=>{
    const module = getters.getModuleByName(selectedModule);
    setTitle(module.content !== "-"? module.content:null);
  },[selectedModule]);

  const ItemWithChildren = ({ route }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOnClick = (e) => {
      setOpen(!open);
    }

    return (
      <>
        <ListItem button onClick={handleOnClick} className={classes.nested}>
          <ListItemIcon>
            <LocalMall />
          </ListItemIcon>
          <ListItemText primary={route.title} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit className={classes.nested}>
          <List component="div" disablePadding>
            {route.children.map(child => processChildren(child))}
          </List>
        </Collapse>
      </>
    )
  }

  const processRoute = (route) => (
    <ListItem button key={route.key} onClick={() => history.push(route.path)}>
      <ListItemIcon><LocalMall /></ListItemIcon>
      <ListItemText primary={route.title} />
    </ListItem>
  );

  const processChildren = (route) => {
    if(route.children) {
      return <ItemWithChildren route={route} />;
    } else{
      return processRoute(route);
    }
  }

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
      <div className={clsx(classes.drawerHeader, {
        [classes.justifyEnd]: !title,
        [classes.justifySpaceBetween]: !!title
      })}>
        <div className={classes.drawerTitle}>
          {title}
        </div>
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
        {routes.map(route => {
          return processChildren(route);
        })}
      </List>}
      <Divider />
    </Drawer>
  )
}

export default DrawerMenu;