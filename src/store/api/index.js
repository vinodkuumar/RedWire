import {firebase, userCollection} from '../../firebase';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const registerUser = async ({email, password}) => {
  try {
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    const {user} = response;
    const userProfile = {
      uid: user.uid,
      email: email,
    };
    await usersCollection.doc(user.uid).set(userProfile);
    return {isAuth: true, user: userProfile};
  } catch (error) {
    return {error: error.message};
  }
};

const readData = () => {
  var userId = firebase.auth().currentUser.uid;
  return firebase
    .database()
    .ref('/users/' + userId)
    .once('value');
};

export const loginUser = async ({email, password}) => {
  try {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    const data = readData();
    console.warn(data);

    return {isAuth: true, user: data};
  } catch (error) {
    return {error: error.message};
  }
};

export const autoSignIn = () =>
  new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        userCollection
          .doc(user.uid)
          .get()
          .then(snapshot => {
            resolve({isAuth: true, user: snapshot.data()});
          });
      } else {
        return {
          isAuth: false,
          user: [],
        };
      }
    });
  });

export const logoutUser = () => {
  firebase.auth().signOut();
};


export const createUser = values => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://redwire-7d8a9-default-rtdb.firebaseio.com/users.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-TYpe': 'application/json',
        },
        body: JSON.stringify({
          values,
        }),
      },
    );
    const resData = await response.json();
    console.log('responseData = ', resData);
    dispatch({
      type: 'CREATE_PRODUCT',
      values,
    });
  };
};


export const updateUserData = async (values, user) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://redwire-7d8a9-default-rtdb.firebaseio.com/${id}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values,
        }),
      },
    );
    if (!response.ok) {
      throw new Error('Something went wrong');
    }
    dispatch({
      type: 'UPD_USER_DATA',
      payload: values,
    });
  };
};
