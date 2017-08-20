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

export const hexToRGB = (hex, alpha) => {
    let r = parseInt(hex.slice(1, 3), 16)
    let g = parseInt(hex.slice(3, 5), 16)
    let b = parseInt(hex.slice(5, 7), 16)

    return alpha
    ? "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")"
    : "rgb(" + r + ", " + g + ", " + b + ")"
}

export const isToday = (day) => moment(new Date(day)).get('date') === moment(new Date()).get('date')

export const getProjectByID = (ID, projects) => projects.filter(obj => obj.uid === ID)[0]

export const getImageForDay = (day) => {
  return dayImageMap[moment(day).format('D')]
}

const dayImageMap = {
  1: require('.././assets/dayImages/1.jpeg'),
  2: require('.././assets/dayImages/2.jpeg'),
  3: require('.././assets/dayImages/3.jpeg'),
  4: require('.././assets/dayImages/4.jpeg'),
  5: require('.././assets/dayImages/5.jpeg'),
  6: require('.././assets/dayImages/6.jpeg'),
  7: require('.././assets/dayImages/7.jpeg'),
  8: require('.././assets/dayImages/8.jpeg'),
  9: require('.././assets/dayImages/9.jpeg'),
  10: require('.././assets/dayImages/10.jpeg'),
  11: require('.././assets/dayImages/11.jpeg'),
  12: require('.././assets/dayImages/12.jpeg'),
  13: require('.././assets/dayImages/13.jpeg'),
  14: require('.././assets/dayImages/14.jpeg'),
  15: require('.././assets/dayImages/15.jpeg'),
  16: require('.././assets/dayImages/16.jpeg'),
  17: require('.././assets/dayImages/17.jpeg'),
  18: require('.././assets/dayImages/18.jpeg'),
  19: require('.././assets/dayImages/19.jpeg'),
  20: require('.././assets/dayImages/20.jpeg'),
  21: require('.././assets/dayImages/21.jpeg'),
  22: require('.././assets/dayImages/22.jpeg'),
  23: require('.././assets/dayImages/23.jpeg'),
  24: require('.././assets/dayImages/24.jpeg'),
  25: require('.././assets/dayImages/25.jpeg'),
  26: require('.././assets/dayImages/26.jpeg'),
  27: require('.././assets/dayImages/27.jpeg'),
  28: require('.././assets/dayImages/28.jpeg'),
  29: require('.././assets/dayImages/29.jpeg'),
  30: require('.././assets/dayImages/30.jpeg'),
  31: require('.././assets/dayImages/31.jpeg'),
}

export const getEntriesForDay = (days, entries, day) => {
  const entriesArr = entries ? Object.values(entries) : []
  const allDayEntries = (days && Object.keys(days).length > 0 && days[day]) ? Object.keys(days[day].entries) : []
  const trueDayEntries = allDayEntries.length > 0 ? allDayEntries.filter(dayObj => days[day].entries[dayObj]) : []
  return entriesArr.length > 0 ? entriesArr.filter(entry => trueDayEntries.indexOf(entry.uid) !== -1) : []
}

export const formatTags = (tags) => {
  return tags.map(function(tag) {
    if (tag.indexOf('#') === -1) {
      let newTag = tag
      newTag = newTag.split('')
      newTag.unshift('#')
      return newTag.join('')
    }
    return tag
  })
}

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
  whitelogo: require('.././assets/whitelogo.png'),
  inbox: require('.././assets/inbox.png'),
  down: require('.././assets/down.png'),
  closeIcon: require('.././assets/close-icon.png'),
  addIcon: require('.././assets/addiconsolid.png'),
  user: require('.././assets/user.png'),
  camera: require('.././assets/camera.png'),
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
  fullcalendar: require('.././assets/fullcalendar.png')
}

export const bannerImages = [
  require('.././assets/hero1.jpg'),
  require('.././assets/hero2.jpg')
]

export const lightColorMap = {
  note: '#8AC3FB',
  journal: '#FFBDFA',
  milestone: '#F6DF7F',
  view: '#B09BFF',
  progress: '#9EE986',
  habit: '#FFC566',
  experience: '#F96262'
}

export const entryTypeList = ['journal', 'milestone', 'view', 'experience', 'habit', 'progress', 'note']

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
