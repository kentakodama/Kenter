export const ADD_PHOTO = 'ADD_PHOTO';
export const DELETE_PHOTO = 'DELETE_PHOTO';

export const addPhoto = (photo) => ({
  type: ADD_PHOTO,
  photo
});
export const deletePhoto = (photo) => ({
  type: DELETE_PHOTO,
  photo
});
