import React from 'react';
import ReactDOM from 'react-dom';
import {MegadraftEditor} from "megadraft";
import LinkInput from 'megadraft/lib/entity_inputs/LinkInput'
import ImagePlugin from "../../plugins/image/plugin.jsx";
import icons from "megadraft/lib/icons";
import FaBook from 'react-icons/lib/fa/book';
import PageLinkInput from "../../entity_inputs/book_link_input.jsx";

const entityInputs = {
  LINK: LinkInput,
  INTERNAL_PAGE_LINK: PageLinkInput
}

const actions = [
  {type: "inline", label: "B", style: "BOLD", icon: icons.BoldIcon},
  {type: "inline", label: "I", style: "ITALIC", icon: icons.ItalicIcon},
  // these actions correspond with the entityInputs above
  {type: "entity", label: "Link", style: "link", entity: "LINK", icon: icons.LinkIcon},
  {type: "entity", label: "Book Link", style: "link", entity: "INTERNAL_PAGE_LINK", icon: FaBook},

  {type: "separator"},
  {type: "block", label: "UL", style: "unordered-list-item", icon: icons.ULIcon},
  {type: "block", label: "OL", style: "ordered-list-item", icon: icons.OLIcon},
  {type: "block", label: "H2", style: "header-two", icon: icons.H2Icon},
  {type: "block", label: "QT", style: "blockquote", icon: icons.BlockQuoteIcon}
];

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
          actions={actions}
          entityInputs={entityInputs}
        />
      );
    }
}
