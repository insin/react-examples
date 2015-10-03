/**
 * Convenience method for setting all time values to zero on a Date.
 */
function zeroTime(date) {
  date.setHours(0, 0, 0, 0)
  return date
}

module.exports = {
  zeroTime
}
