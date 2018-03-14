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
}


export const postUserAboutMe = (user) => {
  const userAboutRef = db.ref(`users/${user.id}/about`);
  console.log('api_util', user.about);
  userAboutRef.set(user.about)
}

// export const postNewUser = (user, id) => {
//
//     let userRef = db.ref(`users/${id}`);
//     console.log('creating new user', user);
//
//     const newUser = {
//       id,
//       name: user.displayName,
//       photoURL: user.photoURL,
//       about: 'Tell us about yourself'
//     }
//     userRef.set(newUser).then(return user)
// }
