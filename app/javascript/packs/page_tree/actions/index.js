export const updateTree = tree => {
  return function(dispatch, getState) {
    dispatch({type:"UPDATE_TREE", payload:tree})
  }
}

