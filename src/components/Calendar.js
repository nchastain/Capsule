import React from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import moment from 'moment'

class Calendar extends React.Component {
  render() {
    const picRandomizer = (dayInput) => moment(dayInput).unix()
    const heroSource = (day) => `https://placeimg.com/${667 * picRandomizer(day)}/${100 * picRandomizer(day)}/nature`
    const now = new Date();
    var daysOfYear = [];
    for (var d = new Date(2017, 7, 1); d <= now; d.setDate(d.getDate() + 1)) {
      daysOfYear.push(new Date(d));
    }

    const daysMap = daysOfYear.map(date => (
      <View style={{alignSelf: 'stretch'}}>{buildDayHero(date)}</View>
    ))
    
    return (
      <ScrollView contentContainerStyle={{marginTop: 140, paddingBottom: 140, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center', flex: 1}}>
        {daysMap}
      </ScrollView>
    )
  }
}

const buildDayHero = (dayInput) => {
  const picRandomizer = (dayInput) => moment(dayInput).unix()
  const heroSource = `https://placeimg.com/${667 * picRandomizer(dayInput)}/${100 * picRandomizer(dayInput)}/nature`
  return (
    <View style={styles.heroContainer}>
      <TouchableOpacity
        activeOpacity={0.8} 
        style={{flex: 1, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center'}}
        onPress={() => Actions.Today({activeDay: moment(dayInput)})}
      >
        <Image source={{uri: heroSource}} style={[styles.heroImage, {width: 667}]} />
        <View style={[styles.opacityContainer, {width: 667}]} />
        <View>{createDateText(dayInput)}</View>
      </TouchableOpacity>
    </View>
  )
}

const createDateText = (dayInput) => {
  return (
    <Text style={styles.dateText}>
      {moment(dayInput).format('MMMM Do, YYYY')}
    </Text>
  )
}

const styles = {
  dateText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },
  heroContainer: {
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.3)',
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroImage: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: 100,
  },
  opacityContainer: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    position: 'absolute',
    left: 0,
    top: 0,
    height: 100,
  }
}


export default Calendar