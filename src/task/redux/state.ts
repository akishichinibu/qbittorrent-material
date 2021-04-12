import { QBTorrentInfo, QBTrackerInfo } from "@src/common/task";


interface PannelStatus {
  open: boolean;
  selected: boolean;
}


export interface TorrentStatus {
  info: QBTorrentInfo;
  trackers: Array<QBTrackerInfo>;
  pannel: PannelStatus;
}


export interface TaskStateType {
  torrents: {
    [key: string]: TorrentStatus;
  };
}


export const initState: TaskStateType = {
  torrents: {},
}
