import React from 'react';
import ReactDOM from 'react-dom';

export default class MetaTab extends React.Component {
  render() {
    const handleChange = this.props.handleChange
    const values = this.props.values
    return (
      <fieldset>
        <ol>
          <li className="input string admin-subtitle">
            <label htmlFor="og_title">Facebook post tile</label>
            <input type="text" name="og_title" value={values.og_title} onChange={handleChange} />
          </li>
          <li className="input text">
            <label htmlFor="og_description">Facebook post text</label>
            <textarea name="og_description" value={values.og_description} onChange={handleChange} />
            <p className='hint_text'></p>
          </li>
          <li className="input string admin-subtitle">
            <label htmlFor="og_title_2">Twitter post tile</label>
            <input type="text" name="og_title_2" value={values.og_title_2} onChange={handleChange} />
          </li>
          <li className="input text">
            <label htmlFor="og_description_2">Twitter post text</label>
            <textarea name="og_description_2" value={values.og_description_2} onChange={handleChange} />
            <p className='hint_text'></p>
          </li>
        </ol>
      </fieldset>
    );
  }
}


