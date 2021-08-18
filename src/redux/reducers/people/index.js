import { LOAD_USERS, LOAD_USERS_FAILURE, LOAD_USERS_SUCCESS } from './actions';

const initialState = {
    page: 1,
    search: '',
    loading: false,
    error: null,
    data: null,
}

export default function c(state= initialState, action) {
    switch (action.type) {
        case LOAD_USERS:
            const { page, search } = action.payload;

            return {
                ...state,
                page,
                search,
                loading: true
            };
        case LOAD_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            };
        case LOAD_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default: {
            return state;
        }
    }
}
