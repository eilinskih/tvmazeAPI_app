import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from 'redux-saga';

import { sagaWatcher } from './appSaga'
import appReducer from "./appReducer";

const saga = createSagaMiddleware();
const rootReducer = combineReducers({
appState: appReducer
});
const store = createStore(rootReducer, applyMiddleware(saga));
saga.run(sagaWatcher);

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;
export type AppDispatch = typeof store.dispatch;

export default store;