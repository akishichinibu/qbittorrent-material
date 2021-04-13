import React, { FC } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import Main from "./Main";
import { globalStore } from "./redux";


const ReduxMain: FC = () => {
  return <>
    <Provider store={globalStore}>
      <Main />
    </Provider>
  </>
}


ReactDOM.render(<ReduxMain />, document.getElementById("root"));
