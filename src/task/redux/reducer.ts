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
          pannel: prev?.pannel || { open: false, selected: false }
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
      const currentTorrents = Object.assign({}, state.torrents);

      switch (operation) {
        case "expanded": {
          const s = currentTorrents[hash]!;
          s.pannel.open = !s.pannel.open;
          break;
        }
        case "selected": {
          const s = currentTorrents[hash]!;
          s.pannel.selected = !s.pannel.selected;
          break;
        }
        case "toSelectAll": {
          Object.entries(currentTorrents).forEach(([hash, r]) => r.pannel.selected = true);
          break;
        }
      }
      return {
        ...state,
        torrents: currentTorrents,
      }
    }
    default: {
      return state;
    }
  }
}
