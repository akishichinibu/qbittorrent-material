import { Action } from "redux";


export type ActionLiteral = "app/version/updated" | "app/version/requested";


interface PayloadAction<T, R> extends Action<T> {
  payload: R;
}


export interface VersionRequestedAT extends PayloadAction<ActionLiteral, null> {
  type: "app/version/requested";
}


export interface VersionUpdatedAT extends PayloadAction<ActionLiteral, {
  apiVersion: string,
  appVersion: string,
}> {
  type: "app/version/updated";
}
