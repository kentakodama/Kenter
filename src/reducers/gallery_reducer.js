import { RECEIVE_USERS_PROFILES} from '../actions/gallery_actions.js';
import { convertUsersToArray } from './selectors'

const defaultState = [];

const GalleryReducer = (state = defaultState, action) => {

  switch (action.type) {
    case RECEIVE_USERS_PROFILES:
      return convertUsersToArray(action.users);
    default:
      return state;
  }
};

export default GalleryReducer;
