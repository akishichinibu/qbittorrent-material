import React, { Dispatch, FC, useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { LoginRequestAT } from './redux/action';


const LoginModal: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useDispatch<Dispatch<LoginRequestAT>>();

  const handleLogin = () => {
    dispatch({ type: "app/login/requested", payload: {
      username,
      password, 
    }});
  }

  return <>
    <div>
      <Dialog open={true} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>

          <DialogContentText>
            Enter the username and password please.
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            type="email"
            value={username}
            onChange={e => setUsername(e.target.value)}
            fullWidth
          />

          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleLogin} color="primary">
            Login
          </Button>
        </DialogActions>

      </Dialog>
    </div>
  </>;
}


export default LoginModal;
