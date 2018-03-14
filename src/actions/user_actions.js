import * as APIUtil from '../api_util/api_util.js';

export const RECEIVE_USER = 'RECEIVE_USER';
// export const INITIALIZE_USER = 'INITIALIZE_USER';

export const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user
});


// export const getUser = (id) => dispatch => (
//   APIUtil.getUser(id).then(resp => dispatch(receiveUser(resp)))
// )

export const updateUserAboutMe = (user) => dispatch => (
  APIUtil.postUserAboutMe(user)
)
