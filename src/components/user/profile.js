import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Appbar, TextInput, Divider, Button, Title} from 'react-native-paper';

import UserData from './userData';

const ProfileScreen = () => {
  return (
    <ScrollView>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => alert('Back')} />
        <Appbar.Content title="Profile" subtitle="RedWire" />
      </Appbar.Header>
      <View style={{padding: 20}}>
        <Title>Your user Login Data</Title>
        <TextInput
          label="email"
          value={''}
          onChangeText={text => console.log('hey')}
          mode="outlined"
        />
        <TextInput
          label="Password"
          value={''}
          onChangeText={text => console.log('hey password')}
          mode="outlined"
        />
        <Button mode="contained" onPress={() => console.log('pressed')}>
          Update
        </Button>
      </View>
      <Divider />
      <UserData />
    </ScrollView>
  );
};

export default ProfileScreen;
