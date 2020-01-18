import { FETCH_POLL_REQUEST, FETCH_POLL_SUCCESS, FETCH_POLL_FAILURE } from '../constants';

const pollActions = {
    pollRequest: () => FETCH_POLL_REQUEST,
    pollLoaded: (poll) => {
        return {
            payload: poll,
            type: FETCH_POLL_SUCCESS
        }
    },
    pollError: (err) => {
        return {
            payload: err,
            type: FETCH_POLL_FAILURE
        }
    }
}

export default pollActions;