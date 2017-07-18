export const secondsToString = (seconds, longForm) => {
  const hours = Math.floor((seconds %= 86400) / 3600)
  const minutes = Math.floor((seconds %= 3600) / 60)
  let hString = ''
  let mString = ''
  let sString = ''
  if (longForm) {
    if (hours) hString = hours + ' hour' + numberEnding(hours) + ', '
    if (minutes) mString = minutes + ' minute' + numberEnding(minutes)
    if (!hString && !mString) sString = (seconds % 60) + ' second' + numberEnding(seconds % 60)
  }
  else {
    if (hours) hString = hours + 'h' + ', '
    if (minutes) mString = minutes + 'm'
    if (!hString && !mString) sString = (seconds % 60) + 's'
  }
  return `+${hString}${mString}${sString}`
}

const numberEnding = (number) => {
  return number > 1 ? 's' : ''
}

export const getProjectByID = (ID, projects) => projects.filter(obj => obj.uid === ID)[0]
