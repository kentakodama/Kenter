import firebase from '../firebase';


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
  console.log('posting photo reference', user, photoURL);
  const userPhotoRef = db.ref(`users/${user.uid}/photoReferences`);
  let updates = {};
  const key = Math.floor(Math.random() * Math.floor(100))
  updates[`${key}`] = photoURL;
  userPhotoRef.update(updates)
}
