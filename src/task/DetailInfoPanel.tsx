import { makeStyles, Theme, AppBar, Tabs, Tab, Box, Typography } from "@material-ui/core";
import { GlobalReduxState } from "@src/redux";
import React from "react";
import { FC } from "react";
import { useSelector } from "react-redux";
import BasicInfoTab from "./BasicInfoTab";
import TrackersTab from "./TrackersTab";


interface TabPanelProps {
  index: number;
  value: number;
}


const TabPanel: FC<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={1}>{children}</Box>}
    </div>
  );
}


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: "8px",
  },
  tab: {
    maxHeight: "30px",
  }
}));


function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const TabsHeader = [
  "基本信息",
  "Trackers",
  "Item Three",
]


const DetailInfoPanel: FC = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { currentSelected, torrents } = useSelector(({ task: { currentSelected, torrents } }: GlobalReduxState) => ({
    currentSelected,
    torrents,
  }));

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const currentInfo = currentSelected === null ? null : torrents[currentSelected]!;

  return <>
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" className={classes.tab}>
          {TabsHeader.map((label, index) => <Tab label={label} {...a11yProps(index)} />)}
        </Tabs>
      </AppBar>

      {[BasicInfoTab, TrackersTab, TrackersTab].map((CP, index) => <>
        <TabPanel value={value} index={index}>
          {currentInfo && value === index && <CP {...currentInfo} />}
        </TabPanel>
      </>)}
    </div>
  </>;
}


export default DetailInfoPanel;