import { takeLatest, put, all, call, StrictEffect } from 'redux-saga/effects'

import { torrentsList } from "@src/api/task";
import { TorrentsUpdatedAT } from './action';
import { QBTorrentInfo } from '@src/common/task';


export default function* sage() {
  yield all([
  ]);
}
