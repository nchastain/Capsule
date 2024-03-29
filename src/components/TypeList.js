import React from 'react'
import moment from 'moment'
import { Actions } from 'react-native-router-flux'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Keyboard
} from 'react-native'
import EntryListItem from './EntryListItem'
import Search from 'react-native-search-box'
import { borderlessImageMap, colors } from '../utilities'
import EmptyMessage from './EmptyMessage'

class TypeList extends React.Component {
  constructor() {
    super()
    this.state = {searchTerm: ''}
  }

  meetsSearchCriteria (entry) {
    let hasMatchingTag, hasMatchingTitle
    if (entry.tags) {
      hasMatchingTag = Object.keys(entry.tags).filter(tag => entry.tags[tag].indexOf(this.state.searchTerm.toLowerCase()) !== -1).length > 0
    }
    hasMatchingTitle = entry.text.indexOf(this.state.searchTerm) !== -1
    return hasMatchingTag || hasMatchingTitle
  }

  displayEntries () {
    let typeEntries = this.props.entries.filter(entry => entry.type === this.props.entryType)
    typeEntries = typeEntries.filter(entry => this.meetsSearchCriteria(entry))
    return (
      <View style={styles.innerContainer}>
        <ScrollView contentContainerStyle={styles.container}>
          {typeEntries.map((entry, idx) => (
            <EntryListItem entry={entry} key={idx} hasDate />
          )).reverse()}
        </ScrollView>
      </View>
    )
  }

  render () {
    return (
      <View style={{flex: 1, alignSelf: 'stretch', paddingTop: 64}}>
        <Search 
          ref='search_box' 
          onChangeText={(val) => this.setState({searchTerm: val})} 
          afterSearch={() => Keyboard.dismiss()} 
          backgroundColor='#eee'
          titleCancelColor={colors.main}
          onDelete={() => this.setState({searchTerm: ''})}
        />
        <View style={styles.outerContainer}>
          {this.props.entries.length > 0 ? this.displayEntries() : <EmptyMessage />}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    backgroundColor: colors.main,
    paddingBottom: 90,
  },
  dateText: {
    color: colors.main
  },
  emptyMessageContainer: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
    padding: 10,
    height: 220,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  emptyMessageText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  icon: {
    height: 45,
    width: 45
  },
  imageContainer: {
    padding: 5,
    marginRight: 10,
    width: 45
  },
  inner: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  innerContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: colors.main
  },
  outerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.main,
  },
  text: {
    color: '#555',
    fontWeight: 'bold'
  },
  textContainer: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: 230,
    paddingRight: 10,
    paddingLeft: 5
  },
})

export default TypeList
