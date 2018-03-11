import * as firebase from 'firebase';

export const getUser = (userId) => {
  console.log('in api util');
  let user = firebase.database().ref(`/users/${userId}`);
  user.once('value', (snapshot) => {
      return snapshot.val();

    });
}
