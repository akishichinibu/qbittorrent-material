import { Card, Grid, Paper } from "@material-ui/core"
import React, { FC } from "react"
import { TorrentStatus } from "./redux/state"


const BasicInfoTab: FC<TorrentStatus> = ({ info }) => {
  const data = [
    ["活动时间", info.last_activity],
    ["已下载间", info.downloaded],
    ["下载速度", info.dlspeed],
    ["下载限制", info.dl_limit],
    ["分享率", info.max_ratio],
    ["连接", info.max_ratio],
    ["种子", info.max_ratio],
    ["用户", info.max_ratio],
  ]
  return <>
    <Grid container spacing={2}>
      <Grid item xs={12} md={12} lg={12}>
        <Card>
          {data.map(([key, value], index) => <p key={index}>{key}: {value}</p>)}
        </Card>
      </Grid>
      <Grid item xs={6} md={6} lg={6}>
        <Card>
          HH
    </Card>
      </Grid>
    </Grid>
  </>
}


export default BasicInfoTab;
