import { TOGGLE_POINTER_EVENTS } from '../actions/utilities_actions.js';

const defaultState = {pointerEvents: false};

const UtilitiesReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case TOGGLE_POINTER_EVENTS:
      console.log(!state.pointerEvents);
      return {pointerEvents: !state.pointerEvents}
    default:
      return state;
  }
};

export default UtilitiesReducer;
