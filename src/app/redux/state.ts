import { checkHasAuth } from "@src/api/utils";

export interface AppStateType {
  hasLogin: boolean;
  cookie: string | null;
  apiVersion: string | null;
  appVersion: string | null;
}


export const initState: AppStateType = {
  hasLogin: checkHasAuth(),
  cookie: null,
  apiVersion: null,
  appVersion: null,
}
