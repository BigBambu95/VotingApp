import { LOGIN, LOGOUT } from '../constants';

const user = (state, action) => {
    if(state === undefined) {
        return {
            username: '',
            isAuth: false
        }
    }


    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                username: action.payload,
                isAuth: true
            }

        case LOGOUT:
            return {
                ...state,
                username: '',
                isAuth: false
            }
        
        default:
            return state;
    }
}

export default user;