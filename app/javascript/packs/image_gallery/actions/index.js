import request from 'superagent';
let _csrf_param = () => { return document.getElementsByName("csrf-param")[0].content }
let _csrf_token = () => { return document.getElementsByName("csrf-token")[0].content }

export const toggleIsSelected = selectedImageId => {
  return function(dispatch, getState) {
    dispatch({
      type: 'TOGGLE_IS_SELECTED',
      payload: selectedImageId
    })
  }
}

export const addSelectedImage = selectedImage => {
  return function(dispatch, getState) {
    dispatch({
      type: 'ADD_SELECTED_IMAGE',
      payload: selectedImage
    })
  }
}

export const removeSelectedImage = selectedImageId => {
  return function(dispatch, getState) {
    dispatch({
      type: 'REMOVE_SELECTED_IMAGE',
      payload: selectedImageId
    })
  }
}

export const createImage = payload => {
  return function(dispatch, getState) {
    const random = Math.random().toString(36).substring(7);
    dispatch(addUpload({
      id: random,
      upload: payload.upload,
      preview: payload.preview,
      progress: 0,
      state: "started",
      previewImgSize: payload.previewImgSize
    }))
    payload.formData.append(_csrf_param(), _csrf_token())
    request.post('/admin/images')
      .send(payload.formData).set('Accept', 'application/json')
      .on('progress', function(e){
        dispatch(updateUploadProgress({id: random, progress: e.percent}))
      })
      .end(function(err,resp){
        if(err) {
          console.error(err)
        } else {
          dispatch({
            type: 'ADD_TO_LOADED_IMAGES',
            payload: resp.body
          })
        }
      })
  }
}

export function addUpload(upload) {
  return {
    type: "ADD_UPLOAD",
    payload: upload
  }
}

export function updateUploadProgress(upload) {
  return {
    type: "UPDATE_UPLOAD_PROGRESS",
    payload: upload
  }
}
