import { RECEIVE_USERS_PROFILES} from '../actions/gallery_actions.js';
import { convertUsersToArray } from './selectors'

const defaultState = [];

const UserReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USERS_PROFILES:
      return convertUsersToArray(action.users);
    default:
      return state;
  }
};

export default UserReducer;
