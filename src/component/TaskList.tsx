import React, { FC, useEffect, useState } from "react"
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

import { TorrentInfo, torrentsList } from "@api/task";
import { useInterval } from "../utils";
import { TrackerList } from "./TrackerList";


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


const fetchTaskList = async () => (await torrentsList()).taskList;


interface HeadCell {
  disablePadding: boolean;
  id: keyof TorrentInfo;
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
  field: keyof TorrentInfo;
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

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, orderBy, numSelected, rowCount } = props;

  return <>
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            // onChange={onSelectAllClick}
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


export const TaskList: FC = () => {
  const classes = useStyles();
  const [taskList, lastExecuted] = useInterval<TorrentInfo[]>(1, fetchTaskList, []);

  const [selectedStatus, setSelectedStatus] = useState<Map<string, boolean>>(new Map());
  const [openStatus, setOpenStatus] = useState<Map<string, boolean>>(new Map());

  useEffect(() => {
    setSelectedStatus(old => new Map(taskList.map(({ hash, }) => [hash, old.has(hash) ? old.get(hash)! : false])));
  }, [taskList,]);

  useEffect(() => {
    setOpenStatus(old => new Map(taskList.map(({ hash, }) => [hash, old.has(hash) ? old.get(hash)! : false])));
  }, [taskList,]);

  const handleCheckboxClick = (hash: string) => {
    setSelectedStatus(old => new Map(old.set(hash, !old.get(hash))));
  }

  const handleCollapseClick = (hash: string) => {
    setOpenStatus(old => new Map(old.set(hash, !old.get(hash))));
  }

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
          numSelected={0}
          orderBy={"name"}
          rowCount={taskList.length}
        />
        <TableBody>
          {taskList.map(r => {
            return <>
              <TableRow
                hover
                onClick={() => handleCheckboxClick(r.hash)}
                role="checkbox"
                aria-checked={false}
                tabIndex={-1}
                key={r.hash}
                selected={selectedStatus.get(r.hash) || false}
              >

                <TableCell padding="checkbox">
                  <Checkbox checked={selectedStatus.get(r.hash) || false} inputProps={{ 'aria-labelledby': r.hash }} />
                </TableCell>

                <TableCell>
                  <IconButton aria-label="expand row" size="small" onClick={() => handleCollapseClick(r.hash)}>
                    {(openStatus.get(r.hash) || false) ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
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
                  <TrackerList hash={r.hash} open={openStatus.get(r.hash) || false} />
                </TableCell>
              </TableRow>
            </>;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  </>
}