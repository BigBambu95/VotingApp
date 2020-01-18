import { VOTE_POLL_REQUEST, VOTE_POLL_SUCCESS, VOTE_POLL_FAILURE } from '../constants';

const voteActions = {
    voteRequest: () => VOTE_POLL_REQUEST,
    voteSuccess: (poll) => {
        return {
            payload: poll,
            type: VOTE_POLL_SUCCESS
        }
    },
    voteError: (err) => {
        return {
            payload: err,
            type: VOTE_POLL_FAILURE
        }
    }
}

export default voteActions;