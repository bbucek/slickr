const schedulingActive = (state = false, action) => {
  console.log(action)
  switch(action.type) {
    case 'HIDE_SCHEDULING':
      return  false
    case 'SHOW_SCHEDULING':
      return true
    default:
      return state
  }
}

export default schedulingActive

