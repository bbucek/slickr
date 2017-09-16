import React from 'react';
import ReactDOM from 'react-dom';

export default class Buttons extends React.Component {
  showEditButton() {
    if (this.props.selectedImages.length === 1) {
      var href = this.props.selectedImages[0].editPath
      return (
        <a href={href} className="active">Edit</a>
      )
    } else {
      return <a href="#" className="">Edit</a>
    }
  }

  showTopButtons() {
    if (this.props.selectedImages.length > 0)
      return (
        <div id="resource_tabs">
          {this.showEditButton()}
          <a href="#" className="active">Delete</a>
        </div>
      )
  }

  render(){
    return(
      <div>
        {this.showTopButtons()}
      </div>
    )
  }
}
