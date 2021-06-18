import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import clsx from "clsx";
import {find, some, isEmpty} from "lodash";

import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Collapse from '@material-ui/core/Collapse';

import modules from "pages/fact";
import {Loading} from "../../modules/shared/Loading";

import {drawerWidth} from "../../constants/styles";
import {ErrorOutline} from "@material-ui/icons";

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
  noModules: {
    fontStyle: 'italic'
  }
}));

const DrawerMenu = ({loading, functionalities, selectedModule, constants, getters, ...props}) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  const [title, setTitle] = useState(null);
  const [menuItems,setMenuItems] = useState([]);

  useEffect(()=>{
    // first, filter functionalities
    const filterByFunctionality = (routes) => {
      return routes
        .map(route => {
          // if leaf
          if(route.key) {
            const exists = some(functionalities, functionality => functionality === route.key);
            return exists? route:{};
          } else { // if non-leaf
            const children = route.children;
            return {
              ...route,
              children: filterByFunctionality(children)
            }
          }
        })
        .filter(route => !isEmpty(route));
    }
    const filteredRoutes = filterByFunctionality(constants.menuRoutes);

    // second, get routes
    const filterByModules = (routes) => {
      return routes
        .map(route => {
          // if leaf
          if(route.key) {
            const module = find(modules, module => module.name === route.key);
            return module? {
              ...route,
              path: module.routeProps.path,
              icon: module.icon? module.icon:route.icon,
            }:{};
          } else { // if non-leaf
            const children = filterByModules(route.children);
            // if hasn't children -> I don't show it
            return children.length > 0? {
              ...route,
              children
            }:{}
          }
        })
        .filter(route => !isEmpty(route));
    }
    const r = filterByModules(filteredRoutes);
    setMenuItems(r);
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
            {route.icon}
          </ListItemIcon>
          <ListItemText primary={route.title} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit className={classes.nested}>
          <List component="div" disablePadding>
            {route.children.map((child,index) => processChildren(child,index))}
          </List>
        </Collapse>
      </>
    )
  }

  const processRoute = (route) => (
    <ListItem selected={history.location.pathname === route.path}
              button key={route.key}
              onClick={() => history.push(route.path)}>
      <ListItemIcon>{route.icon}</ListItemIcon>
      <ListItemText primary={route.title} />
    </ListItem>
  );

  const processChildren = (route, index) => {
    if(route.children) {
      return <ItemWithChildren key={index} route={route} />;
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
        {menuItems.length > 0?
          menuItems.map((route,index) => {
            return processChildren(route,index);
          })
          :
          <ListItem button disabled className={classes.noModules}>
            <ListItemIcon>
              <ErrorOutline />
            </ListItemIcon>
            <ListItemText primary={title?
              props.intl.formatMessage({id: "Modules.menu.sin_funcionalidades", defaultMessage: "No existen funcionalidades para el módulo seleccionado"})
              :
              props.intl.formatMessage({id: "Modules.menu.no_modulos_seleccionado", defaultMessage: "No hay módulos seleccionados"})
            } />
          </ListItem>
        }
      </List>}
      <Divider />
    </Drawer>
  )
}

export default DrawerMenu;