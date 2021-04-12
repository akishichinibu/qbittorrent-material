import { QBTorrentInfo, QBTrackerInfo } from "@src/common/task";
import { v2Get, v2Post } from "./utils";


export async function torrentsList() {
  const { statusCode, data } = await v2Get<Array<QBTorrentInfo>>("/torrents/info");
  return data;
}


export async function trackersList(taskHash: string) {
  const { statusCode, data } = await v2Get<Array<QBTrackerInfo>>(`/torrents/trackers?hash=${taskHash}`);

  return {
    trackers: data,
  };
}
