import React from 'react';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/icons/Settings';
import ActionMenu from './ActionMenu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      left: theme.spacing(2),
    },
  }),
);

export default function FloatingActionButton() {
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const fab = {
    color: 'primary' as 'primary',
    className: classes.fab,
    icon: <Icon />,
    label: 'Add',
  }

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  return (
    <>
      <Zoom
        key={fab.color}
        in
        timeout={transitionDuration}
        unmountOnExit
      >
        <Fab
          aria-label={fab.label}
          className={fab.className}
          color={fab.color}
          onClick={handleClick}
        >
          {fab.icon}
        </Fab>
      </Zoom>
      <ActionMenu
        anchorEl={ anchorEl }
        handleClose={ handleClose }
      />
    </>
  )
}
