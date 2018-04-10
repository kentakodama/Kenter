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

export const createThread = (newThreadId, firstUser, secondUser) => {
  const threadRef = db.ref(`threads/${newThreadId}`);
  const newThread = {
    id: newThreadId,
    members: {0: `${firstUser.displayName}`, 1: `${secondUser.name}`}
  }
  threadRef.set(newThread)
  storeThreadIdInUsers(newThreadId, firstUser.uid, secondUser.id)
}

export const storeThreadIdInUsers = (threadId, firstUserId, secondUserId) => {
  const threadObject = {}
  threadObject[`${threadId}`] = true;
  const firstUserThreads = db.ref(`users/${firstUserId}/threads`);
  const secondUserThreads = db.ref(`users/${secondUserId}/threads`);
  firstUserThreads.update(threadObject)
  secondUserThreads.update(threadObject)

}
