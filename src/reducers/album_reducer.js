import { ADD_PHOTO, DELETE_PHOTO } from '../actions/album_actions.js';

import { deletePhoto } from './selectors'


const defaultState = [];

const AlbumReducer = (state = defaultState, action) => {
  // Object.freeze(state);
  switch (action.type) {
    case ADD_PHOTO:
    console.log('state.photos', state);
    console.log('action.photo', action.photo)
      return [...state, action.photo]
    // case DELETE_PHOTO:
      // return deletePhoto(state, action.photoId)
    case 'persist/REHYDRATE':
      if(!action.payload) {
        return []
      } else {
        return action.payload.album
      }
    default:
      return state;
  }
};

export default AlbumReducer;
