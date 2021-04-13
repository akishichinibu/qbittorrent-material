import React, { Dispatch, FC, useCallback } from "react";
import ReactDOM from "react-dom";
import { Provider, useDispatch } from "react-redux";
import { torrentsList } from "./api/task";

import DashBoard from "./page/Dashboard";
import { GlobalActionType, globalStore } from "./redux";
import { useInterval } from "./utils";


const Main: FC = () => {
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
