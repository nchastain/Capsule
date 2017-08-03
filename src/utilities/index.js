import moment from 'moment'

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

export const isToday = (day) => moment(new Date(day)).get('date') === moment(new Date()).get('date')

export const getProjectByID = (ID, projects) => projects.filter(obj => obj.uid === ID)[0]

export const imageMap = {
  note: require('.././assets/note.png'),
  experience: require('.././assets/experience.png'),
  view: require('.././assets/sight.png'),
  journal: require('.././assets/journal.png'),
  milestone: require('.././assets/milestone.png'),
  habit: require('.././assets/habit.png'),
  progress: require('.././assets/progress.png'),
  projects: require('.././assets/projectsicon.png'),
  complete: require('.././assets/checkeredflagicon.png'),
  trash: require('.././assets/trash.png'),
  trash2: require('.././assets/trash2.png'),
  addproject: require('.././assets/addproject.png'),
  plus: require('.././assets/plus.png'),
  left: require('.././assets/chevleft.png'),
  right: require('.././assets/chevright.png'),
  logo: require('.././assets/logo.png'),
  inbox: require('.././assets/inbox.png'),
  down: require('.././assets/down.png'),
}

export const borderlessImageMap = {
  note: require('.././assets/notenoborder.png'),
  experience: require('.././assets/experiencenoborder.png'),
  view: require('.././assets/viewnoborder.png'),
  journal: require('.././assets/journalnoborder.png'),
  milestone: require('.././assets/milestonenoborder.png'),
  habit: require('.././assets/habitnoborder.png'),
  progress: require('.././assets/progressnoborder.png'),
  projects: require('.././assets/projectsiconnoborder.png'),
  whiteprojects: require('.././assets/whiteprojects.png'),
  complete: require('.././assets/checkeredflag.png'),
  whiteComplete: require('.././assets/whitecomplete.png'),
  trash3: require('.././assets/trash3.png'),
  trash4: require('.././assets/trash4.png'),
  trash5: require('.././assets/trash5.png'),
  trash6: require('.././assets/trash6.png'),
  alltype: require('.././assets/alltype.png'),
  allstatus: require('.././assets/allstatus.png'),
  nowstatus: require('.././assets/nowstatus.png'),
  donestatus: require('.././assets/donestatus.png'),
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

export const typeMap = {
  art: '🎨',
  enterprise: '💼',
  education: '📚'
}

export const progressTypes = ['time', 'manual', 'none']

export const darkColorMap = {
  note: '#4A90E2',
  journal: '#FD8AD7',
  milestone: '#F5C523',
  view: '#5D34FA',
  progress: '#21AC34',
  habit: '#F59123',
  experience: '#D0021B'
}

export const descriptionMap = {
  note: 'a note',
  experience: 'an experience',
  view: 'a view',
  journal: 'a journal entry',
  milestone: 'a milestone',
  habit: 'a completed habit',
  progress: 'progress', 
}

export const entryTypes = ['journal', 'experience', 'view', 'note', 'progress', 'habit', 'milestone']

export const colors = {
  main: '#a083c4',
  lightAccent: '#DDC6FA'
}
