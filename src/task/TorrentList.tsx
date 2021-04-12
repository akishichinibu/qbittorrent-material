import React, { Dispatch, FC, useCallback } from "react"
import {
  Checkbox,
  createStyles,
  IconButton,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Theme
} from "@material-ui/core"

import { KeyboardArrowUp, KeyboardArrowDown } from '@material-ui/icons';
import { QBTorrentInfo, QBTrackerInfo } from "@src/common/task";
import { useDispatch, useSelector } from "react-redux";
import { TaskStateType } from "./redux/state";
import { PresentTriggerAT, TaskGAT } from "./redux/action";
import TrackerList from "./TrackerList";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }),
);


interface HeadCell {
  disablePadding: boolean;
  id: keyof QBTorrentInfo;
  label: string;
  numeric: boolean;
}


const headCells: HeadCell[] = [
  { id: 'name', numeric: false, disablePadding: true, label: 'name' },
  { id: 'downloaded', numeric: true, disablePadding: false, label: 'downloaded' },
  { id: 'dlspeed', numeric: true, disablePadding: false, label: 'dlspeed' },
  { id: 'completed', numeric: true, disablePadding: false, label: 'completed' },
  { id: 'max_ratio', numeric: true, disablePadding: false, label: 'max_ratio' },
];


interface CellInfo {
  label: string;
  field: keyof QBTorrentInfo;
  numeric: boolean;
  disablePadding: boolean;
}


const tableFieldMapping: Map<string, CellInfo> = new Map([
  ["name", {
    label: "name",
    field: "name",
    numeric: false,
    disablePadding: true,
  }],
  ["name", {
    label: "name",
    field: "name",
    numeric: false,
    disablePadding: true,
  }],
  ["name", {
    label: "name",
    field: "name",
    numeric: false,
    disablePadding: true,
  }],
  ["name", {
    label: "name",
    field: "name",
    numeric: false,
    disablePadding: true,
  }],
]);


interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  // onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  // onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // order: Order;
  orderBy: string;
  rowCount: number;
}


const EnhancedTableHead: FC<EnhancedTableProps> = ({ classes, orderBy, numSelected, rowCount }) => {
  const dispatch = useDispatch<Dispatch<PresentTriggerAT>>();

  const onSelectAllClick = useCallback(() => {
    dispatch({
      type: "task/present/trigger", payload: {
        hash: "",
        operation: "toSelectAll",
      }
    })
  }, []);

  return <>
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        <TableCell>

        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={'asc'}
            // onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  </>;
}


export const TaskList: FC<{ task: TaskStateType; }> = ({ task: { torrents } }) => {
  const classes = useStyles();
  const dispatch = useDispatch<Dispatch<PresentTriggerAT>>();

  const handleCheckboxClick = useCallback((hash: string) => {
    dispatch({
      type: "task/present/trigger",
      payload: {
        operation: "selected",
        hash,
      }
    });
  }, []);

  const handleCollapseClick = useCallback((hash: string) => {
    dispatch({
      type: "task/present/trigger",
      payload: {
        operation: "expanded",
        hash,
      }
    });
  }, []);

  const nTotal = Object.keys(torrents).length;
  const nSelected = Object.entries(torrents).filter(([_, { pannel }]) => pannel.selected).length;

  return <>
    <TableContainer>
      <Table
        className={classes.table}
        aria-labelledby="tableTitle"
        size='small'
        aria-label="enhanced table"
      >
        <EnhancedTableHead
          classes={classes}
          numSelected={nSelected}
          orderBy={"name"}
          rowCount={nTotal}
        />
        <TableBody>
          {Object.entries(torrents).map(([hash, { info: r, pannel }]) => {
            const { selected, open } = pannel;

            return <>
              <TableRow
                hover
                onClick={() => handleCheckboxClick(hash)}
                role="checkbox"
                aria-checked={false}
                tabIndex={-1}
                key={hash}
                selected={selected}
              >

                <TableCell padding="checkbox">
                  <Checkbox checked={selected} inputProps={{ 'aria-labelledby': hash }} />
                </TableCell>

                <TableCell>
                  <IconButton aria-label="expand row" size="small" onClick={() => handleCollapseClick(hash)}>
                    {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                  </IconButton>
                </TableCell>

                <TableCell component="th" id={r.hash} scope="row" padding="none">
                  {r.name}
                </TableCell>

                <TableCell align="right">{r.downloaded}</TableCell>
                <TableCell align="right">{r.dlspeed}</TableCell>
                <TableCell align="right">{r.completed}</TableCell>
                <TableCell align="right">{r.max_ratio}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                  {open && <TrackerList hash={hash} open={open} />}
                </TableCell>
              </TableRow>
            </>;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  </>
}
