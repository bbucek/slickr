const loadedImages = (state = [], action) => {
  switch(action.type) {
    case 'TOGGLE_IS_SELECTED':
      var img = state[state.findIndex(x => x.id == action.payload)];
      img.build_for_gallery.isSelected = img.build_for_gallery.isSelected ? false : true;
      return  state;
    case 'ADD_UPLOAD':
      var newArray = state.slice();
      newArray.unshift(newArrayObject(action.payload));
      return newArray;
    case 'ADD_TO_LOADED_IMAGES':
      var newArray = state.slice();
      newArray.unshift(action.payload);
      return newArray;

    default:
      return state
  }
}

export function newArrayObject(payload) {
 return {
   id: payload.id,
   progress: payload.progress,
   state: payload.state,
   upload: payload.upload,
   build_for_gallery : buildForGallery(payload),
   data: {"alt_text": ""}
 }
}

export function buildForGallery(payload) {
  return {
    id: Math.floor(Math.random() * 1000000000),
    src: payload.preview,
    thumbnail: payload.preview,
    caption: "",
    thumbnailWidth: payload.previewImgSize.width,
    thumbnailHeight: payload.previewImgSize.height,
    isSelected: false,
    editPath: ""
  }
}

export default loadedImages
