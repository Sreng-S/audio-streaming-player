/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import SoundPlayer from "react-native-sound-player";
import firebase from "react-native-firebase";
import LoginInput from '../../components/LoginInput';
import LoginButton from '../../components/LoginButton';
import FBButton from '../../components/FBButton';
import { signUp, signInWithFacebook } from '../../api/auth';
import Loader from '../../components/Loader';

const { height } = Dimensions.get('screen');
class Signup extends Component {
  state = {
    email: '',
    password: '',
    loaderVisible: false,
  };

  onChangeText = type => value => {
    this.setState({
      [type]: value,
    });
  };

  onSignUp = async () => {
    const { email, password } = this.state;
    if (!email.length || !password.length) {
      Alert.alert('All fields are required');
      return;
    } else {
      try {
        this.setState({
          loaderVisible: true,
        });
        await signUp(email, password);
        this.props.navigation.navigate('main');
      } catch (error) {
        Alert.alert(error.message);
      }
    }
    this.setState({
      loaderVisible: false,
    });
  };

  onSignUpFacebook = async () => {
    this.setState({
      loaderVisible: true,
    });
    try {
      await signInWithFacebook();
      this.props.navigation.navigate('main');
    } catch (error) {
      Alert.alert(error.message);
    }
    this.setState({
      loaderVisible: false,
    });
  };

  onNavigateToSignIn = () => {
    this.props.navigation.navigate('login');
  };

  onNavigateToTerms = () => {
    this.props.navigation.navigate('terms');
  };

  render() {
    const { email, password, loaderVisible } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.background}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <LoginInput
            value={email}
            onChangeText={this.onChangeText('email')}
            placeholder="Email"
            style={{ marginTop: (height * 6.5) / 100 }}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <LoginInput
            value={password}
            onChangeText={this.onChangeText('password')}
            placeholder="Password"
            style={{ marginTop: height * 0.01 }}
            secureTextEntry
          />
          <LoginButton
            title="SIGN UP"
            style={{ marginTop: height * 0.01 }}
            onPress={this.onSignUp}
          />
          <FBButton
            title="SIGN UP WITH FACEBOOK"
            style={{ marginTop: (height * 6.5) / 100 }}
            onPress={this.onSignUpFacebook}
          />
          <View style={styles.singInContainer}>
            <Text style={styles.desc}>Have an account? </Text>
            <TouchableOpacity
              style={{ marginLeft: 2 }}
              onPress={this.onNavigateToSignIn}
            >
              <Text style={[styles.desc, { fontWeight: 'bold' }]}>
                {' '}
                Sign in now
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.termContainer}>
            <TouchableOpacity onPress={this.onNavigateToTerms}>
              <Text style={styles.desc}>Terms</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.logoText}>© 2019 TLDR</Text>
          </View>
          <Loader visible={loaderVisible} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
  },
  background: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#373E4C',
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    height: '20%',
    marginTop: '25%',
  },
  singInContainer: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  desc: {
    fontSize: 15,
    fontWeight: 'normal',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  bottomContainer: {
    flex: 1,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 30,
    right: 30,
  },
  logoText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  termContainer: {
    marginTop: (height * 6.5) / 100,
    display: 'flex',
    alignItems: 'center',
  },
});

export default Signup;
