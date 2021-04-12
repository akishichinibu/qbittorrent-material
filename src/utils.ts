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


export function fromEntries<V>(params: Iterable<[string, V]>): { [key: string] : V } {
  let buffer: { [key: string] : V } = {};
  for (let [k, v] of params) buffer[k] = v;
  return buffer;
}
