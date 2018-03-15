import { RECEIVE_USER, ADD_PHOTO_REFERENCE} from '../actions/user_actions.js';
import { handleAddReference } from './selectors'


const defaultState = {};

const UserReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USER:
      return action.user;
    case ADD_PHOTO_REFERENCE:
      return handleAddReference(state, action.photoId)
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
