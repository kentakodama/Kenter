
export const RECEIVE_USERS_PROFILES = 'RECEIVE_USERS_PROFILES';

export const receiveUsersProfiles = (users) => ({
  type: RECEIVE_USERS_PROFILES,
  users
});
