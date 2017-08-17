import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { colors, hexToRGB } from '../utilities'

class EmptyMessage extends React.Component {
  
  emptyMessage () {
    return (
      <View>
        <Text style={styles.emptyMessageText}>
          {this.props.messageType === 'projects'
            ? `No projects yet.`
            : `Nothing here yet.`
          }
        </Text>
        <Text style={styles.emptyMessageText}>
          {this.props.messageType === 'projects'
            ? `Click + in the top right to add one.`
            : `Click + below to add something.`
          }
        </Text>
      </View>
    )
  }

  buildProjectContainer () {
    if (this.props.messageType === 'projects') {
      return {backgroundColor: hexToRGB(colors.main, 0.5)}
    }
  }

  render() {
    return (
      <View style={[styles.emptyMessageContainer, this.buildProjectContainer()]}>
        <TouchableOpacity>
          {this.emptyMessage()}
        </TouchableOpacity>
      </View>
    )
  }

}

const styles = {
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
}

export default EmptyMessage
