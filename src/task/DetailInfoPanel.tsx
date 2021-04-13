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


interface DetailInfo {
  label: string;
  value: string;
}


import { PageHeader, Tag, Button, Statistic, Descriptions, Row } from 'antd';
import { fileSizePretties } from "@src/utils";


const DetailInfoPanel: FC = () => {
  const [value, setValue] = React.useState(0);

  const { currentSelected, torrents } = useSelector(({ task: { currentSelected, torrents } }: GlobalReduxState) => ({
    currentSelected,
    torrents,
  }));

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const currentInfo = currentSelected === null ? null : torrents[currentSelected]!;

  const summaryInfo = currentInfo === null ? null : [
    ["Status", currentInfo.info.state],
    ["Size", fileSizePretties(currentInfo.info.size)],
    ["Ratio", currentInfo.info.ratio],
    ["种子", currentInfo.info.num_seeds],
    ["用户", currentInfo.info.num_leechs],
  ]

  const detailInfo = currentInfo === null ? null : [
    ["Time Active", currentInfo.info.time_active],
    ["Downloaded", currentInfo.info.downloaded],
    ["Added On", currentInfo.info.added_on],
    ["Save Path", currentInfo.info.save_path],
  ]

  return <>
    <PageHeader
      className="site-page-header"
      onBack={() => window.history.back()}
      title="Title"
      subTitle="This is a subtitle"
      extra={[
        <Button key="3">Operation</Button>,
        <Button key="2">Operation</Button>,
        <Button key="1" type="primary">
          Primary
      </Button>,
      ]}
    >
      <Row>
        {summaryInfo && summaryInfo.map(([label, r]) => <Statistic title={label} value={r} />)}
      </Row>
      <br />
      <Descriptions size="small" column={3}>
        {detailInfo && detailInfo.map(([label, value]) => <Descriptions.Item label={label}>{value}</Descriptions.Item>)}
      </Descriptions>

      <TrackersTab />
    </PageHeader>
  </>;
}


export default DetailInfoPanel;