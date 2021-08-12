import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {connect} from 'react-redux';


const Drawer = createDrawerNavigator();


import {Stack,HomeStack,VideosStack, screenOptions} from './routes/Stacks';
import SideDrawerCustom from './utils/customDrawer';
import {Colors} from './utils/tools';

import VideosScreen from './components/home/videos';
import VideoScreen from './components/home/videos/video';
import HomeScreen from './components/home/articles';
import AuthScreen from './components/auth';
import ProfileScreen from './components/user/profile';


const MainDrawer = () => (
  <Drawer.Navigator
    drawerContent={(props) => <SideDrawerCustom {...props} />}
    drawerStyle={{backgroundColor: Colors.black}}>
    <Drawer.Screen name="Home" component={HomeStack} />
    <Drawer.Screen name="Videos" component={VideosStack} />
    <Drawer.Screen name="Profile" component={ProfileScreen} />
  </Drawer.Navigator>
);

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {this.props.auth.isAuth ? (
            <>
              <Stack.Screen name="Main" component={MainDrawer} options={{headerShown: false}} />
              <Stack.Screen name="VideoScreen" component={VideoScreen} options={{...screenOptions, headerBackTitleVisible: false}}/>
            </>
          ) : (
            <Stack.Screen name="AuthScreen" component={AuthScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(App);
