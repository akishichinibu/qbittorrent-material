import React, { Dispatch, FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { TaskList } from '../task/TorrentList';
import { mainListItems, secondaryListItems } from '../component/SideMenu';

import { GlobalActionType, GlobalReduxState } from '@src/redux';
import LoginModal from '@src/app/LoginModal';
import AppBarHeader from '@src/page/AppHeader';


const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));



const DashBoard: FC = () => {
  const { root, drawerPaper, drawerPaperClose, toolbarIcon, content, appBarSpacer, container } = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(old => !old);
  };

  const { task, hasLogin } = useSelector(({ task, app }: GlobalReduxState) => ({
    hasLogin: app.hasLogin,
    task,
  }));

  return <>
    <div className={root}>
      <CssBaseline />
      <AppBarHeader drawerOpen={drawerOpen} handleDrawerOpen={handleDrawerOpen} />

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(drawerPaper, !drawerOpen && drawerPaperClose),
        }}
        open={drawerOpen}
      >
        <div className={toolbarIcon}>
          <IconButton onClick={handleDrawerOpen} />
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>

      <main className={content}>
        <div className={appBarSpacer} />
        <Container maxWidth="lg" className={container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Paper>
                <TaskList task={task} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>

    <LoginModal open={!hasLogin} />
  </>
}


export default DashBoard;
