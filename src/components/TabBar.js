import React, { Component, PropTypes } from 'react';
import {
  Image,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal
} from 'react-native';
import { connect } from 'react-redux'
import { imageMap, descriptionMap } from '../utilities'
import Tabs from 'react-native-tabs';
import DefaultRenderer from 'react-native-router-flux/src/DefaultRenderer';
import Actions from 'react-native-router-flux/src/Actions';
import TabbedView from 'react-native-router-flux/src/TabbedView';
import { deepestExplicitValueForKey } from 'react-native-router-flux/src/Util';

class TabBar extends Component {

  static propTypes = {
    navigationState: PropTypes.object,
    tabIcon: PropTypes.any,
    onNavigate: PropTypes.func,
    unmountScenes: PropTypes.bool,
    pressOpacity: PropTypes.number,
    hideOnChildTabs: PropTypes.bool,
  };

  static onSelect(el, selectedSceneKey) {
    if (!Actions[el.props.name]) {
      throw new Error(
        `No action is defined for name=${el.props.name} ` +
        `actions: ${JSON.stringify(Object.keys(Actions))}`);
    }
    const active = selectedSceneKey == (el.props.name || el.key)
    if (active && typeof el.props.onActivePress === 'function') {
      el.props.onActivePress();
    }
    else if (typeof el.props.onPress === 'function') {
      el.props.onPress();
    } else {
      Actions[el.props.name]();
    }
  }

  constructor(props, context) {
    super(props, context);
    this.renderScene = this.renderScene.bind(this);
    this.deviceWidth = Dimensions.get('window').width
    this.deviceHeight = Dimensions.get('window').height
    this.state = {showModal: false}
  }

  renderScene(navigationState) {
    return (
      <DefaultRenderer
        key={navigationState.key}
        onNavigate={this.props.onNavigate}
        navigationState={navigationState}
      />
    );
  }

  onLayout (evt){
    this.deviceHeight = evt.nativeEvent.layout.height;
    this.deviceWidth = evt.nativeEvent.layout.width;
  }

  goToAddForm(type) {
    this.setState({showModal: !this.state.showModal}, function() {
      Actions.EntryAdditionForm({entryType: type, title: `Add ${type}`})
    })
  }

  createAddFormLink(type) {
    return (
      <TouchableOpacity onPress={() => this.goToAddForm(type)} style={{flex: 1, alignSelf: 'stretch'}}>
        <View style={styles.tabContainer}>
          <Image source={imageMap[type]} style={{width: 40, height: 40, marginRight: 10, resizeMode: 'contain'}} />
          <Text style={styles.tabText}>Add {descriptionMap[type]}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const state = this.props.navigationState;
    const selected = state.children[state.index];

    let hideTabBar = this.props.unmountScenes ||
      deepestExplicitValueForKey(state, 'hideTabBar') ||
      (this.props.hideOnChildTabs && deepestExplicitValueForKey(selected, 'tabs'));

    if (!this.props.auth.user) hideTabBar = true
    const contents = (
      <Tabs
        style={state.tabBarStyle}
        selectedIconStyle={state.tabBarSelectedItemStyle}
        iconStyle={state.tabBarIconContainerStyle}
        onSelect={(el) => TabBar.onSelect(el, selected.sceneKey)} {...state}
        selected={selected.sceneKey}
        pressOpacity={this.props.pressOpacity}
      >
        {state.children.filter(el => el.icon || this.props.tabIcon).map((el) => {
          const Icon = el.icon || this.props.tabIcon;
          return <Icon {...this.props} {...el} />;
        })}
      </Tabs>
    );
    return (
      <View
        style={{ flex: 1, alignItems: 'center' }}
      >
        <TabbedView
          navigationState={this.props.navigationState}
          style={{ flex: 1, alignSelf: 'stretch' }}
          renderScene={this.renderScene}
        />
        {!hideTabBar && state.children.filter(el => el.icon).length > 0 &&
          (state.tabBarBackgroundImage ? (
            <View>
              <Image source={state.tabBarBackgroundImage} style={state.tabBarBackgroundImageStyle}>
                {contents}
              </Image>
            </View>
          ) : contents)
        }
        {!hideTabBar && <View style={styles.addIconOuter}>
          <View style={{height: 80, width: 80, backgroundColor: '#eee', borderRadius: 40, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => this.setState({showModal: !this.state.showModal})}>
              <Image source={imageMap.addIcon} style={{width: 64, height: 64, resizeMode: 'contain'}} />
            </TouchableOpacity>
          </View>
        </View>}
        <Modal
          visible={this.state.showModal}
          animationType={'fade'}
          transparent
        >
            <TouchableWithoutFeedback onPress={() => this.setState({showModal: !this.state.showModal})}>
              <View style={styles.addLinkContainer}>
                <View style={styles.addLinkInner}>
                  {this.createAddFormLink('journal')}
                  {this.createAddFormLink('milestone')}
                  {this.createAddFormLink('view')}
                  {this.createAddFormLink('experience')}
                  {this.createAddFormLink('habit')}
                  {this.createAddFormLink('progress')}
                  {this.createAddFormLink('note')}
                </View>
                  <View style={styles.downIconContainer}>
                    <TouchableOpacity onPress={() => this.setState({showModal: !this.state.showModal})}>
                      <Image source={imageMap.closeIcon} style={styles.downArrow} />
                    </TouchableOpacity>
                  </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  }
}

const styles = {
  addIconOuter: {
    position: 'absolute',
    width: 80,
    bottom: 0,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    alignSelf: 'center',
    overflow: 'hidden'
  },
  addLinkContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 30,
    paddingBottom: 55,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addLinkInner: {
    flex: 1,
    backgroundColor: '#eee',
    borderRadius: 10,
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 20,
  },
  downIconContainer: {
    position: 'absolute',
    bottom: 0,
    height: 80,
    width: 80,
    backgroundColor: '#eee',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  downArrow: {
    width: 65,
    height: 65,
    resizeMode: 'contain'
  },
  tabContainer: {
    padding: 15,
    paddingLeft: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'lightgray',
    borderRadius: 10,
    alignSelf: 'stretch',
    shadowOffset: { width: 2,  height: 2},
    shadowColor: '#555',
    shadowOpacity: 0.3
  },
  tabText: {
    fontSize: 18,
    color: '#555',
    fontWeight: 'bold',
  }
}

const mapStateToProps = state => {
  const { auth } = state
  return { auth }
}

export default connect(mapStateToProps)(TabBar);
