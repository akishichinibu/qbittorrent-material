import { AppStateType, initState } from "./state";
import { AppGAT, VersionUpdatedAT } from "@src/app/redux/action";


export const reducer = (state = initState, action: AppGAT): AppStateType => {
  switch (action.type) {
    case "app/login/successed": {
      return {
        ...state,
        hasLogin: true,
        cookie: action.payload.cookie,
      }
    }
    case "app/version/updated": {
      const { apiVersion, appVersion } = (action as VersionUpdatedAT).payload;
      return {
        ...state,
        apiVersion,
        appVersion,
      }
    }
    default: {
      return state;
    }
  }
}
