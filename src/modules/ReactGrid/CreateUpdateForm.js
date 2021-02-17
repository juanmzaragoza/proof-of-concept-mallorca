import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Dialog, Slide} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import CloseIcon from '@material-ui/icons/Close';
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateUpdateForm = ({ title, open, handleClose }) => {
  const classes = useStyles();

  return (
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            { title }
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <div>Content</div>
    </Dialog>
  );
};

CreateUpdateForm.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func
};

export default CreateUpdateForm;