import React, {useState, useCallback, useEffect} from 'react';
import {View} from 'react-native';
import {TextInput, Button, Title} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {showToast} from '../../utils/tools';
import {useFocusEffect} from '@react-navigation/native';

import {useSelector, useDispatch} from 'react-redux';
import {updateUserData, clearAuthError} from '../../store/actions';

const UserData = () => {
  const [loading, setLoading] = useState(false);
  const error = useSelector(state => state.auth.error);
  const {user} = useSelector(state => state.auth);
  console.log('user data = ', user);
  const dispatch = useDispatch();

  const handleSubmit = values => {
    setLoading(true);
    dispatch(updateUserData(values, user)).then(({payload}) => {
      setLoading(false);
      if (payload.error) {
        showToast('error', 'Ups !!', 'Try again later');
      } else {
        showToast('success', 'Congratulations', 'Your profile was updated');
      }
    });
  };
  useEffect(() => {
    if (error) {
      showToast(
        'error while updating profile data',
        'Ups !!',
        'Try again later',
      );
    }
  }, [error]);
  useFocusEffect(
    useCallback(() => {
      return () => dispatch(clearAuthError());
    }, []),
  );
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        name: '',
        lastname: '',
        age: ''
      }}
      validationSchema={Yup.object({
        name: Yup.string().required('The name is required'),
        lastname: Yup.string().required('The last name is required'),
        age: Yup.number().required('The age is required'),
      })}
      onSubmit={values => handleSubmit(values)}>
      {({handleChange, handleBlur, handleSubmit, values, touched, errors}) => (
        <View style={{padding: 20}}>
          <Title>About You</Title>
          <TextInput
            label="name"
            mode="flat"
            error={errors.name && touched.name ? true : false}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name is required')}
            value={values.name}
          />
          <TextInput
            label="Lastname"
            mode="flat"
            error={errors.lastname && touched.lastname ? true : false}
            onChangeText={handleChange('lastname')}
            onBlur={handleBlur('lastname is required')}
            value={values.lastname}
          />
          <TextInput
            label="age"
            mode="flat"
            error={errors.age && touched.age ? true : false}
            onChangeText={handleChange('age')}
            onBlur={handleBlur('age is required')}
            value={values.age}
          />
          <Button
              disabled={loading}
              loading={loading} 
              mode="contained" 
              onPress={handleSubmit}>
            Update
          </Button>
        </View>
      )}
    </Formik>
  );
};

export default UserData;
