import React from 'react';
import {Platform, View} from 'react-native';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import {Colors, LogoText} from '../utils/tools';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

import VideosScreen from '../components/home/videos';
import VideoScreen from '../components/home/videos/video';
import HomeScreen from '../components/home/articles';
import ArticleScreen from '../components/home/articles/article';
import ProfileScreen from '../components/user/profile';
import FavouritesScreen from '../components/FavouritesScreen';

import SideDrawerCustom from '../utils/customDrawer';

import {createDrawerNavigator} from '@react-navigation/drawer';
import AuthScreen from '../components/auth';

const Drawer = createDrawerNavigator();

export const MainDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <SideDrawerCustom {...props} />}
      drawerStyle={{backgroundColor: Colors.black}}>
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="Videos" component={VideosStack} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Favourites" component={FavouritesStack} />
    </Drawer.Navigator>
  );
};

export const Stack = createStackNavigator();

export const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={MainDrawer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VideoScreen"
        component={VideoScreen}
        options={{
          ...screenOptions,
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

const LeftIcon = () => {
  const navigation = useNavigation();
  return (
    <View style={{margin: 10}}>
      <Icon
        name="menufold"
        type="antdesign"
        color={Colors.white}
        onPress={() => navigation.openDrawer()}
      />
    </View>
  );
};

export const screenOptions = {
  headerTitleAlign: 'center',
  headerTintColor: Colors.red,
  headerStyle: {
    backgroundColor: Colors.black,
    borderBottomWidth: 6,
    borderBottomColor: Colors.red,
    height: Platform.OS === 'ios' ? 110 : 60,
  },
  headerTitle: () => <LogoText style={{fontSize: 25}} />,
};

export const VideosStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions,
      }}
      initialRouteName="Videos_screen">
      <Stack.Screen
        name="Videos_screen"
        component={VideosScreen}
        options={{headerLeft: props => <LeftIcon />}}
      />
    </Stack.Navigator>
  );
};

export const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions,
      }}
      initialRouteName="Home_screen">
      <Stack.Screen
        name="Home_screen"
        component={HomeScreen}
        options={{headerLeft: props => <LeftIcon />}}
      />
      <Stack.Screen name="Article_screen" component={ArticleScreen} />
    </Stack.Navigator>
  );
};

export const FavouritesStack = () => {
  return (
    <Stack.Navigator screenOptions={{...screenOptions}}>
      <Stack.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{headerLeft: props => <LeftIcon />}}
      />
    </Stack.Navigator>
  );
};

export const AuthStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="AuthScreen" component={AuthScreen} options={{ headerShown:false}} />
        </Stack.Navigator>
        
    )
} 
