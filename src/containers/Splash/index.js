import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { CheckStore } from '../../api/auth';

class Splash extends Component {
  async componentDidMount() {
    const res = await CheckStore();
    if (res) {
      this.props.navigation.navigate('main');
    } else {
      setTimeout(() => {
        this.props.navigation.navigate('signup');
      }, 3000);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.background}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    backgroundColor: '#373E4C',
    // position: 'absolute',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '50%',
  },
});

export default Splash;
