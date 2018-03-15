import * as APIUtil from '../api_util/api_util.js';

export const RECEIVE_USER = 'RECEIVE_USER';
export const ADD_PHOTO_REFERENCE = 'ADD_PHOTO_REFERENCE';

export const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user
});

export const addPhotoReference = (photoId) => ({
  type: ADD_PHOTO_REFERENCE,
  photoId
});

export const createNewUser = (user) => dispatch => (
  APIUtil.postNewUser(user)
)

export const updateUserAboutMe = (user) => dispatch => (
  APIUtil.postUserAboutMe(user)
)
