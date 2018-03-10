import * as firebase from 'firebase';

export const getUser = (userId) => {
  let user = firebase.database().ref('/users');
  user.once('value', (snapshot) => {
      return snapshot
    });
}
