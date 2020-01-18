import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducers';

const logMiddleware = () => next => action => {
  console.log(action.type);
  return next(action);
};

const stringMiddleware = () => next => action => {
  if(typeof action === 'string') {
    return next({
      type: action
    });
  }

  return next(action);
};

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(stringMiddleware),
    )
);

export default store;