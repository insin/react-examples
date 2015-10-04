var LOADING = 'admin/LOADING'
var LOADING_SUCCESS = 'admin/LOADING_SUCCESS'

function admin(state = {
  loading: false,
  message: 'admin reducer was loaded via code splitting.'
}, action) {
  switch (action.type) {
    case LOADING:
      return {...state, loading: true}
    case LOADING_SUCCESS:
      return {...state, loading: false}
  }
  return state
}

admin.load = () => (dispatch) => {
  dispatch({type: LOADING})
  setTimeout(() => dispatch({type: LOADING_SUCCESS}), 2000)
}

module.exports = admin
