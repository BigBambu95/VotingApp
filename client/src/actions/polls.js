import { 
    FETCH_POLLS_REQUEST, FETCH_POLLS_SUCCESS, FETCH_POLLS_FAILURE,
    CREATE_POLL_REQUEST, CREATE_POLL_SUCCESS, CREATE_POLL_FAILURE
} from '../constants';

const polls = {
    pollsRequest: () => FETCH_POLLS_REQUEST,
    pollsLoaded: (polls) => {
        return {
            payload: polls,
            type: FETCH_POLLS_SUCCESS
        }
    },
    pollsError: (err) => {
        return {
            payload: err,
            type: FETCH_POLLS_FAILURE
        }
    },
    createPollRequest: () => CREATE_POLL_REQUEST,
    createPollLoaded: (poll) => {
        return {
            payload: poll,
            type: CREATE_POLL_SUCCESS
        }
    },
    createPollError: (err) => {
        return {
            payload: err,
            type: CREATE_POLL_FAILURE
        }
    }
}

export default polls;