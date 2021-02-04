import React, { FC, useState } from "react"
import { Button, Checkbox, FormControl, FormControlLabel, Grid, Link, makeStyles, Modal, TextField } from "@material-ui/core"
import { login } from "../api/login";


interface PropsType {
  open: boolean;
  onLoginSuccess: () => any;
}


const useStyles = makeStyles((theme) => ({
  root: {
    height: 300,
    flexGrow: 1,
    minWidth: 300,
    transform: 'translateZ(0)',
    // The position fixed scoping doesn't work in IE 11.
    // Disable this demo to preserve the others.
    '@media all and (-ms-high-contrast: none)': {
      display: 'none',
    },
  },
  modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export const LoginModal: FC<PropsType> = ({ open, onLoginSuccess }) => {
  const classes = useStyles();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isAuthInfoError, setIsAuthInfoError] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const onButtonClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(username, password);
    const { statusCode } = await login(username, password);

    switch (statusCode) {
      case 200: {
        onLoginSuccess();
        break;
      }
      case 401: {
        setIsAuthInfoError(true);
        setValidationError("error password");
        break;
      }
      case 403: {
        setValidationError("too many times");
        break;
      }
    }
  }

  return <>
    <Modal
      open={open}
      // onClose={handleClose}
      className={classes.modal}
      aria-labelledby="Login"
      aria-describedby="simple-modal-description"
    >
      <FormControl>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          error={isAuthInfoError}
          onChange={e => setUsername(e.target.value)}
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          error={isAuthInfoError}
          onChange={e => setPassword(e.target.value)}
          helperText={validationError === null ? undefined : validationError}
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={onButtonClick}
        >
          Sign In
          </Button>
      </FormControl>
    </Modal>
  </>
}
