import { 
    FETCH_POLL_REQUEST,
    VOTE_POLL_REQUEST, VOTE_POLL_SUCCESS, VOTE_POLL_FAILURE
} from '../constants';

const voteReducer = (state, action) => {
    if(state === undefined) {
        return {
            loading: false,
            error: null
        }
    }
    
    switch (action.type) {
        case FETCH_POLL_REQUEST:
            return {
                ...state,
                error: null
            }

        case VOTE_POLL_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }

        case VOTE_POLL_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            }

        case VOTE_POLL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
    
        default:
            return state;
    }

}

export default voteReducer;