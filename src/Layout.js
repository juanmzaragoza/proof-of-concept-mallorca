import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import {Route, Switch, useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators, compose} from 'redux';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MailIcon from '@material-ui/icons/Mail';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import Badge from "@material-ui/core/Badge";
import {AccountCircle ,More} from "@material-ui/icons";

import pages from "./pages";
import * as ROUTES from "constants/routes";

import DrawerMenu from "./components/DrawerMenu/index";
import CecocloudMenu from "./components/CecocloudMenu";
import CecocloudModulesSelector from "./components/CecocloudModulesSelector/index";

import {drawerWidth} from "./constants/styles";
import EnterpriseGroupSelector from "./components/EnterpriseGroupSelector";
import PageHeader from "modules/PageHeader";
import {PrivateRoute} from "modules/Authentication";
import {isUserAuthenticated} from "helper/login-helper";
import {logout} from "./redux/app";
import {getAuthenticated, getLoggedInUserToken} from "./redux/app/selectors";
import {usePrevious} from "./helper/utils-hook";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    marginLeft: '10px'
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: '85px',
    background:` linear-gradient(
      90deg,
      rgba(91, 153, 154, 1) 6%,
      rgba(63, 126, 128, 1) 62%,
      rgba(68, 104, 160, 1) 100%
    )`
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    })
  },
  toolbar: {
    height: '90px'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
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
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
    '&>button': {
      marginLeft: '1px'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  bigWord: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    width: '100%',
    height: '78vh',
    justifyContent: 'center',
    fontSize: 'xxx-large'
  }
}));



const Layout = ({ children, ...props}) => {
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [isFirstLoading, setIsFirstLoading] = useState(true);

  /**
   * If the user is not authenticated,
   * redirect to login page
   */
  useEffect(() => {
    if(!props.authenticated) history.push(ROUTES.LOGIN);
  },[props.authenticated]);

  /**
   * Every time the token is refreshed or the module updated,
   * the user is redirected to index
   **/
  const previousToken = usePrevious(props.token);
  useEffect(()=>{
    if(props.token && previousToken !== props.token && !isFirstLoading) {
      history.push('/');
    }
    // to avoid redirection on first loading
    setIsFirstLoading(false);
  },[props.token]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    props.actions.logout();
  };

  const profileMenuItems = [
    {
      content: "Profile",
      onClick: () => console.log("profile")
    },
    {
      content: "Logout",
      onClick: handleLogout
    },
  ];

  const mobileProfileMenuItems = [
    {
      content: <>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </>,
      onClick: () => console.log("Messages")
    }
  ];

  return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>

            <CloudQueueIcon></CloudQueueIcon>
            <Typography className={classes.title} variant="h6" noWrap>
              Everet
            </Typography>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <EnterpriseGroupSelector />
              <CecocloudModulesSelector />
              <CecocloudMenu id="profile-menu"
                             icon={<AccountCircle />}
                             items={profileMenuItems}
                             noItemsText={"No debería aparecer"} />
            </div>
            <div className={classes.sectionMobile}>
              <CecocloudMenu id="mobile-profile-menu"
                             icon={<More />}
                             items={mobileProfileMenuItems} />
            </div>
          </Toolbar>
        </AppBar>
        <DrawerMenu open={open} handleDrawerClose={handleDrawerClose} />
        <main
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}
        >
          <div className={classes.drawerHeader} />
          <PageHeader />
          <Switch>
            {/** Private pages */}
            <PrivateRoute isUserAuthenticated={isUserAuthenticated}>
              {/* TODO() add index component */}
              <Route path={'/'} exact={true} component={() => <div className={classes.bigWord}>Pantalla Principal</div>} />
              {pages
                .filter(module => module.routeProps)
                .map((module, index) => (
                  <Route {...module.routeProps} key={index} />
                ))
              }
              {/* TODO() add not found component */}
              <Route path="/not-found" exact component={() => <div className={classes.bigWord}>Ups!!! Esta página no existe X(</div>} />
            </PrivateRoute>
          </Switch>

        </main>
      </div>
  );
}

const mapStateToProps = (state, props) => {
  return {
    authenticated: getAuthenticated(state) || !!isUserAuthenticated(),
    token: getLoggedInUserToken(state)
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    logout: bindActionCreators(logout, dispatch),
  };
  return { actions };
};

export default compose(
  connect(mapStateToProps,mapDispatchToProps)
)(Layout);