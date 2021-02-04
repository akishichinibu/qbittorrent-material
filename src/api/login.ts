import { v2PostRaw } from "./utils";

export async function login(username: string, password: string) {
  const { statusCode, data, response: res } = await v2PostRaw("/auth/login", `username=${username}&password=${password}`);

  return {
    statusCode: statusCode, 
  };
}
