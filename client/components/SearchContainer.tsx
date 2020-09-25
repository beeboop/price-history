import { useState } from 'react';
import { useRouter } from 'next/router';
import debounce from 'lodash.debounce';
import { createStyles, fade, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import CardsContainer from './CardsContainer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      background: theme.palette.background.default,
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    search: {
      position: 'sticky',
      top: 0,
      zIndex: theme.zIndex.appBar,
      borderBottom: '1px solid black',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.common.white,
      // '&:hover': {
      //   backgroundColor: fade(theme.palette.common.white, 0.25),
      // },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
);

type SearchContainerProps = {
  handleClose?: (...args: any[]) => any;
}

export default function SearchContainer({
  handleClose,
}: SearchContainerProps) {
  const router = useRouter();
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState('');
  const debouncedSetSearchValue = debounce(setSearchValue, 350);

  return (
    <Grid
      className={ classes.container }
    >
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search', autoFocus: true }}
          onChange={ e => debouncedSetSearchValue(e.target.value) }
        />
        <Button onClick={ handleClose || router.back }>X</Button>
      </div>
      { searchValue && <CardsContainer filter={ searchValue } /> }
    </Grid>
  );
};
