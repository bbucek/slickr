import request from 'superagent';
import {editorStateToJSON} from "megadraft";

let _csrf_param = () => { return document.getElementsByName("csrf-param")[0].content }
let _csrf_token = () => { return document.getElementsByName("csrf-token")[0].content }

export const updatePageContent = info => {
  return function(dispatch, getState) {
    let params = {"page":{}};
    params[_csrf_param()] = _csrf_token()
    for (var key in info.values) {
      if (info.values.hasOwnProperty(key)) {
        params["page"][key] = info.values[key];
      }
    }
    params["page"]["content"] = JSON.parse(editorStateToJSON(info.editorState))
    console.log('ddfdfdfdf')
    console.log(editorStateToJSON(info.editorState))
    console.log(params)

    request.put(getState().pageState.admin_page_path).type('json').accept('json').send(params).end(function(err,resp){
      if(err) {
        console.error(err)
      } else {
        console.log(resp.body)
        dispatch({
          type: 'SET_PAGE_TITLE',
          title: resp.body.title
        })
      }
    })
  }
}

export const setPageTitle = text => {
  return function(dispatch, getState) {
    let params = {};
    params[_csrf_param()] = _csrf_token()
    params["page"] = {}
    params["page"]["title"] = text

    request.put(getState().pageState.admin_page_path).type('json').accept('json').send(params).end(function(err,resp){
      if(err) {
        console.error(err)
      } else {
        console.log(resp.body.title)
        dispatch({
          type: 'SET_PAGE_TITLE',
          title: resp.body.title
        })
      }
    })

  }
}

export const pageUnpublish = () => {
  return function(dispatch, getState) {
    let params = {};
    params[_csrf_param()] = _csrf_token()

    request.put(getState().pageState.admin_unpublish_path).type('json').accept('json').send(params).end(function(err,resp){
      if(err) {
        console.error(err)
      } else {
        dispatch({
          type: 'UNPUBLISH_PAGE',
          aasm_state: resp.body.aasm_state
        })
      }
    })
  }
}

export const pagePublish = () => {
  return function(dispatch, getState) {
    let params = {};
    params[_csrf_param()] = _csrf_token()

    request.put(getState().pageState.admin_publish_path).type('json').accept('json').send(params).end(function(err,resp){
      if(err) {
        console.error(err)
      } else {
        dispatch({
          type: 'PUBLISH_PAGE',
          aasm_state: resp.body.aasm_state
        })
      }
    })
  }
}

export const changeTab = (tab) => {
  return function(dispatch, getState) {
    dispatch({
      type: "CHANGE_TAB",
      payload: tab
    })
  }
}

export const toggleImagePicker = () => {
  return function(dispatch, getState) {
    dispatch({
      type: "TOGGLE_MODAL"
    })
  }
}

export const loadImages = selectedImageIds => {
  return function(dispatch, getState) {
    let params = {};
    params[_csrf_param()] = _csrf_token()

    request.get(getState().pageState.admin_image_index_path).set('Accept', 'text/html').query('type=page_edit').end(function(err,resp){
      if(err) {
        console.error(err)
      } else {
        dispatch({
          type: 'LOAD_IMAGES',
          payload: resp.body
        })
      }
    })
  }
}

export const changeEditorState = editorState => {
  return function(dispatch, getState) {
    dispatch({
      type: "CHANGE_EDITOR_STATE",
      payload: editorState
    })
  }
}
