import React, { Dispatch, FC, useCallback } from "react"
import { Box, Collapse, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core"
import { QBTrackerInfo } from "@src/common/task";
import { trackersList } from "@src/api/task";
import { TrackersUpdatedAT } from "./redux/action";
import { useInterval } from "@src/utils";
import { useDispatch } from "react-redux";


const tableFieldMapping: Map<string, keyof QBTrackerInfo> = new Map([
  ["url", "url"],
  ["status", "status"],
  ["tier", "tier"],
  ["num_peers", "num_peers"],
  ["num_seeds", "num_seeds"],
  ["num_leeches", "num_leeches"],
  ["num_downloaded", "num_downloaded"],
]);


interface PropsType {
  hash: string;
  open: boolean;
}


const TrackerList: FC<PropsType> = ({ hash, open }) => {
  const dispatch = useDispatch<Dispatch<TrackersUpdatedAT>>();

  const hanlder = useCallback(async () => {
    const { trackers } = await trackersList(hash);
    dispatch({ type: "task/trackers/updated", payload: { hash, trackers } });
    return trackers;
  }, [hash, ]);
  
  const [trackers, lastExecuted] = useInterval(3000, hanlder, []);

  return <>
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Box margin={1}>
        <Typography variant="h6" gutterBottom component="div">trackers({lastExecuted})</Typography>
        <Table size="small" aria-label="trackers">
          <TableHead>
            <TableRow>
              {Array.from(tableFieldMapping.keys()).map(r => <TableCell align="right">{r}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {trackers.map((r) => {
              return <>
                <TableRow key={r.url}>
                  {Array.from(tableFieldMapping.values()).map(k => <TableCell align="right">{r[k]}</TableCell>)}
                </TableRow>
              </>
            })}
          </TableBody>
        </Table>
      </Box>
    </Collapse>
  </>
}


export default TrackerList;
