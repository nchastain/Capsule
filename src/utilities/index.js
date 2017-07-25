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

export const imageMap = {
  note: require('.././assets/note.png'),
  experience: require('.././assets/experience.png'),
  view: require('.././assets/sight.png'),
  journal: require('.././assets/journal.png'),
  milestone: require('.././assets/milestone.png'),
  habit: require('.././assets/habit.png'),
  progress: require('.././assets/progress.png')
}

export const lightColorMap = {
  note: '#8AC3FB',
  journal: '#FFBDFA',
  milestone: '#F6DF7F',
  view: '#B09BFF',
  progress: '#9EE986',
  habit: '#FFC566',
  experience: '#F96262'
}

export const darkColorMap = {
  note: '#4A90E2',
  journal: '#FD8AD7',
  milestone: '#F5C523',
  view: '#5D34FA',
  progress: '#21AC34',
  habit: '#F59123',
  experience: '#D0021B'
}

export const colors = {
  main: '#a083c4'
}
