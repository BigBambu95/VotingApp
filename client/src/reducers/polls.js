import { 
    FETCH_POLLS_REQUEST, FETCH_POLLS_SUCCESS, FETCH_POLLS_FAILURE,
    CREATE_POLL_SUCCESS
} from '../constants';
import { polls } from '../actions';

const pollList = (state, action) => {
    if(state === undefined) {
        return {
            polls: [],
            loading: true,
            error: null
        }
    }

    switch (action.type) {
        case FETCH_POLLS_REQUEST:
            return {
                ...state,
                polls: [],
                loading: true,
                error: null
            }

        case FETCH_POLLS_SUCCESS:
            return {
                ...state,
                polls: action.payload,
                loading: false,
                error: null
            }

        case FETCH_POLLS_FAILURE:
            return {
                ...state,
                polls: [],
                loading: false,
                error: action.payload
            }


        default:
            return state;
    }
}

export default pollList;