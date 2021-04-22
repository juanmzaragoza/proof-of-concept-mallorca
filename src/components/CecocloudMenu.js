import React from 'react';
import PropTypes from "prop-types";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import IconButton from "@material-ui/core/IconButton";

const CecocloudMenu = ({ id, icon, items, noItemsText }) => {

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  return (
    <>
      <IconButton
        ref={anchorRef}
        color="inherit"
        aria-label="open drawer"
        onClick={handleToggle}
        edge="start"
        aria-controls={open ? id : undefined}
      >
        {icon}
      </IconButton>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id={id} onKeyDown={handleListKeyDown}>
                  {items && items.length > 0?
                    items.map((item,index) =>
                      <MenuItem key={index} onClick={(e) => {
                        item.onClick(e);
                        handleClose(e);
                      }}>{item.content}</MenuItem>)
                    :
                    <MenuItem disabled>{noItemsText}</MenuItem>
                  }
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}

CecocloudMenu.propTypes = {
  id: PropTypes.string.isRequired,
  icon: PropTypes.any.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.any,
    onClick: PropTypes.func
  }))
}

export default CecocloudMenu;