import React from 'react';
import ReactDOM from 'react-dom';
import {MegadraftEditor} from "megadraft";
import ImagePlugin from "../../plugins/image/plugin.jsx"

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var megadraftOptions = {
      editorState: this.props.editorState
    }
    var plugins = [ImagePlugin(megadraftOptions)]
    return (
        <MegadraftEditor
          editorState={this.props.editorState}
          plugins={plugins}
        />
      );
    }
}
