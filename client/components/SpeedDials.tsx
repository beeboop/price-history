import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import AddIcon from '@material-ui/icons/Add';
import FilterIcon from '@material-ui/icons/Filter';
import SearchIcon from '@material-ui/icons/Search';
import AddRecordDialog from './AddRecordDialog';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    speedDial: {
      position: 'fixed',
      '&.MuiSpeedDial-directionUp': { // &.MuiSpeedDial-directionLeft
        bottom: theme.spacing(2),
        left: theme.spacing(2),
      },
      '&.MuiSpeedDial-directionDowns, &.MuiSpeedDial-directionRight': {
        top: theme.spacing(2),
        left: theme.spacing(2),
      },
    },
  }),
);

export default function SpeedDials() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [addDialogOpen, setAddDialogOpen] = React.useState(false);

  const handleDialogOpen = () => {
    setAddDialogOpen(true);
    handleClose();
  };

  const handleDialogClose = () => {
    setAddDialogOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const actions = [
    { icon: <AddIcon />, name: 'Add', onClick: handleDialogOpen },
    { icon: <SearchIcon />, name: 'Search' },
    { icon: <FilterIcon />, name: 'Filter' },
  ];

  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial"
        className={classes.speedDial}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction={'up'}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick || handleClose}
          />
        ))}
      </SpeedDial>
      <AddRecordDialog
        open={ addDialogOpen }
        handleClose={ handleDialogClose }
      />
    </>
  );
}