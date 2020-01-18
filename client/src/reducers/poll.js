import { FETCH_POLL_REQUEST, FETCH_POLL_SUCCESS, FETCH_POLL_FAILURE, VOTE_POLL_SUCCESS } from '../constants';

const poll = (state, action) => {
    if(state === undefined) {
        return {
            data: {},
            loading: true,
            error: null
        }
    }

    switch (action.type) {
        case FETCH_POLL_REQUEST:
            return {
                ...state,
                data: {},
                loading: true,
                error: null
            }

        case FETCH_POLL_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: null
            }

        case FETCH_POLL_FAILURE:
            return {
                ...state,
                data: {},
                loading: false,
                error: action.payload
            }

        case VOTE_POLL_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: null
            }

        default:
            return state;
    }
}

export default poll;