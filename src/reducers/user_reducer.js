import { RECEIVE_USER } from '../actions/user_actions.js';



const defaultState = {};

const UserReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USER:
      return action.user;
    case 'persist/REHYDRATE':
      if(!action.payload) {
        return {}
      } else {
        return action.payload.user
      }
    default:
      return state;
  }
};

export default UserReducer;
