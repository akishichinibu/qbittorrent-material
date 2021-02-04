import React, { FC, useState } from "react";
import ReactDOM from "react-dom";
import { checkHasAuth } from "./api/utils";

import { LoginModal } from "./component/LoginModal";
import DashBoard from "./page/Dashboard";


const Main: FC = () => {
  const [hasAuth, setHasAuth] = useState<boolean>(checkHasAuth());

  if (hasAuth) {
    return <DashBoard></DashBoard>;
  } else {
    return <LoginModal open={hasAuth === false} onLoginSuccess={() => setHasAuth(true)}/>
  }
}


ReactDOM.render(<Main />, document.getElementById("root"));
