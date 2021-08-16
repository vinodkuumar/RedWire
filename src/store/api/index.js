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

export const updateUserData = async (values, user) => {
  try {
    const collection = userCollection.doc(user.uid);
    const update = await collection.update(values);

    const newUser = {
      ...user,
      ...values,
    };
    return {user: newUser, error: null};
  } catch (error) {
    return {user: user, error: error};
  }
};




