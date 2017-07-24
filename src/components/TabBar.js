import React, { Component, PropTypes } from 'react';
import {
  Image,
  View,
  Text,
  Dimensions
} from 'react-native';
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

  render() {
    const state = this.props.navigationState;
    const selected = state.children[state.index];

    const hideTabBar = this.props.unmountScenes ||
      deepestExplicitValueForKey(state, 'hideTabBar') ||
      (this.props.hideOnChildTabs && deepestExplicitValueForKey(selected, 'tabs'));

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
        style={{ flex: 1, alignItems: 'center'}}
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
        <View style={{position: 'absolute', width: 80, bottom: 0, height: 80, alignItems: 'center', justifyContent: 'center', borderRadius: 40, alignSelf: 'center'}}>
          <View style={{height: 80, width: 80, backgroundColor: '#eee', borderRadius: 40, alignItems: 'center', justifyContent: 'center'}}><Image source={require('.././assets/addiconsolid.png')} style={{width: 64, height: 64, resizeMode: 'contain'}} /></View>
        </View>
      </View>
    );
  }

}

export default TabBar;
