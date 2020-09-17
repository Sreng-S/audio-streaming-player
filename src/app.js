import React from "react";
import { mapping, light } from "@eva-design/eva";
import { ApplicationProvider, Layout, Text } from "react-native-ui-kitten";
import { Provider as ReduxProvider } from "react-redux";
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';

import { styles } from "./app.styles";
import { store } from "./redux/store";
import MainNavigator from "./navigator/mainNavigator";

export default class App extends React.Component {
  state = {
    isLoaded: false
  };

  componentWillMount() {
    this.checkPermission();
    this.loadAssets();
  }

  checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  };

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  loadAssets = async () => {
    // add any loading assets here
    this.setState({ isLoaded: true });
  };

  renderLoading = () => (
    <Layout style={[styles.flex]}>
      <Text>Loading</Text>
    </Layout>
  );

  renderApp = () => (
    <ReduxProvider store={store}>
      <ApplicationProvider mapping={mapping} theme={light}>
        <MainNavigator/>
      </ApplicationProvider>
    </ReduxProvider>
  );

  render = () =>
    this.state.isLoaded ? this.renderApp() : this.renderLoading();
}
