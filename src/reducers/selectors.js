
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
