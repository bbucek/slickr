import React from 'react';
import ReactDOM from 'react-dom';

export default class Buttons extends React.Component {
  showEditButton() {
    if (this.props.selectedImages.length === 1) {
      var href = this.props.selectedImages[0].editPath
      return (
        <span className="action_item"><a href={href}>Edit Image</a></span>
      )
    }
  }

  showDeleteButton() {
    if (this.props.selectedImages.length === 1)
      return (
        <span className="action_item"><a href="/admin/images/new">Delete Image</a></span>
      )
    else if (this.props.selectedImages.length > 1)
      return (
        <span className="action_item"><a href="/admin/images/new">Delete Images</a></span>
      )
  }

  render(){
    return(
      <div className="title_bar" id="title_bar">
        <div className="action_items">
          {this.showEditButton()}
          {this.showDeleteButton()}
        </div>
      </div>
    )
  }
}
