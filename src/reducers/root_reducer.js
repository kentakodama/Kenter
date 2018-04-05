import { combineReducers } from 'redux';

import UserReducer from './user_reducer';
import AlbumReducer from './album_reducer';
import GalleryReducer from './gallery_reducer';

const RootReducer = combineReducers({
  user: UserReducer,
  album: AlbumReducer,
  gallery: GalleryReducer
});

export default RootReducer;
