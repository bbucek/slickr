const treeState = (state = {}, action) => {
  switch(action.type) {
    case 'UPDATE_TREE':
      console.log(action)
      return action.payload
    default:
      return state;
  }
}

export default treeState
