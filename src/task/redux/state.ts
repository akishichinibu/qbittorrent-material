import { QBTorrentInfo, QBTrackerInfo } from "@src/common/task";


export interface TorrentStatus {
  info: QBTorrentInfo;
  trackers: Array<QBTrackerInfo>;
}


export interface TaskStateType {
  currentSelected: string | null;
  torrents: {
    [key: string]: TorrentStatus;
  };
}


export const voidTorrentStatus: TorrentStatus = {
  info: {} as QBTorrentInfo,
  trackers: [],
}


export const initState: TaskStateType = {
  currentSelected: null,
  torrents: {},
}
