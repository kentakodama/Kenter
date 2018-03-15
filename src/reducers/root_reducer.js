import { combineReducers } from 'redux';

import UserReducer from './user_reducer';
import AlbumReducer from './album_reducer';

const RootReducer = combineReducers({
  user: UserReducer,
  album: AlbumReducer
});

export default RootReducer;
