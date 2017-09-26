import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import icons from "megadraft/lib/icons";

export default class BookLinkInput extends React.Component {
  constructor(props) {
    super(props);
    this.onBookChange = this.onBookChange.bind(this);
    // load pages from somewhere
    this.books = [
      { value: '/home', label: 'Home' },
      { value: '/about', label: 'About' },
      { value: '/my/subpage', label: 'Subpage' }
    ]
  }

  onBookChange(selection) {
    var url = selection === null ? "" : selection.value
    if(selection !== null) {
      this.props.setEntity({url});
      this.props.cancelEntity();
      // // Force blur to work around Firefox's NS_ERROR_FAILURE
      event.target.blur();
    } else {
      this.props.removeEntity();
    }
  }

  render() {
    var value = this.props.url === null ? "" : this.props.url
    return (
      <Select
        name="form-field-name"
        value={this.props.url}
        options={this.books}
        onChange={this.onBookChange}
      />
      // <span className="toolbar__item">
      //   <button
      //     onClick={this.props.removeEntity}
      //     type="button"
      //     className="toolbar__button toolbar__input-button">
      //     {
      //       this.props.entity ?
      //         <icons.UnlinkIcon/> :
      //         <icons.CloseIcon />
      //     }
      //   </button>
      // </span>
    );
  }
}
