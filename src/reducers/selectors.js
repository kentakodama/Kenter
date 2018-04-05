
export const deletePhoto = (album, photoId) => {
  let duplicate = album.slice(0);
  let deleted = false;
  duplicate.forEach((photo, index) => {
    if(!deleted && photoId === photo.id) {
      duplicate.splice(index, 1);
      deleted = true;
    }
  });
  return duplicate;
}


export const handleAddReference = (user, photoId) => {

  let duplicate = Object.assign({}, user)
  duplicate.photoReferences.push(photoId)

  return duplicate
}

export const convertUsersToArray = (object) => {

  let array = [];
  Object.keys(object).forEach((key)=> {
    array.push(object[key]);
  })
  return array;
}
