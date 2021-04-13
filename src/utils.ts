import { useEffect, useState } from "react";
import { Action } from "redux";


export interface PayloadAction<T, R = never> extends Action<T> {
  payload: R;
}


export function useInterval<T>(interval: number, func: () => T | Promise<T>, init: T): [T, number] {
  const [data, setData] = useState<[T, number]>([init, 0]);

  useEffect(() => {
    func();
    const lid = setInterval(async () => {
      const res = await func();
      setData([res, Date.now()]);
    }, interval);
    return () => clearInterval(lid);
  }, [func,]);

  return data;
}


export function fromEntries<V>(params: Iterable<[string, V]>): { [key: string]: V } {
  let buffer: { [key: string]: V } = {};
  for (let [k, v] of params) buffer[k] = v;
  return buffer;
}


export function between(x: number, l: number, r: number) {
  return l <= x && x < r;
}


export function fileSizePretties(size: number): string {
  if (size === 0) {
    return "0 B";
  }

  let units = ["B", "KB", "MB", "G", "T", "PT"];
  let l = 1;
  let r = 1024;
  let rt = size;

  for (let i = 0; i < 6; i++) {
    if (between(size, l, r)) {
      return `${rt.toFixed(2)} ${units[i]}`;
    }
    l = r;
    r = r * 1024;
    rt /= 1024;
  }

  return `${rt.toFixed(2)} ${units[5]}`;
}
