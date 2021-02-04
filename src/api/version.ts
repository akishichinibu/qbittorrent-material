import { v2GetRaw, v2PostRaw } from "./utils";

export async function applicationVersion() {
  const { statusCode, data } = await v2GetRaw("/app/version");

  return {
    statusCode: statusCode, 
    version: statusCode === 200 ? data : null,
  };
}


export async function APIVersion() {
  const { statusCode, data } = await v2GetRaw("/app/webapiVersion");

  return {
    statusCode: statusCode, 
    version: statusCode === 200 ? data : null,
  };
}
