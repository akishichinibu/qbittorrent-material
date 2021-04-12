import { v2PostRaw } from "./utils";
import { StatusCodes } from "http-status-codes";


interface LoginReturnType {
  success: boolean;
  cookie?: string;
}


export async function login(username: string, password: string): Promise<LoginReturnType> {
  const { statusCode, response } = await v2PostRaw("/auth/login", `username=${username}&password=${password}`);

  switch (statusCode) {
    case StatusCodes.OK: {
      return {
        success: true,
        cookie: response.headers.get("set-cookie") as string,
      }
    }
    case StatusCodes.UNAUTHORIZED: {
      return {
        success: false,
      }
    }
    default: {
      return {
        success: false,
      }
    }
  }
}
