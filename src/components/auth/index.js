import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';

import {Input, Button} from 'react-native-elements';
import {LogoText, Colors,showToast} from '../../utils/tools';

const AuthScreen = () => {
  const [formType, setFormType] = useState(true);
  const [secureEntry, setSecureEntry] = useState(true);

  const handleSubmit = values => {
    alert(values);
  };
  useEffect(() => {
      showToast('success', 'sorry', 'error message')
  },[])
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.container}>
        <LogoText />
        <Formik
          initialValues={{
            email: 'vinodkumarmuppera@gmail.com',
            password: 'test123',
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email('Invalid email address')
              .required('Email is required'),
            password: Yup.string()
              .max(10, 'Must be 10 or less')
              .required('Password is required'),
          })}
          onSubmit={values => handleSubmit(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            errors,
          }) => (
            <>
              <Input
                placeholder="Email"
                leftIcon={{
                  type: 'antdesign',
                  name: 'mail',
                  color: Colors.white,
                }}
                inputStyle={styles.inputStyle}
                placeholderTextColor={Colors.grey}
                inputContainerStyle={styles.inputContainerStyle}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email is required')}
                value={values.email}
              />
              <Input
                placeholder="Password"
                secureTextEntry={secureEntry}
                leftIcon={{
                  type: 'antdesign',
                  name: 'lock',
                  color: Colors.white,
                }}
                inputStyle={styles.inputStyle}
                placeholderTextColor={Colors.grey}
                inputContainerStyle={styles.inputContainerStyle}
                rightIcon={{
                  type: 'antdesign',
                  name: secureEntry ? 'eye' : 'eyeo',
                  onPress: () => setSecureEntry(!secureEntry),
                }}
                onChangeText={handleChange('Password')}
                onBlur={handleBlur('Password')}
                value={values.password}
              />
              <Button
                title={formType ? 'Register' : 'Login'}
                buttonStyle={{
                  backgroundColor: Colors.black,
                  marginTop: 20,
                }}
                titleStyle={{width: '100%'}}
              />
              <Button
                type="clear"
                title={`${!formType ? 'Already Registered?' : 'Need to Sign in?' }`}
                buttonStyle={{
                  backgroundColor: Colors.black,
                  marginTop: 20,
                }}
                titleStyle={{width: '100%', color: Colors.white}}
                onPress={() => setFormType(!formType)}
              />
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.red,
  },
  container: {
    padding: 50,
    alignItems: 'center',
  },
  inputStyle: {
    fontSize: 15,
    color: Colors.white,
  },
  inputContainerStyle: {
    borderBottomWidth: 3,
    borderBottomColor: Colors.black,
  },
});

export default AuthScreen;
