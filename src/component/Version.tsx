import React, { FC } from "react";
import { useState } from "react";
import { APIVersion, applicationVersion } from "../api/version";


const fetchVersion: () => Promise<[string, string]> = () => {
  return new Promise((resolve, reject) => {
    Promise
      .all([applicationVersion(), APIVersion()])
      .then(([{ version: appVersion }, { version: apiVersion }]) => {
        resolve([appVersion as string, apiVersion as string]);
      });
  });
}


export const Version: FC = () => {
  const [appVersion, setAppVersion] = useState<string | null>(null);
  const [apiVersion, setApiVersion] = useState<string | null>(null);

  if (appVersion === null) {
    fetchVersion().then(([r1, r2]) => {
      setAppVersion(r1);
      setApiVersion(r2);
    })
  }

  return <>
    {appVersion === null ? "????" : appVersion}({apiVersion === null ? "????" : apiVersion})
  </>
}
