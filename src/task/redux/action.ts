import { QBTorrentInfo, QBTrackerInfo } from "@src/common/task";
import { PayloadAction } from "@src/utils";


export type ActionLiteral = "task/torrents/updated" | "task/trackers/updated" | "task/present/trigger";


interface TorrentsUpdatedAT extends PayloadAction<ActionLiteral, {
  torrents: Array<QBTorrentInfo>
}> {
  type: "task/torrents/updated";
}


interface TrackersUpdatedAT extends PayloadAction<ActionLiteral, {
  hash: string;
  trackers: Array<QBTrackerInfo>;
}> {
  type: "task/trackers/updated";
}


interface PresentTriggerAT extends PayloadAction<ActionLiteral, {
  hash: string;
  operation: "selected" | "unselected" | "selectAll";
}> {
  type: "task/present/trigger";
}


export type TaskGAT = TorrentsUpdatedAT |
TrackersUpdatedAT | 
  PresentTriggerAT;


export {
  TorrentsUpdatedAT,
  TrackersUpdatedAT,
  PresentTriggerAT,
}
