import React,{useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Appbar, TextInput, Divider, Button, Title} from 'react-native-paper';

import UserData from './userData';

const ProfileScreen = ({navigation}) => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const goBack = () => navigation.navigate('Home_screen');
  return (
    <ScrollView>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="Profile" subtitle="RedWire" />
      </Appbar.Header>
      <View style={{padding: 20}}>
        <Title>Your user Login Data</Title>
        <TextInput
          label="email"
          value={email}
          onChangeText={email => setEmail(email)}
          mode="outlined"
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={password => setPassword(password)}
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
