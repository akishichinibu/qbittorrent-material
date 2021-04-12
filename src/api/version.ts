import { StatusCodes } from "http-status-codes";
import { v2GetRaw } from "./utils";

export async function applicationVersion() {
  const { statusCode, data } = await v2GetRaw("/app/version");

  return {
    version: data,
  };
}


export async function apiVersion() {
  const { statusCode, data } = await v2GetRaw("/app/webapiVersion");

  return {
    version: data,
  };
}
