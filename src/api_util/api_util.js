import firebase from '../firebase';
import random from 'random-key-generator'

const db = firebase.database();

export const getUser = (userId) => {
  console.log('in api util');
  let user = db.ref(`/users/${userId}`);
  user.once('value', (snapshot) => {
      return snapshot.val();

    });
}


export const postNewUser = (user) => {
    const userRef = db.ref(`users/${user.id}`);
    userRef.set(user) // to database
    const userPhotoRef = db.ref(`users/${user.id}/photoReferences`);
    userPhotoRef.set({ 0: user.photoURL})
}


export const postUserAboutMe = (user) => {
  const userAboutRef = db.ref(`users/${user.id}/about`);
  userAboutRef.set(user.about)
}

export const postPhotoReference = (user, photoURL) => {
  const userPhotoRef = db.ref(`users/${user.uid}/photoReferences`);
  let updates = {};
  const key = random(64)
  updates[`${key}`] = photoURL;
  userPhotoRef.update(updates)
}

export const postLikeId = (user, likeId) => {
  console.log('api util', likeId);
  const likeIdsRef = db.ref(`users/${user.uid}/likeIds`);
  let updates = {};
  updates[`${likeId}`] = true;
  likeIdsRef.update(updates)
}
