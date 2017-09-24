import React from 'react';
import ReactDOM from 'react-dom';
import {MegadraftEditor, editorStateToJSON} from "megadraft";
import ImagePlugin from "../../plugins/image/plugin.jsx"

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    // this.onChange = (editorState) => this.setState({editorState});
  }

  onChange(editorState) {
    console.log(editorStateToJSON(editorState))
    this.setState({editorState})
  }

  render() {
    var megadraftOptions = {
      editorState: this.props.editorState
    }
    var plugins = [ImagePlugin(megadraftOptions)]
    return (
        <MegadraftEditor
          editorState={this.props.editorState}
          onChange={this.onChange}
          plugins={plugins}
          action={this.props.actions}
        />
      );
    }
}
