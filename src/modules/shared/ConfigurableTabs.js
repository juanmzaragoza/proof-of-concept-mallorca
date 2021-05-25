import {AppBar, Box, Tab, Tabs, withStyles} from "@material-ui/core";
import React, {useEffect} from "react";
import * as PropTypes from "prop-types";
import { some } from "lodash";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const CustomizedTab = withStyles((theme) => ({
  root: {
    '&:hover': {
      opacity: 0.5,
      backgroundColor: theme.palette.primary.light,
    },
    '&$selected': {
      color: theme.palette.getContrastText(theme.palette.primary.main),
      backgroundColor: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const ConfigurableTabs = ({ tabs, variant, tabIndex = 0, forceChange = false, onChange = () => {}}) => {
  const [value, setValue] = React.useState(tabIndex);

  useEffect(()=>{
    if(forceChange) setValue(tabIndex);
  },[tabIndex, forceChange]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onChange(newValue);
  };

  const getClassNameError = (error) => {
    return error? "error":"";
  }

  return (
    <>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant={variant? variant:"scrollable"}
          scrollButtons="auto"
          aria-label="configurable tabs"
          className={getClassNameError(some(tabs, tab => tab.error))}
        >
          {tabs.map(tab => <CustomizedTab className={getClassNameError(tab.error)} key={tab.key} label={tab.label} {...a11yProps(tab.key)} />)}
        </Tabs>
      </AppBar>
      {tabs.map(tab => <TabPanel className={tab.className? tab.className:""} key={tab.key} value={value} index={tab.key}>
        {tab.component}
      </TabPanel>)}
    </>
  )
};

export default ConfigurableTabs;