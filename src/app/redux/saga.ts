import { Action } from 'redux';
import { takeLatest, put, all, call } from 'redux-saga/effects';


import { login } from '@src/api/login';
import { apiVersion, applicationVersion } from '@src/api/version';
import { ActionLiteral, LoginRequestAT, LoginSuccessAT, VersionUpdatedAT, VersionRequestedAT } from './action';


function* userLogin(action: LoginRequestAT) {
  const { username, password } = action.payload;
  const { success, cookie } = yield call(login, username, password);

  if (success) {
    yield [
      put<LoginSuccessAT>({ type: "app/login/successed", payload: { cookie } }),
      put<VersionRequestedAT>({ type: "app/version/requested", payload: null }),
    ];
  } else {
    yield put<Action<ActionLiteral>>({ type: "app/login/failed" });
  }
}


function* watchUserLogin() {
  yield takeLatest<LoginRequestAT>("app/login/requested", userLogin);
}


function* versionUpdate() {
  const [{ apv }, { aiv }] = yield [
    call(applicationVersion),
    call(apiVersion),
  ];

  yield put<VersionUpdatedAT>({
    type: "app/version/updated",
    payload: {
      apiVersion: aiv,
      appVersion: apv,
    }
  });
}


function* watchVersionUpdate() {
  yield takeLatest<VersionRequestedAT>("app/version/requested", versionUpdate);
}


export default function* AppSaga() {
  yield all([
    watchUserLogin(),
    watchVersionUpdate(),
  ]);
}
