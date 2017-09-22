import React from 'react';
import ReactDOM from 'react-dom';
import {MegadraftEditor, editorStateFromRaw} from "megadraft";
import ImagePlugin from "../../plugins/image/plugin.jsx"

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: editorStateFromRaw(null)};
    this.onChange = (editorState) => this.setState({editorState});
  }
  render() {
    var megadraftOptions = {
      displayOptions: [],
      defaultDisplay: null
    }
    var plugins = [ImagePlugin(megadraftOptions)]
    return (
        <MegadraftEditor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={plugins}
        />
      );
    }
}
