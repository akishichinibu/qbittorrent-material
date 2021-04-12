import { LoginRequestAT, ActionLiteral as LoginActionLiteral, LoginSuccessAT } from "./actions/login";
import { VersionUpdatedAT, VersionRequestedAT, ActionLiteral as VersionActionLiteral } from "./actions/version";


export type ActionLiteral = LoginActionLiteral |
  VersionActionLiteral;


export type AppGAT = LoginRequestAT |
  LoginSuccessAT |
  VersionRequestedAT |
  VersionUpdatedAT;


export {
  LoginRequestAT,
  LoginSuccessAT,
  VersionUpdatedAT,
  VersionRequestedAT,
}
