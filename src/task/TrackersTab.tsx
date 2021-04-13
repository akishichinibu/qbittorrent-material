import React, { Dispatch, FC, useCallback } from "react"
import { TorrentStatus } from "./redux/state"

import { makeStyles, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import { trackersList } from "@src/api/task";
import { useInterval } from "@src/utils";
import { GlobalActionType, GlobalReduxState } from "@src/redux";
import { useDispatch, useSelector } from "react-redux";


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


const TrackersTab: FC<TorrentStatus> = () => {
  const classes = useStyles();
  const dispatch = useDispatch<Dispatch<GlobalActionType>>();

  const { task: { torrents, currentSelected } } = useSelector(({ task }: GlobalReduxState) => ({ task, }));

  const hanlder = useCallback(async () => {
    if (currentSelected === null) {
      return [];
    }

    const { trackers } = await trackersList(currentSelected);
    dispatch({ type: "task/trackers/updated", payload: { hash: currentSelected, trackers } });
    return trackers;
  }, []);
  
  const initTrackers = currentSelected === null ? [] : torrents[currentSelected].trackers;
  const [trackers, lastExecuted] = useInterval(3000, hanlder, initTrackers);

  return <>
    <div>{lastExecuted}</div>
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Level</TableCell>
            <TableCell align="right">URL</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">User</TableCell>
            <TableCell align="right">Seeds</TableCell>
            <TableCell align="right">Download</TableCell>
            <TableCell align="right">Message</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trackers.map((r, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">{r.tier}</TableCell>
              <TableCell align="right">{r.url}</TableCell>
              <TableCell align="right">{r.status}</TableCell>
              <TableCell align="right">{r.num_leeches}</TableCell>
              <TableCell align="right">{r.num_seeds}</TableCell>
              <TableCell align="right">{r.num_downloaded}</TableCell>
              <TableCell align="right">{r.msg}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
}


export default TrackersTab;
