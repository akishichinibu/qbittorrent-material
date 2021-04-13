import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

import InsertLinkIcon from '@material-ui/icons/InsertLink';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import SettingsIcon from '@material-ui/icons/Settings';

import TaskList from '@src/task/TorrentList';
import { GlobalReduxState } from '@src/redux';
import LoginModal from '@src/app/LoginModal';
import AppBarHeader from '@src/page/AppHeader';
import DetailInfoPanel from '@src/task/DetailInfoPanel';
import AddTaskFromLinkModal from '@src/app/AddTaskFromLinkModal';


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
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    maxWidth: "95%",
  },
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));


const DashBoard: FC = () => {
  const classes = useStyles();
  const [addingLinkTask, setAddingLinkTask] = useState(false);
  const { hasLogin } = useSelector(({ app: { hasLogin } }: GlobalReduxState) => ({ hasLogin }));

  return <>
    <div className={classes.root}>
      <CssBaseline />
      <AppBarHeader />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1}>

            <Grid item xs={12} md={12} lg={12}>
              <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                <Button onClick={() => setAddingLinkTask(true)}><InsertLinkIcon /></Button>
                <Button><CreateNewFolderIcon /></Button>
                <Button><SettingsIcon /></Button>
              </ButtonGroup>
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <Paper>
                <TaskList />
              </Paper>
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <Paper>
                <DetailInfoPanel />
              </Paper>
            </Grid>

          </Grid>
        </Container>
      </main>
    </div>

    { !hasLogin && <LoginModal />}
    <AddTaskFromLinkModal open={addingLinkTask} handleClose={() => setAddingLinkTask(false)} />
  </>
}


import styles from './Dashboard.module.less';


import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;

const DashBoard2: FC = () => {
  return <>
    <Layout>

      <Header className={styles.header}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">nav 1</Menu.Item>
        </Menu>
      </Header>

      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
          <TaskList></TaskList>
        </div>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
          <DetailInfoPanel></DetailInfoPanel>
        </div>
      </Content>

      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>,
  </>
}

export default DashBoard2;
