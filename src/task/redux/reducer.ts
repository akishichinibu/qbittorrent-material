import { fromEntries } from "@src/utils";
import { PresentTriggerAT, TaskGAT, TorrentsUpdatedAT } from "./action";
import { initState, TaskStateType, TorrentStatus } from "./state";


export const reducer = (state = initState, action: TaskGAT) => {
  switch (action.type) {
    case "task/torrents/updated": {
      action = action as TorrentsUpdatedAT;
      const { torrents: prevTorrents } = state;

      const currentTorrents = fromEntries(action.payload.torrents.map(r => {
        const prev = prevTorrents[r.hash];

        const data: TorrentStatus = {
          info: r,
          trackers: prev?.trackers || [],
        }

        return [r.hash, data];
      }));

      return {
        ...state,
        torrents: currentTorrents,
      }
    }
    case "task/present/trigger": {
      action = action as PresentTriggerAT;
      const { hash, operation } = action.payload;
      return {
        ...state,
        currentSelected: operation === "selected" ? hash : null,
      }
    }
    default: {
      return state;
    }
  }
}
