import { call, apply, put, takeEvery, take, select, fork } from 'redux-saga/effects';
import {LOAD_USERS, LOAD_USERS_FAILURE, LOAD_USERS_SUCCESS} from '../../reducers/people/actions';
import { LOCATION_CHANGE } from 'connected-react-router';
import { selectPeople } from '../../reducers/people/selectors';
import { matchPath } from 'react-router';
import { getRouteConfig, MAIN_ROUTE, PEOPLE_DETAILS_ROUTE } from '../../../routes';
import {
    LOAD_USER_DETAILS,
    LOAD_USER_DETAILS_FAILURE,
    LOAD_USER_DETAILS_SUCCESS
} from '../../reducers/peopleDetails/actions';

export function* loadPeopleDetails({ payload }) {
    const { id } = payload;

    try {
        const request = yield call(
            fetch,
            `https://swapi.dev/api/people/${id}`
        );

        const people = yield apply(request, request.json);

        yield put({
            type: LOAD_USER_DETAILS_SUCCESS,
            payload: people,
        });
    } catch (err) {
        yield put({
            type: LOAD_USER_DETAILS_FAILURE,
            payload: err,
        });
    }
}

export function* loadPeopleList({ payload }) {
    const { page, search } = payload;

    try {
        const request = yield call(
            fetch,
            `https://swapi.dev/api/people?page=${page}&search=${search}`
        );
        const data = yield apply(request, request.json);

        yield put({
            type: LOAD_USERS_SUCCESS,
            payload: data,
        });
    } catch (err) {
        yield put({
            type: LOAD_USERS_FAILURE,
            payload: err,
        });
    }

}

export function* routeChangeSaga() {
    while (true) {
        const action = yield take(LOCATION_CHANGE);

        if (matchPath(action.payload.location.pathname, getRouteConfig(MAIN_ROUTE))) {
            const { page, search } = yield select(selectPeople);

            yield put({
                type: LOAD_USERS,
                payload: { page, search }
            });
        }

        const detailsPage = matchPath(action.payload.location.pathname, getRouteConfig(PEOPLE_DETAILS_ROUTE));

        if (detailsPage) {
            const { id } = detailsPage.params;

            if (id) {
                yield put({
                    type: LOAD_USER_DETAILS,
                    payload: { id }
                })
            }
        }
    }
}

export default function* peopleSaga() {
    yield fork(routeChangeSaga);
    yield takeEvery(LOAD_USERS, loadPeopleList);
    yield takeEvery(LOAD_USER_DETAILS, loadPeopleDetails);
}
