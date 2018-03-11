import { RECEIVE_USER } from '../actions/user_actions.js';
// import merge from 'lodash/merge';

const defaultState = {};

const UserReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USER:
    console.log('reducer, state', action.user);
      return action.user;
    default:
      return state;
  }
};

export default UserReducer;
