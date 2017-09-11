import request from 'superagent';
let _csrf_param = () => { return document.getElementsByName("csrf-param")[0].content }
let _csrf_token = () => { return document.getElementsByName("csrf-token")[0].content }

export const updateCropData = crop_object => {
  let params = {};
  params[_csrf_param()] = _csrf_token()
  return function(dispatch, getState) {
    dispatch({
      type: 'CHANGE_CROP',
      payload: crop_object
    })
  }
}


