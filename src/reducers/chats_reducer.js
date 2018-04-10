import { RECEIVE_MESSAGES} from '../actions/chats_actions.js';
import { orderMessages } from './selectors'


const defaultState = [];

const ChatsReducer = (state = defaultState, action) => {

  switch (action.type) {
    case RECEIVE_MESSAGES:
      return orderMessages(action.messages)
    default:
      return state;
  }
};

export default ChatsReducer;
