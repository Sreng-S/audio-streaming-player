import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  Dimensions, ScrollView,
} from 'react-native';
import Loader from '../../components/Loader';
import LoginButton from '../../components/LoginButton';
import { Logout } from '../../api/auth';

const { height } = Dimensions.get('screen');
class Setting extends Component {
  state = {
    loaderVisible: false,
  };

  onChangeText = type => value => {
    this.setState({
      [type]: value,
    });
  };

  onLogOut = async () => {
    try {
      await Logout();
      this.props.navigation.navigate('login');
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  onUpgradeMonth = () => {};

  onUpgradeYear = () => {};

  onNavigateToAbout = () => {
    this.props.navigation.navigate('about');
  };

  onNavigateToPrivacy = () => {
    this.props.navigation.navigate('policy');
  };

  onNavigateToTerms = () => {
    this.props.navigation.navigate('terms');
  };

  onNavigateToMain = () => {
    this.props.navigation.navigate('main');
  };

  render() {
    const { loaderVisible } = this.state;
    const { goBack } = this.props.navigation;
    const terms = 'Throughout the many ups and downs in our careers, books have been there as pillars of wisdom and hope. We hope they’ll be the same for you.\n\n' +
      'We bring you entertaining, inspirational book summaries to accelerate careers and companies. You’ll find that each summary is sprinkled with humor, story, and music. We’re big believers in the mantra, “If it’s not fun, you’re not doing it right!”\n\n' +
      'As part of the beta, each day you’ll get a new summary. Day 1 is Shoe Dog, the story of how Phil Knight and Nike put shoes on the world’s feet.\n\n' +
      'The beta is just a taste of what’s to come.\n\n' +
      'Enjoy!\n\n' +
      'Email our team at team@hellotldr.com to discuss job openings, partnerships, questions, or ideas';

    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#373E4C' }}>
        <View style={styles.container}>
          <View style={styles.background}>
            {/*<TouchableOpacity*/}
            {/*  style={styles.backButton}*/}
            {/*  onPress={this.onNavigateToMain}*/}
            {/*>*/}
            {/*  <Image*/}
            {/*    source={require('../../assets/icons/backIcon.png')}*/}
            {/*    style={styles.backButtonImg}*/}
            {/*    resizeMode='contain'*/}
            {/*  />*/}
            {/*</TouchableOpacity>*/}
            {/*<Text*/}
            {/*  style={styles.topText}*/}
            {/*>BASIC PLAN</Text>*/}
            {/*<Text*/}
            {/*  style={styles.topDescription}*/}
            {/*>Your subscription will automatically be renewed unless turned off in Account Settings at least 24 hours before the current period ends. Payment is charged to your iTunes account.</Text>*/}
            {/*<SettingButton*/}
            {/*  title="UPGRADE FOR $9.99/MONTH"*/}
            {/*  style={{ marginTop: height * 4.5 / 100 }}*/}
            {/*  onPress={this.onUpgradeMonth}*/}
            {/*/>*/}
            {/*<SettingButton*/}
            {/*  title="UPGRADE FOR $99.99/YEAR"*/}
            {/*  style={{ marginTop: height * 0.01 }}*/}
            {/*  onPress={this.onUpgradeYear}*/}
            {/*/>*/}
            <TouchableOpacity style={styles.backButton} onPress={this.onNavigateToMain}>
              <Image
                source={require('../../assets/icons/backIcon.png')}
                style={styles.backButtonImg}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.topText}>ABOUT TL;DR</Text>
            <Text style={styles.topDescription}>{terms}</Text>
            <Text style={styles.topDescription_left}>2019 C TLDR</Text>
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
              <Text style={styles.logoText}>© 2019 TLDR</Text>
            </View>
            <Loader visible={loaderVisible} />
          </View>
        </View>
      </ScrollView>

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
    marginBottom: (height * 2.5) / 100,
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
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: (height * 15) / 100,
    letterSpacing: 3.2,
  },
  topDescription: {
    marginTop: (height * 2.5) / 100,
    width: '95%',
    fontSize: 14,
    fontWeight: 'normal',
    color: '#FFFFFF',
    letterSpacing: -0.2,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  topDescription_left: {
    marginTop: (height * 2.5) / 100,
    width: '95%',
    fontSize: 14,
    fontWeight: 'normal',
    color: '#FFFFFF',
    letterSpacing: -0.2,
    paddingHorizontal: 10,
    textAlign: 'right',
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

export default Setting;
