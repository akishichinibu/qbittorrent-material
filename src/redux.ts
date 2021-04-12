import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { reducer as taskReducer } from "@src/task/redux/reducer";
import { TaskStateType as TaskStateType } from "@src/task/redux/state";
import { TaskGAT } from "@src/task/redux/action";

import { reducer as appReducer } from "@src/app/redux/reducer";
import { AppStateType } from "@src/app/redux/state";
import { AppGAT } from "@src/app/redux/action";
import RootSaga from './saga';


export interface GlobalReduxState {
  app: AppStateType;
  task: TaskStateType;
}


export const reducer = combineReducers({
  app: appReducer,
  task: taskReducer,
});


const sagaMiddleware = createSagaMiddleware();

// @ts-ignore
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const globalStore = createStore(
  reducer,
  composeEnhancer(applyMiddleware(sagaMiddleware)),
);


RootSaga.map(s => sagaMiddleware.run(s));

export type GlobalActionType = TaskGAT | AppGAT;

globalStore.subscribe(() => console.log(globalStore.getState()));
