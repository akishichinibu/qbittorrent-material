import React, { Dispatch, FC, useCallback } from "react";
import ReactDOM from "react-dom";
import { Provider, useDispatch } from "react-redux";
import { torrentsList } from "./api/task";

import DashBoard from "./page/Dashboard";
import { GlobalActionType, globalStore } from "./redux";
import { useInterval } from "./utils";


const Main: FC = () => {
  const dispatch = useDispatch<Dispatch<GlobalActionType>>();

  const hanlder = useCallback(async () => {
    const torrents = await torrentsList();
    dispatch({ type: "task/torrents/updated", payload: { torrents } });
    return torrents;
  }, []);
  
  const [_, lastExecuted] = useInterval(3000, hanlder, []);

  return <>
    <DashBoard></DashBoard>
  </>
}


const ReduxMain: FC = () => {
  return <>
    <Provider store={globalStore}>
      <Main />
    </Provider>
  </>
}


ReactDOM.render(<ReduxMain />, document.getElementById("root"));
