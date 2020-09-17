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
import LoginInput from '../../components/LoginInput';
import LoginButton from '../../components/LoginButton';
import FBButton from '../../components/FBButton';
import Loader from '../../components/Loader';
import { signIn, signInWithFacebook } from '../../api/auth';

const { height } = Dimensions.get('screen');
class Login extends Component {
  state = {
    email: 'tester01@mail.com',
    password: 'tester',
    loaderVisible: false,
  };

  onChangeText = type => value => {
    this.setState({
      [type]: value,
    });
  };

  onSignIn = async () => {
    this.setState({
      loaderVisible: true,
    });
    const { email, password } = this.state;
    if (!email.length || !password.length) {
      Alert.alert('All fields are required');
      this.setState({
        loaderVisible: false,
      });
      return;
    } else {
      try {
        await signIn(email, password);
        this.props.navigation.navigate('main');
      } catch (error) {
        Alert.alert(error.message);
      }
    }
    this.setState({
      loaderVisible: false,
    });
  };

  onSignInFacebook = async () => {
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

  onNavigateToSignUp = () => {
    this.props.navigation.navigate('signup');
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
            title="SIGN IN WITH EMAIL"
            style={{ marginTop: height * 0.01 }}
            onPress={this.onSignIn}
          />
          <FBButton
            title="SIGN IN WITH FACEBOOK"
            style={{ marginTop: (height * 6.5) / 100 }}
            onPress={this.onSignInFacebook}
          />
          <View style={styles.singUpContainer}>
            <Text style={styles.desc}>Don't have an account yet? </Text>
            <TouchableOpacity
              style={{ marginLeft: 2 }}
              onPress={this.onNavigateToSignUp}
            >
              <Text style={[styles.desc, { fontWeight: 'bold' }]}>
                {' '}
                Sign up now
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.termContainer}>
            <TouchableOpacity onPress={this.onNavigateToTerms}>
              <Text style={styles.desc}>Terms</Text>
            </TouchableOpacity>
            <Text style={styles.termText}>
              “With the new day comes new strengths and new thoughts.” - Eleanor
              Roosevelt
            </Text>
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
  bottomContainer: {
    flex: 1,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 30,
    right: 30,
  },
  desc: {
    fontSize: 15,
    fontWeight: 'normal',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  logo: {
    height: '20%',
    marginTop: '25%',
  },
  logoText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  singUpContainer: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  termContainer: {
    marginTop: (height * 6.5) / 100,
    display: 'flex',
    alignItems: 'center',
  },
  termText: {
    marginTop: 15,
    fontSize: 15,
    fontWeight: 'normal',
    color: '#90949C',
    letterSpacing: -0.5,
    textAlign: 'center',
  },
});

export default Login;
