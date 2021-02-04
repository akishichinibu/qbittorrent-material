import { useEffect, useState } from "react";


export function getAuthCookie() {
  const cookie: string | null = window.localStorage.getItem("_qb_auth");
  return cookie;
}


export function setAuthCookie(authInfo: string) {
  window.localStorage.setItem("_qb_auth", authInfo);
}


export function useInterval<T>(pre: number, func: () => T | Promise<T>, init: T): [T, number] {
  const [data, setData] = useState<[T, number]>([init, 0]);

  useEffect(() => {
    func();
    const lid = setInterval(async () => {
      const res = await func();
      setData([res, Date.now()]);
    }, pre * 1000);
    return () => clearInterval(lid);
  }, [func, ]);

  return data;
}
