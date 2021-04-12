import { StatusCodes } from "http-status-codes";

class RequestError extends Error {

}


async function postRequest(version: string, endpoint: string, body: string) {
  const headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");

  const req = new Request(`/api/${version}${endpoint}`, {
    method: "POST",
    mode: "same-origin",
    headers: headers,
    credentials: "same-origin",
    body: body === null ? undefined : body,
  });
  
  let res: Response;

  try {
    res = await fetch(req);
  } catch (e) {
    throw new RequestError(e);
  }

  return res;
}


async function getRequest(version: string, endpoint: string) {
  const headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");
  
  const req = new Request(`/api/${version}${endpoint}`, {
    method: "GET",
    mode: "same-origin",
    headers: headers,
    credentials: "same-origin",
  });

  let res: Response;

  try {
    res = await fetch(req);
  } catch (e) {
    throw new RequestError(e);
  }

  return res;
}


export function checkHasAuth() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/api/v2/app/version", false);
  xhr.send();
  return xhr.status === StatusCodes.OK;
}


export async function v2PostRaw(endpoint: string, body: string) {
  const res = await postRequest("v2", endpoint, body);
  const data = await res.text();
  return {
    statusCode: res.status,
    data: data,
    response: res,
  }
}


export async function v2Post<T, R>(endpoint: string, body: T | null=null) {
  const res = await postRequest("v2", endpoint, JSON.stringify(body));
  const data: R = await res.json();
  return [res.status, data];
}


export async function v2GetRaw(endpoint: string) {
  const res = await getRequest("v2", endpoint);
  const data = await res.text();
  return {
    statusCode: res.status,
    data: data,
    response: res,
  }
}


export async function v2Get<R>(endpoint: string) {
  const res = await getRequest("v2", endpoint);
  const data: R = await res.json();
  return {
    statusCode: res.status,
    data: data,
    response: res,
  }
}

