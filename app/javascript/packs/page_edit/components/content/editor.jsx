import React from 'react';
import ReactDOM from 'react-dom';
import {MegadraftEditor} from "megadraft";
import ImagePlugin from "../../plugins/image/plugin.jsx"
import icons from "megadraft/lib/icons";

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.changeEditorState = this.changeEditorState.bind(this);
  }

  changeEditorState(editorState) {
    this.props.actions.changeEditorState(editorState)
  }

  render() {
    // megadraftOptions passed in as blockProps when set from plugin.jsx
    // use customOptions to pass in any extra info to plugin block
    // eg customOptions: { customAction: this.props.actions.customAction }
    var megadraftOptions = {
      customOptions: {},
      standardDisplayOptions: {
        displayOptions: [],
        defaultDisplay: null
      }
    }
    var plugins = [ImagePlugin(megadraftOptions)]
    return (
        <MegadraftEditor
          editorState={this.props.editorState}
          onChange={this.changeEditorState}
          plugins={plugins}
        />
      );
    }
}
