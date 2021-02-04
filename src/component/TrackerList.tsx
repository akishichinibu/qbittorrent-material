import React, { FC } from "react"
import { Box, Collapse, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core"
import { TrackerInfo, trackersList } from "../api/task";
import { useInterval } from "../utils";


interface PropsType {
  hash: string;
  open: boolean;
}


const tableFieldMapping: Map<string, keyof TrackerInfo> = new Map([
  ["url", "url"],
  ["status", "status"],
  ["tier", "tier"],
  ["num_peers", "num_peers"],
  ["num_seeds", "num_seeds"],
  ["num_leeches", "num_leeches"],
  ["num_downloaded", "num_downloaded"],
]);


export const TrackerList: FC<PropsType> = ({ hash, open }) => {
  const fetchTrackerList = async () => {
    return open ? (await trackersList(hash)).trackerList : [];
  };

  const [trackerInfo, lastExecuted] = useInterval<TrackerInfo[]>(1, fetchTrackerList, []);

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
            {trackerInfo.map((r) => {
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
