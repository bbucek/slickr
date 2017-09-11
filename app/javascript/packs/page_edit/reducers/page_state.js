const pageState = (state = {}, action) => {
  switch(action.type) {
    case 'SET_PAGE_TITLE':
      return Object.assign({},state, { title: action.title })
    case 'PUBLISH_PAGE':
    case 'UNPUBLISH_PAGE':
      return Object.assign({}, state, {aasm_state: action.aasm_state})
    default:
      return state
  }
}

export default pageState
