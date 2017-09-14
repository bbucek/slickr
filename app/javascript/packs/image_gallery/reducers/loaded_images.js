const loadedImages = (state = [], action) => {
  switch(action.type) {
    case 'TOGGLE_IS_SELECTED':
      var img = state[state.findIndex(x => x.id == action.payload)];
      img.isSelected = img.isSelected ? false : true;
      return  state;
    case 'ADD_TO_LOADED_IMAGES':
      var newArray = state.slice();
      newArray.unshift(action.payload);
      return newArray;

    default:
      return state
  }
}

export default loadedImages
