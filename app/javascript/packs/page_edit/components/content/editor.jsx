import React from 'react';
import ReactDOM from 'react-dom';
import {MegadraftEditor, editorStateToJSON} from "megadraft";
import ImagePlugin from "../../plugins/image/plugin.jsx"
import icons from "megadraft/lib/icons";

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    // this.onChange = (editorState) => this.setState({editorState});
  }

  onChange(editorState) {
    console.log('changed')
    this.setState({editorState})
  }

  render() {
    // megadraftOptions passed in as blockProps when set from plugin.jsx
    var megadraftOptions = {
      customOptions: { customAction: this.props.actions.removeImageFromEditorState },
      standardDisplayOptions: {
        displayOptions: [],
        defaultDisplay: null
      }
    }
    var plugins = [ImagePlugin(megadraftOptions)]
    return (
        <MegadraftEditor
          editorState={this.props.editorState}
          onChange={this.onChange}
          plugins={plugins}
        />
      );
    }
}
