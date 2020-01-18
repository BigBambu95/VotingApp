import { combineReducers } from 'redux';

import pollList from './polls';
import poll from './poll';
import user from './user';
import createPollReducer from './create-poll';
import voteReducer from './vote';

export default combineReducers({
    pollList,
    poll,
    user,
    createPollReducer,
    voteReducer
});