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

export const createImage = formData => {
  return function(dispatch, getState) {
    formData.append(_csrf_param(), _csrf_token())
    // let params = {};
    // params[_csrf_param()] = _csrf_token()
    // params["data"] = formData

    request.post('/admin/images').send(formData).set('Accept', 'application/json').end(function(err,resp){
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
