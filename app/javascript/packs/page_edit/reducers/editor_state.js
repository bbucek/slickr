import {DraftJS, editorStateFromRaw} from "megadraft";

const editorState = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_IMAGE_TO_EDITOR_STATE':
      var data = {"type": "image", "imageData": action.payload}
      var updatedContent = {
        "entityMap": {},
        "blocks": [
          {
            "key": DraftJS.genKey(),
            "text": "",
            "type": "atomic",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": data
          }
        ]
      };
      var updatedEditorState = editorStateFromRaw(updatedContent);
      return updatedEditorState

    default:
      return state
  }
}

export default editorState
