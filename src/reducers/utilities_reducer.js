import { TOGGLE_POINTER_EVENTS } from '../actions/utilities_actions.js';

const defaultState = {pointerEvents: 'auto'};

const UtilitiesReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case TOGGLE_POINTER_EVENTS:
      if(state.pointerEvents === 'auto') {
        return {pointerEvents: 'none'}
      } else {
        return {pointerEvents: 'auto'}
      }
    default:
      return state;
  }
};

export default UtilitiesReducer;
