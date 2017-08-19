import React from 'react'
import { View, ScrollView, Text, Dimensions, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { colors, lightColorMap, imageMap, borderlessImageMap, darkColorMap, hexToRGB } from '../utilities'
import { connect } from 'react-redux'
import _ from 'lodash'

class AllGrid extends React.Component {
  constructor (props) {
    super(props)
    this.deviceWidth = Dimensions.get('window').width
    this.deviceHeight = Dimensions.get('window').height
  }

  onLayout (evt) {
    this.deviceHeight = evt.nativeEvent.layout.height
    this.deviceWidth = evt.nativeEvent.layout.width
  }

  goToEntryType (entryType) {
    let entries = this.props.entries ? Object.values(this.props.entries) : []
    entries = this.props.entries.filter(entry => entry.type === entryType)
    Actions.TypeList({
      entryType,
      entries,
      title: this.createCardLabel(entryType),
      location: 'all'
    })
  }

  createCardLabel (entryType) {
    return `${entryType[0].toUpperCase()}${entryType.substring(1)}${entryType !== 'progress' ? 's' : ''}`
  }

  createCardRow (entryType) {
    return (
      <View style={styles.cardRow}>
      <View style={{flex: 1}}>
        {this.createCardForEntryType(entryType)}
      </View>
      </View>
    )
  }

  createCardForEntryType (entryType, idx) {
    if (entryType === 'projects') {
      return (
        <TouchableOpacity key={idx} activeOpacity={0.8} onPress={() => Actions.projects()}>
          <View style={[styles.cardContainer, {backgroundColor: hexToRGB('#555555', 0.5)}]}>
            <Image source={imageMap[entryType]} style={styles.entryImage} />
            <View style={styles.cardLabelContainer}>
              <Text style={styles.cardLabel}>
                Projects
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    }
    if (entryType === 'account') {
      return (
        <TouchableOpacity key={idx} activeOpacity={0.8} onPress={() => Actions.Account()}>
          <View style={[styles.cardContainer, {backgroundColor: hexToRGB('#eeeeee', 0.5)}]}>
            <Image source={imageMap.user} style={styles.entryImage} />
            <View style={styles.cardLabelContainer}>
              <Text style={styles.cardLabel}>
                Account
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    }
    return (
      <TouchableOpacity key={idx} activeOpacity={0.8} onPress={() => this.goToEntryType(entryType)}>
        <View style={[styles.cardContainer, {backgroundColor: hexToRGB(darkColorMap[entryType], 0.5)}]}>
          <Image source={borderlessImageMap[entryType]} style={styles.cardImage} />
          <View style={styles.cardLabelContainer}>
            <Text style={[styles.cardLabel, {color: hexToRGB('#FFFFFF', 0.8)}]}>
              {this.createCardLabel(entryType)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render () {
    const sections = ['experience', 'habit', 'milestone', 'progress', 'note', 'view', 'journal', 'projects', 'account']
    return (
      <ScrollView style={{backgroundColor: colors.main}} contentContainerStyle={styles.cardOuterContainer}>
        {this.createCardRow('experience')}
        {this.createCardRow('habit')}
        {this.createCardRow('milestone')}
        {this.createCardRow('progress')}
        {this.createCardRow('note')}
        {this.createCardRow('view')}
        {this.createCardRow('journal')}
        {this.createCardRow('projects')}
        {this.createCardRow('account')}
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  const entries = _.map(state.entries, (val, uid) => {
    return { ...val, uid }
  })
  return { entries }
}

const styles = StyleSheet.create({
  cardLabelContainer: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    marginLeft: 85,
    justifyContent: 'center'
  },
  entryTypeContainer: {
    height: 80,
    borderRadius: 10,
    backgroundColor: '#555',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 2, height: 2},
    shadowColor: '#555',
    shadowOpacity: 0.3,
    overflow: 'hidden'
  },
  cardOuterContainer: {
    paddingTop: 30,
    paddingBottom: 100, 
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: colors.main
  },
  cardContainer: {
    height: 80,
    borderRadius: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 2, height: 2},
    shadowColor: '#555',
    shadowOpacity: 0.3,
    overflow: 'hidden',
  },
  cardLabel: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textShadowOffset: {width: 1, height: 1},
    textShadowColor: hexToRGB('#555555', 0.5),
    backgroundColor: 'rgba(0,0,0,0)',
  },
  cardLeft: {
    flex: 1,
    paddingRight: 10
  },
  cardImage: {
    position: 'absolute',
    width: 60,
    height: 60,
    left: 10,
    opacity: 1
  },
  entryImage: {
    position: 'absolute',
    width: 60,
    height: 60,
    left: 10,
    opacity: 1
  },
  cardRow: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10
  },
  projectsText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: '#555',
    textShadowOffset: {width: 1, height: 1},
    backgroundColor: 'rgba(0,0,0,0)'
  },
  projectsTextContainer: {
    padding: 2,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  }
})

export default connect(mapStateToProps)(AllGrid)