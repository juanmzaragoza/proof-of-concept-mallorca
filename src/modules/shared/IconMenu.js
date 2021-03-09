import React from 'react';
import PropTypes from "prop-types";

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const IconMenu = ({ options, icon }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {icon? icon:<MoreVertIcon />}
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        /*PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}*/
      >
        {options.map((option) => (
          <MenuItem key={option.key} onClick={handleClose}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

IconMenu.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.any,
    label: PropTypes.any
  })),
  icon: PropTypes.element
};

export default IconMenu;