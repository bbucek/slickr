import React from 'react';
import ReactDOM from 'react-dom';
import {MegadraftPlugin, DraftJS, insertDataBlock, editorStateToJSON, editorStateFromRaw} from "megadraft";
const {BlockContent, BlockData, BlockInput, CommonBlock} = MegadraftPlugin;

export default class ImageBlock extends React.Component {
  render(){
    return (
      <img src={this.props.data.imageData.thumbnail.url} />
    );
  }
}
