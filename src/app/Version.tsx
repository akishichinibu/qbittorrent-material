import React, { FC } from "react";


interface PropsType {
  appVersion: string | null;
  apiVersion: string | null;
}


const Version: FC<PropsType> = ({ appVersion, apiVersion }) => {
  return <>
    <span>
      {appVersion === null ? "*" : appVersion}({apiVersion === null ? "*" : apiVersion})
    </span>
  </>
}


export default Version;
