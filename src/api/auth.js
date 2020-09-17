import firebase from 'react-native-firebase';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import AsyncStorage from '@react-native-community/async-storage';
import SoundPlayer from 'react-native-sound-player';
const date = new Date();


export const signUp = async (email, password) => {
  global.reload = true;
  const res = await firebase.auth().createUserWithEmailAndPassword(email, password);
  await firebase.firestore().collection('users').doc(res.user.uid).set({
    email,
    createdAt: date.getTime(),
  });
  await AsyncStorage.setItem('@InadayStore', res.user.uid);
}

export const signIn = async (email, password) => {
  global.reload = true;
  SoundPlayer.seek(0);
  const result = await firebase.auth().signInWithEmailAndPassword(email, password);
  await AsyncStorage.setItem('@InadayStore', result.user.uid);
}

export const signInWithFacebook = async () => {
  global.reload = true;
  LoginManager.logOut();
  const result = await LoginManager.logInWithPermissions(['public_profile', 'email'])

  if (result.isCancelled) {
    // handle this however suites the flow of your app
    throw new Error('User cancelled request');
  }

  console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);

  // get the access token
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    // handle this however suites the flow of your app
    throw new Error('Something went wrong obtaining the users access token');
  }

  // create a new firebase credential with the token
  const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

  // login with credential
  const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
  const snapshot = await firebase.firestore().collection('users').doc(firebaseUserCredential.user.uid).get();
  if (!snapshot.exists) {
    await firebase.firestore().collection('users').doc(firebaseUserCredential.user.uid).set({
      email: firebaseUserCredential.user.email,
      createdAt: date.getTime(),
    });
  }
  await AsyncStorage.setItem('@InadayStore', snapshot.id);
}

export const Logout = async () => {
  global.reload = false;
  SoundPlayer.stop();
  await firebase.auth().signOut();
  await AsyncStorage.removeItem('@InadayStore');
}

export const CheckStore = async () => {
  try {
    const data = await AsyncStorage.getItem('@InadayStore');
    return !!data;
  } catch (e) {
    return false;
  }
}
