var reducers = {}

var emitChange = null

module.exports = {
  get() {
    return {...reducers}
  },

  register(newReducers) {
    reducers = {...reducers, ...newReducers}
    if (emitChange != null) {
      emitChange({...reducers})
    }
  },

  setChangeListener(listener) {
    if (emitChange != null) {
      throw new Error('Can only set reducer change listener once.')
    }
    emitChange = listener
  }
}
