import React from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import AddIcon from '@material-ui/icons/Add';
import FilterIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';

import AddRecordDialog from './AddRecordDialog';

export default function ActionMenu({
  anchorEl,
  handleClose,
}) {
  const [open, setOpen] = React.useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
    handleClose();
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <SearchIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Search" />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <FilterIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Filter" />
        </MenuItem>
        <MenuItem onClick={handleDialogOpen}>
          <ListItemIcon>
            <AddIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Add" />
        </MenuItem>
      </Menu>
      <AddRecordDialog
        open={ open }
        handleClose={ handleDialogClose }
      />
    </>
  );
}
