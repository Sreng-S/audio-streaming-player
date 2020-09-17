import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

const Loader = ({ visible, text }) =>
  visible ? (
    <View style={styles.indicator}>
      <ActivityIndicator size="large" color="#FFFFFF" />
      {text ? <Text style={styles.indicatorText}>{text}</Text> : null}
    </View>
  ) : null;

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  indicatorText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
    marginTop: 10,
  },
});

export default Loader;
