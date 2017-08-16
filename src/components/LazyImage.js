import React from 'react'
import { View, Text, Image } from 'react-native'
import { imageMap } from '../utilities'

class LazyImage extends React.Component {
  constructor(props) {
    super(props)
    console.log('here comes console.log')
    this.state = {loaded: false}
  }

  render() {
    return 
      <Image
        source={this.state.loaded ? this.props.imageSource : this.props.imageSource}
        onLoad={() => this.setState({loaded: true})}
      />
  }
}

export default LazyImage