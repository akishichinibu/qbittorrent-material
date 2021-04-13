import React, { Dispatch, FC, useCallback, useState } from 'react';
import clsx from 'clsx';

import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

import { useDispatch, useSelector } from 'react-redux';
import { GlobalActionType, GlobalReduxState } from '@src/redux';
import { PresentTriggerAT } from './redux/action';
import { torrentsList } from '@src/api/task';
import { fileSizePretties, useInterval } from '@src/utils';


interface HeadFieldType {
  name: string;
  size: number;
  ratio: number;
  status: string;
  seed: [number, number];
  user: [number, number];
  dlspeed: number;
  upspeed: number;
}


function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}


type Order = 'asc' | 'desc';


function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}


interface HeadCell {
  disablePadding: boolean;
  id: keyof HeadFieldType;
  label: string;
  numeric: boolean;
}


const headCells: HeadCell[] = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'size', numeric: true, disablePadding: false, label: 'Size' },
  { id: 'ratio', numeric: true, disablePadding: false, label: 'Ratio' },
  { id: 'status', numeric: false, disablePadding: false, label: '状态' },
  { id: 'seed', numeric: false, disablePadding: false, label: '种子' },
  { id: 'user', numeric: false, disablePadding: false, label: '用户' },
  { id: 'dlspeed', numeric: true, disablePadding: false, label: '下载速度' },
  { id: 'upspeed', numeric: true, disablePadding: false, label: '上传速度' },
];


interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof HeadFieldType) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}


const EnhancedTableHead: FC<EnhancedTableProps> = (props) => {
  const { classes, order, orderBy, onRequestSort } = props;

  const createSortHandler = (property: keyof HeadFieldType) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return <>
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
        </TableCell>

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}

      </TableRow>
    </TableHead>
  </>;
}


const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
        : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
    title: {
      flex: '1 1 100%',
    },
  }),
);


interface EnhancedTableToolbarProps {
  currentSelected: string | null;
}


const EnhancedTableToolbar: FC<EnhancedTableToolbarProps> = ({ currentSelected }) => {
  const classes = useToolbarStyles();
  const hasSelected = currentSelected !== null;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: hasSelected,
      })}
    >
      {hasSelected ? <>
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          hash: [{currentSelected}]
        </Typography>
      </> : <>
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Torrents
        </Typography>
      </>}
      {hasSelected ? <>
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </> : <>
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </>}
    </Toolbar>
  );
};


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
      paddingLeft: "5px",
      paddingRight: "5px",
      overflow: "hidden",
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


const TorrentsTable: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch<Dispatch<GlobalActionType>>();

  // Inside state
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof HeadFieldType>('name');

  // global state
  const { task: { torrents, currentSelected } } = useSelector(({ task }: GlobalReduxState) => ({ task, }));

  const hanlder = useCallback(async () => {
    const torrents = await torrentsList();
    dispatch({ type: "task/torrents/updated", payload: { torrents } });
    return torrents;
  }, []);

  const [_, lastExecuted] = useInterval(3000, hanlder, []);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof HeadFieldType) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "task/present/trigger", payload: { hash: "", operation: "selectAll" } })
  };

  const handleClick = (hash: string) => {
    if (currentSelected === hash) {
      dispatch({ type: "task/present/trigger", payload: { hash, operation: "unselected" } });
    } else {
      dispatch({ type: "task/present/trigger", payload: { hash, operation: "selected" } });
    }
  };

  const entriesTorrents = Object.entries(torrents);
  const nTotal = entriesTorrents.length;

  return <>
    <div className={classes.root}>
      <Paper className={classes.paper}>

        <EnhancedTableToolbar currentSelected={currentSelected} />

        <TableContainer>

          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="small"
            aria-label="enhanced table"
            stickyHeader
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={nTotal}
            />

            <TableBody>
              {entriesTorrents.map(([hash, { info }], index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                const selected = hash === currentSelected;

                return <>
                  <TableRow
                    hover
                    onClick={() => handleClick(hash)}
                    role="checkbox"
                    aria-checked={selected}
                    tabIndex={-1}
                    key={hash}
                    selected={selected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={false}
                        checked={hash === currentSelected}
                        onChange={() => handleClick(hash)}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                      />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="none">{info.name}</TableCell>
                    <TableCell align="right">{fileSizePretties(info.size)}</TableCell>
                    <TableCell align="right">{`${Math.floor(info.downloaded / info.size * 10000) / 100}%`}</TableCell>
                    <TableCell align="right">{info.state}</TableCell>
                    <TableCell align="right">{info.num_seeds}</TableCell>
                    <TableCell align="right">{info.num_leechs}</TableCell>
                    <TableCell align="right">{`${fileSizePretties(info.dlspeed)}/s`}</TableCell>
                    <TableCell align="right">{`${fileSizePretties(info.upspeed)}/s`}</TableCell>
                  </TableRow>
                </>;
              })}
            </TableBody>

          </Table>
        </TableContainer>

      </Paper>

    </div>
  </>;
}


export default TorrentsTable;
