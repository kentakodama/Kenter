import { RECEIVE_MESSAGES, RECEIVE_CHAT_INFO } from '../actions/chats_actions.js';
import { orderMessages } from './selectors'


const defaultState = {};

const ChatsReducer = (state = defaultState, action) => {
  let newState = {};
  switch (action.type) {
    case RECEIVE_MESSAGES:
      newState = Object.assign({}, state)
      newState[action.thread.id] = { members: action.thread.members, messages: orderMessages(action.thread.messages)}
      return newState;
    case RECEIVE_CHAT_INFO:
      newState = Object.assign({}, state)
      newState[`${action.chatInfo.id}`] = { members: action.chatInfo.members, messages: [] };
      return newState;
    default:
      return state;
  }
};

export default ChatsReducer;
