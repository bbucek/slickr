const loadedImages = (state = [], action) => {
  switch(action.type) {
    case 'TOGGLE_IS_SELECTED':
      var img = state[state.findIndex(x => x.id == action.payload)];
      img.isSelected = img.isSelected ? false : true;
      return  state
    default:
      return state
  }
}

export default loadedImages
