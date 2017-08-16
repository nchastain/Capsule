import React from 'react'
import { View, ScrollView, Text, Dimensions, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { colors, lightColorMap, imageMap, darkColorMap, hexToRGB } from '../utilities'
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

  createCardRow (entryType, side) {
    return (
      <View style={side === 'left' ? styles.cardLeft : {flex: 1}}>
        {this.createCardForEntryType(entryType)}
      </View>
    )
  }

  createCardForEntryType (entryType, idx) {
    if (entryType === 'projects') {
      return (
        <TouchableOpacity key={idx} activeOpacity={0.8} onPress={() => Actions.projects()}>
          <View style={styles.entryTypeContainer}>
            <Image source={imageMap[entryType]} style={styles.entryImage} />
            <View style={styles.projectsTextContainer}>
              <Text style={styles.projectsText}>
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
          <View style={[styles.entryTypeContainer, {backgroundColor: 'darkgrey'}]}>
            <Image source={imageMap.user} style={styles.entryImage} />
            <View style={styles.projectsTextContainer}>
              <Text style={styles.projectsText}>
                Account
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    }
    return (
      <TouchableOpacity key={idx} activeOpacity={0.8} onPress={() => this.goToEntryType(entryType)}>
        <View style={[styles.cardContainer, {backgroundColor: lightColorMap[entryType]}]}>
          <Image source={imageMap[entryType]} style={styles.cardImage} />
          <View style={styles.cardLabelContainer}>
            <Text style={styles.cardLabel}>
              {this.createCardLabel(entryType)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render () {
    return (
      <ScrollView style={{backgroundColor: colors.main}} contentContainerStyle={styles.cardOuterContainer}>
        <View style={styles.cardRow}>
          {this.createCardRow('experience', 'left')}
          {this.createCardRow('habit', 'right')}
        </View>
        <View style={styles.cardRow}>
          {this.createCardRow('milestone', 'left')}
          {this.createCardRow('progress', 'right')}
        </View>
        <View style={styles.cardRow}>
          {this.createCardRow('note', 'left')}
          {this.createCardRow('view', 'right')}
        </View>
        <View style={styles.cardRow}>
          {this.createCardRow('journal', 'left')}
          {this.createCardRow('projects', 'right')}
        </View>
        <View style={styles.cardRow}>
          <View style={{flex: 1}}>
            {this.createCardForEntryType('account')}
          </View>
        </View>
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
    alignItems: 'center',
    justifyContent: 'center'
  },
  entryTypeContainer: {
    height: 100,
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
    height: 100,
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
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    textShadowOffset: {width: 1, height: 1},
    backgroundColor: 'rgba(0,0,0,0)',
  },
  cardLeft: {
    flex: 1,
    paddingRight: 10
  },
  cardImage: {
    position: 'absolute',
    width: 170,
    height: 170,
    opacity: 0.4
  },
  entryImage: {
    position: 'absolute',
    width: 170,
    height: 170,
    opacity: 0.4
  },
  cardRow: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10
  },
  projectsText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: '#555',
    textShadowOffset: {width: 1, height: 1},
    backgroundColor: 'rgba(0,0,0,0)'
  },
  projectsTextContainer: {
    position: 'absolute',
    padding: 2
  }
})

export default connect(mapStateToProps)(AllGrid)