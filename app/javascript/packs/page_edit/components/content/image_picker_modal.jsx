import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import Grid from './grid.jsx';

export default class ImagePickerModal extends React.Component {
  constructor(props) {
    super();

    this.closeImagePicker = this.closeImagePicker.bind(this);
  }

  closeImagePicker () {
    this.props.actions.toggleImagePicker()
  }

  render(){
    return(
      <ReactModal
        isOpen={this.props.modalIsOpen}
        contentLabel="onRequestClose Example"
        onRequestClose={this.closeImagePicker}
      >
        <Grid
          actions={this.props.actions}
          images={this.props.loadedImages}
          editorState={this.props.editorState}
        />
        <p>Modal text!</p>
        <button onClick={this.closeImagePicker}>Close Modal</button>
      </ReactModal>
    )
  }
}
