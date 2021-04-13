import React, { Dispatch, FC, useCallback } from "react"
import { TorrentStatus } from "./redux/state"

import { trackersList } from "@src/api/task";
import { fileSizePretties, useInterval } from "@src/utils";
import { GlobalActionType, GlobalReduxState } from "@src/redux";
import { useDispatch, useSelector } from "react-redux";
import { QBTrackerInfo } from "@src/common/task";

import { Table, Tag, Space } from 'antd';


// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
// });


interface HeaderType {
  title: string;
  dataIndex: keyof QBTrackerInfo;
}

const renderAA = (r: any) => <span>{r}</span>;


const columns: HeaderType[] = [
  {
    title: 'URL',
    dataIndex: 'url',
    // filters: [
    //   {
    //     text: 'Joe',
    //     value: 'Joe',
    //   },
    //   {
    //     text: 'Jim',
    //     value: 'Jim',
    //   },
    //   {
    //     text: 'Submenu',
    //     value: 'Submenu',
    //     children: [
    //       {
    //         text: 'Green',
    //         value: 'Green',
    //       },
    //       {
    //         text: 'Black',
    //         value: 'Black',
    //       },
    //     ],
    //   },
    // ],
    // // specify the condition of filtering result
    // // here is that finding the name started with `value`
    // onFilter: (value, record) => record.name.indexOf(value) === 0,
    // sorter: (a, b) => a.name.length - b.name.length,
    // sortDirections: ['descend'],
  },
  {
    title: 'Status',
    dataIndex: 'status',
    // defaultSortOrder: 'descend',
    // sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'User',
    dataIndex: 'num_leeches',
    // filters: [
    //   {
    //     text: 'London',
    //     value: 'London',
    //   },
    //   {
    //     text: 'New York',
    //     value: 'New York',
    //   },
    // ],
    // filterMultiple: false,
    // onFilter: (value, record) => record.address.indexOf(value) === 0,
    // sorter: (a, b) => a.address.length - b.address.length,
    // sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'User',
    dataIndex: 'num_seeds',
    // filters: [
    //   {
    //     text: 'London',
    //     value: 'London',
    //   },
    //   {
    //     text: 'New York',
    //     value: 'New York',
    //   },
    // ],
    // filterMultiple: false,
    // onFilter: (value, record) => record.address.indexOf(value) === 0,
    // sorter: (a, b) => a.address.length - b.address.length,
    // sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Downlaoded',
    dataIndex: 'num_downloaded',
    // filters: [
    //   {
    //     text: 'London',
    //     value: 'London',
    //   },
    //   {
    //     text: 'New York',
    //     value: 'New York',
    //   },
    // ],
    // filterMultiple: false,
    // onFilter: (value, record) => record.address.indexOf(value) === 0,
    // sorter: (a, b) => a.address.length - b.address.length,
    // sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Message',
    dataIndex: 'msg',
    // filters: [
    //   {
    //     text: 'London',
    //     value: 'London',
    //   },
    //   {
    //     text: 'New York',
    //     value: 'New York',
    //   },
    // ],
    // filterMultiple: false,
    // onFilter: (value, record) => record.address.indexOf(value) === 0,
    // sorter: (a, b) => a.address.length - b.address.length,
    // sortDirections: ['descend', 'ascend'],
  },
];


// function onChange(pagination, filters, sorter, extra) {
//   console.log('params', pagination, filters, sorter, extra);
// }



const TrackersTab: FC = () => {
  const dispatch = useDispatch<Dispatch<GlobalActionType>>();

  const { task: { torrents, currentSelected } } = useSelector(({ task }: GlobalReduxState) => ({ task, }));

  const hanlder = useCallback(async () => {
    if (currentSelected === null) {
      return [];
    }

    const { trackers } = await trackersList(currentSelected);
    dispatch({ type: "task/trackers/updated", payload: { hash: currentSelected, trackers } });
    return trackers;
  }, [currentSelected, ]);

  const initTrackers = currentSelected === null ? [] : torrents[currentSelected].trackers;
  const [trackers, lastExecuted] = useInterval(3000, hanlder, initTrackers);

  const data = trackers.map((r, index) => ({ key: `${index}`, ...r }));

  return <>
    <Table columns={columns} dataSource={data} />
  </>
}


export default TrackersTab;
