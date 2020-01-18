import { 
    CREATE_POLL_REQUEST, CREATE_POLL_SUCCESS, CREATE_POLL_FAILURE
} from '../constants';

const createPollReducer = (state, action) => {
    if(state === undefined) {
        return {
            loading: false,
            error: null
        }
    }
    
    switch (action.type) {
        case CREATE_POLL_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }

        case CREATE_POLL_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            }

        case CREATE_POLL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
    
        default:
            return state;
    }

}

export default createPollReducer;