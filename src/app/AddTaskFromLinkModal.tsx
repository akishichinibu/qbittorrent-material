import React, { Dispatch, FC, useState } from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { LoginRequestAT } from './redux/action';
import { InputLabel, Select, MenuItem, Grid, Checkbox, FormControlLabel, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    width: "95%",
    height: "100%",
  },
}));


interface PropsType {
  open: boolean;
  handleClose: () => any;
}


const AddTaskForm = [
  {
    field: "url",
    type: "TextField",
  },
  {
    field: "saveTo",
    type: "TextField",
  },
  {
    field: "rename",
    type: "TextField",
  },
  {
    field: "saveTo",
    type: "TextField",
  },
  {
    field: "saveTo",
    type: "TextField",
  },
  {
    field: "saveTo",
    type: "TextField",
  },
  {
    field: "saveTo",
    type: "TextField",
  },
  {
    field: "saveTo",
    type: "TextField",
  },
  {
    field: "saveTo",
    type: "TextField",
  },
];


const AddTaskFromLinkModal: FC<PropsType> = ({ open, handleClose }) => {
  const classes = useStyles();

  const [url, setUrl] = useState<string>("");
  const [torrentManageMode, setTorrentManageMode] = useState<"Manual" | "Automatic">("Manual");

  const dispatch = useDispatch<Dispatch<LoginRequestAT>>();

  const handleLogin = () => {
  }

  return <>
    <div>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent className={classes.content}>

          <Typography variant="h6" gutterBottom>
            Shipping address
      </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First name"
                fullWidth
                autoComplete="given-name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last name"
                fullWidth
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="address1"
                name="address1"
                label="Address line 1"
                fullWidth
                autoComplete="shipping address-line1"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="address2"
                name="address2"
                label="Address line 2"
                fullWidth
                autoComplete="shipping address-line2"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="city"
                name="city"
                label="City"
                fullWidth
                autoComplete="shipping address-level2"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField id="state" name="state" label="State/Province/Region" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="zip"
                name="zip"
                label="Zip / Postal code"
                fullWidth
                autoComplete="shipping postal-code"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="country"
                name="country"
                label="Country"
                fullWidth
                autoComplete="shipping country"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                label="Use this address for payment details"
              />
            </Grid>
          </Grid>

          {/* <DialogContentText>
            从 URL 或磁力链接下载 Torrent
          </DialogContentText>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                autoFocus
                margin="dense"
                id="url"
                label="url"
                type="text"
                value={url}
                rows={10}
                onChange={e => setUrl(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>

              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={torrentManageMode}
                onChange={e => setTorrentManageMode(e.target.value as any)}
              >
                <MenuItem value={"Manual"}>Manual</MenuItem>
                <MenuItem value={"Automatic"}>Automatic</MenuItem>
              </Select>
            </Grid>
          </Grid> */}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogin} color="primary">
            Login
          </Button>
        </DialogActions>

      </Dialog>
    </div>
  </>;
}


export default AddTaskFromLinkModal;
