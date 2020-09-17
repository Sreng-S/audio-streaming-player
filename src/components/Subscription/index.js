/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { withNavigation } from 'react-navigation';

const features = [
  'A new summary every day',
  'Access to all summaries on-demand',
  'Unlock exclusive exercises & more',
];
const { width } = Dimensions.get('screen');

class Subscription extends Component {
  componentDidMount() {}

  onNavigateToAbout = () => {
    this.props.navigation.navigate('about');
  };

  onNavigateToPrivacy = () => {
    this.props.navigation.navigate('policy');
  };

  onNavigateToTerms = () => {
    this.props.navigation.navigate('terms');
  };

  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#373E4C' }}>
        <View style={styles.container}>
          <Text style={styles.title}>UNLOCK ALL OF TL;DR</Text>
          <Text style={styles.subTitle}>
            First 7 summaries are completely FREE.
          </Text>
          <Text style={styles.subContent}>
            Subscribe to support our amazing team in bringing positivity and
            wisdom to the world:
          </Text>
          <View style={styles.featureContainer}>
            {features.map(f => (
              <View style={styles.feature} key={f}>
                <Image
                  source={require('../../assets/images/checkmark.png')}
                  style={styles.featureIcon}
                />
                <Text style={styles.featureText}>{f}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={[styles.button, { marginTop: 25 }]}>
            <Text style={styles.buttonText}>SUBSCRIBE FOR $9.99/MONTH</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { marginTop: 6 }]}>
            <Text style={styles.buttonText}>SUBSCRIBE FOR $90.99/YEAR</Text>
          </TouchableOpacity>

          <View style={styles.bottomContainer}>
            <View style={styles.bottomBtns}>
              <TouchableOpacity onPress={this.onNavigateToAbout}>
                <Text style={styles.bottomBtnText}>Restore</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onNavigateToTerms}>
                <Text style={styles.bottomBtnText}>Terms</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onNavigateToPrivacy}>
                <Text style={styles.bottomBtnText}>Privacy</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.bottomText}>
              Your subscription will automatically be renewed unless turned off
              in Account Settings at least 24 hours before the current period
              ends. Payment is charged to your iTunes account.
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#373E4C',
  },
  title: {
    marginTop: 80,
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 28,
    letterSpacing: 1.2,
    color: '#FFFFFF',
    textAlign: 'center',
    marginHorizontal: 30,
  },
  subTitle: {
    marginTop: 15,
    fontSize: 17,
    color: '#FFFFFF',
    textAlign: 'center',
    marginHorizontal: 50,
  },
  subContent: {
    marginTop: 25,
    fontSize: 15,
    color: '#FFFFFF',
    textAlign: 'center',
    marginHorizontal: 50,
  },
  featureContainer: {
    marginTop: 10,
  },
  feature: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  featureIcon: {
    width: 16,
    height: 16,
    tintColor: '#F0C850',
  },
  featureText: {
    marginLeft: 8,
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.41,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: width - 100,
    borderRadius: 6,
    backgroundColor: '#58BED3',
  },
  buttonText: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: 'bold',
    letterSpacing: -0.24,
    color: '#FFFFFF',
  },
  bottomContainer: {
    marginTop: 40,
    // display: 'flex',
    alignItems: 'center',
  },
  bottomBtns: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  bottomBtnText: {
    fontSize: 15,
    color: '#FFFFFF',
    lineHeight: 20,
    letterSpacing: -0.24,
  },
  bottomText: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: -0.08,
    color: '#90949C',
    textAlign: 'center',
    marginTop: 25,
    marginHorizontal: 25,
  },
});

export default withNavigation(Subscription);
