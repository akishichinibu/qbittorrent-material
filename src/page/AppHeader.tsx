import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { Menu as MenuIcon } from '@material-ui/icons';

import Version from '@src/app/Version';
import { GlobalReduxState } from '@src/redux';
import { InputBase } from '@material-ui/core';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    height: "8px",
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
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
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
}));


const AppBarHeader: FC<{ drawerOpen: boolean, handleDrawerOpen: () => any }> = ({ drawerOpen, handleDrawerOpen }) => {
  const { appBar, search, searchIcon, inputRoot, inputInput, appBarShift, toolbar, menuButton, menuButtonHidden, title } = useStyles();

  const { apiVersion, appVersion } = useSelector(({ app: { apiVersion, appVersion } }: GlobalReduxState) => ({
    apiVersion,
    appVersion,
  }));

  return <>
    <AppBar position="absolute" className={clsx(appBar, drawerOpen && appBarShift)}>
      <Toolbar className={toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(menuButton, drawerOpen && menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={title}>
          Dashboard
          </Typography>
        <div className={search}>
          <div className={searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: inputRoot,
              input: inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>

        <Version appVersion={appVersion} apiVersion={apiVersion} />
      </Toolbar>

    </AppBar>
  </>
}


export default AppBarHeader;
