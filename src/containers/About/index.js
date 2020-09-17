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
import Loader from '../../components/Loader';
import LoginButton from '../../components/LoginButton';
import { Logout } from '../../api/auth';

const { height } = Dimensions.get('screen');
class About extends Component {
  state = {
    loaderVisible: false,
  };

  onNavigateToTerms = () => {
    this.props.navigation.navigate('terms');
  };

  onLogOut = async () => {
    try {
      await Logout();
      this.props.navigation.navigate('login');
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  render() {
    const { loaderVisible } = this.state;
    const { goBack } = this.props.navigation;

    const terms = 'Welcome to the beta version of TL;DR!\n' +
      'Our mission is to bridge the gap between the busy world of work and the brilliant world of books.\n' +
      'Throughout the many ups and downs in our careers, books have been there as pillars of wisdom and hope. We hope they’ll be the same for you.\n' +
      'We bring you entertaining, inspirational book summaries to accelerate careers and companies. At about 5 minutes each, you can listen on the way to work, on your lunch break, or any time you need a boost.\n' +
      'You’ll find that each summary is sprinkled with humor, story, and music.\n' +
      'We’re big believers in the mantra, “If it’s not fun, you’re not doing it right!”\n' +
      'As part of the beta, each day you’ll get a new summary. Day 1 is Shoe Dog, the story of how Phil Knight and Nike put shoes on the world’s feet.\n' +
      'The beta is just a taste of what’s to come.\n' +
      'Enjoy!\n' +
      'Email our team at team@hellotldr.com to discuss job openings, partnerships, questions, or ideas.';

    return (
      <View style={styles.container}>
        <View style={styles.background}>
          <TouchableOpacity style={styles.backButton} onPress={() => goBack()}>
            <Image
              source={require('../../assets/icons/backIcon.png')}
              style={styles.backButtonImg}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.topText}>ABOUT</Text>
          <Text style={styles.topDescription}>{terms}</Text>
          <LoginButton
            title="LOG OUT"
            style={{ marginTop: (height * 5) / 100 }}
            onPress={this.onLogOut}
          />
          <View style={styles.termContainer}>
            <TouchableOpacity onPress={this.onNavigateToTerms}>
              <Text style={styles.desc}>Terms</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.logoText}>© 2019 Inaday</Text>
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
  backButton: {
    position: 'absolute',
    top: 40,
    left: 30,
  },
  backButtonImg: {
    flex: 1,
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    width: 20,
    height: 20,
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
  logoText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  topText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: '30%',
  },
  topDescription: {
    marginTop: (height * 2.5) / 100,
    marginLeft: 10,
    width: '95%',
    fontSize: 14,
    fontWeight: 'normal',
    color: '#FFFFFF',
    letterSpacing: -0.2,
    textAlign: 'left',
  },
  termContainer: {
    marginTop: (height * 6.5) / 100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  termText: {
    width: 80,
    margin: 'auto',
    alignItems: 'center',
  },
});

export default About;
