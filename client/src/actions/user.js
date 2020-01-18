import { LOGIN, LOGOUT } from '../constants';

const userActions = {
    login: (username) => {
        return {
            payload: username,
            type: LOGIN
        }
    },
    logout: () => LOGOUT
}

export default userActions;