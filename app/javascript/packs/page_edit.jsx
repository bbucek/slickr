// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import PageEditor from './page_edit/containers/page_editor'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './page_edit/reducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const pageData = document.getElementById("page-data").dataset.page_data

const initialState = {
  pageState: JSON.parse(pageData),
  activeTab: 'content',
  modalIsOpen: false
}

const middlewares = [thunk];
if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}
const store = createStore(reducers, initialState, applyMiddleware(...middlewares))

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store}>
      <PageEditor />
    </Provider>,
    document.getElementById("page_edit_content")
  )
})

export default store
