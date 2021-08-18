import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';


import {autoSignIn} from './store/actions';

import {StyleSheet, Text, View} from 'react-native';
import SideDrawerCustom from './utils/customDrawer';
import {Colors} from './utils/tools';

import {
  Stack,
  HomeStack,
  VideosStack,
  FavouritesStack,
  screenOptions,
  MainDrawer,
  MainStack,
  AuthStack,
  SplashStack
} from './routes/Stacks';
import VideoScreen from './components/home/videos/video';
import AuthScreen from './components/auth';
import ProfileScreen from './components/user/profile';
import FavouritesScreen from './components/FavouritesScreen';
import Splash from './components/auth/splash';

import {useSelector} from 'react-redux';


const App = () =>  {
  const isAuth = useSelector(state => !!state.auth.token)
  console.log('application state is', isAuth);
    return (
      <NavigationContainer>
        {!isAuth && <MainStack />}
        {/* {isAuth && <MainStack />} */}
        

      </NavigationContainer>
    );
  }



export default App;

