import { PayloadAction } from "@src/utils";


export type ActionLiteral = "app/login/successed" |
  "app/login/failed" |
  "app/login/requested";


export interface LoginRequestAT extends PayloadAction<ActionLiteral, {
  username: string;
  password: string;
}> {
  type: "app/login/requested";
}


export interface LoginSuccessAT extends PayloadAction<ActionLiteral, {
  cookie: string;
}> {
  type: "app/login/successed";
}
