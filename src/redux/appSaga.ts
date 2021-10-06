import { getMovies } from './../api/axiosAPI';
import {call, put, takeEvery} from 'redux-saga/effects'
import {GET_MOVIES_LIST, setMoviesList} from './appReducer'

export function* sagaWatcher() {
    yield takeEvery(GET_MOVIES_LIST, sagaWorker)
}

function* sagaWorker(): any {
    const movies = yield call(getMovies)
    yield put(setMoviesList(movies))
}