import { v2Get, v2Post } from "./utils";


// added_on	integer	Time (Unix Epoch) when the torrent was added to the client
// amount_left	integer	Amount of data left to download (bytes)
// auto_tmm	bool	Whether this torrent is managed by Automatic Torrent Management
// availability	float	Percentage of file pieces currently available
// category	string	Category of the torrent
// completed	integer	Amount of transfer data completed (bytes)
// completion_on	integer	Time (Unix Epoch) when the torrent completed
// content_path	string	Absolute path of torrent content (root path for multifile torrents, absolute file path for singlefile torrents)
// dl_limit	integer	Torrent download speed limit (bytes/s). -1 if ulimited.
// dlspeed	integer	Torrent download speed (bytes/s)
// downloaded	integer	Amount of data downloaded
// downloaded_session	integer	Amount of data downloaded this session
// eta	integer	Torrent ETA (seconds)
// f_l_piece_prio	bool	True if first last piece are prioritized
// force_start	bool	True if force start is enabled for this torrent
// hash	string	Torrent hash
// last_activity	integer	Last time (Unix Epoch) when a chunk was downloaded/uploaded
// magnet_uri	string	Magnet URI corresponding to this torrent
// max_ratio	float	Maximum share ratio until torrent is stopped from seeding/uploading
// max_seeding_time	integer	Maximum seeding time (seconds) until torrent is stopped from seeding
// name	string	Torrent name
// num_complete	integer	Number of seeds in the swarm
// num_incomplete	integer	Number of leechers in the swarm
// num_leechs	integer	Number of leechers connected to
// num_seeds	integer	Number of seeds connected to
// priority	integer	Torrent priority. Returns -1 if queuing is disabled or torrent is in seed mode
// progress	float	Torrent progress (percentage/100)
// ratio	float	Torrent share ratio. Max ratio value: 9999.
// ratio_limit	float	TODO (what is different from max_ratio?)
// save_path	string	Path where this torrent's data is stored
// seeding_time_limit	integer	TODO (what is different from max_seeding_time?)
// seen_complete	integer	Time (Unix Epoch) when this torrent was last seen complete
// seq_dl	bool	True if sequential download is enabled
// size	integer	Total size (bytes) of files selected for download
// state	string	Torrent state. See table here below for the possible values
// super_seeding	bool	True if super seeding is enabled
// tags	string	Comma-concatenated tag list of the torrent
// time_active	integer	Total active time (seconds)
// total_size	integer	Total size (bytes) of all file in this torrent (including unselected ones)
// tracker	string	The first tracker with working status. Returns empty string if no tracker is working.
// up_limit	integer	Torrent upload speed limit (bytes/s). -1 if ulimited.
// uploaded	integer	Amount of data uploaded
// uploaded_session	integer	Amount of data uploaded this session
// upspeed	integer	Torrent upload speed (bytes/s)


export interface TorrentInfo {
  added_on: number;
  amount_left: number;
  auto_tmm: boolean;
  availability: number;
  category: string;
  completed: number;
  completion_on: number;
  content_path: string;
  dl_limit: number;
  dlspeed: number;
  downloaded: number;
  downloaded_session: number;
  eta: number;
  f_l_piece_prio: boolean;
  force_start: boolean;
  hash: string;
  last_activity: number;
  magnet_uri: string;
  max_ratio: number;
  max_seeding_time: number;
  name: string;
}


// url	string	Tracker url
// status	integer	Tracker status. See the table below for possible values
// tier	integer	Tracker priority tier. Lower tier trackers are tried before higher tiers
// num_peers	integer	Number of peers for current torrent, as reported by the tracker
// num_seeds	integer	Number of seeds for current torrent, asreported by the tracker
// num_leeches	integer	Number of leeches for current torrent, as reported by the tracker
// num_downloaded	integer	Number of completed downlods for current torrent, as reported by the tracker
// msg	string	Tracker message (there is no way of knowing what this message is - it's up to tracker admins)


export interface TrackerInfo {
  url: string;
  status: TrackerStatus;
  tier: number;
  num_peers: number;
  num_seeds: number;
  num_leeches: number;
  num_downloaded: number;
  msg: string;
}


enum TrackerStatus {
  DISABLE = 0,
  NOT_CONTRACTED = 1,
  WORKING = 2,
  UPDATING = 3,
  CONTRACTED = 4,
}


export async function torrentsList() {
  const { statusCode, data } = await v2Get<Array<TorrentInfo>>("/torrents/info");

  return {
    statusCode: statusCode,
    taskList: statusCode === 200 ? data : [],
  };
}


export async function trackersList(taskHash: string) {
  const { statusCode, data } = await v2Get<Array<TrackerInfo>>(`/torrents/trackers?hash=${taskHash}`);

  return {
    statusCode: statusCode,
    trackerList: statusCode === 200 ? data : [],
  };
}
