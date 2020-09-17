/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

const PlayButton = ({ progress, onPlay, isReady, isPlaying }) => (
  <View style={styles.playBtnContainer}>
    {isReady && (
      <Image
        source={require('../../assets/images/gradient.png')}
        style={styles.gradient}
      />
    )}
    {isReady && (
      <Progress.Circle
        size={125}
        direction="counter-clockwise"
        progress={progress}
        borderWidth={0}
        thickness={8}
        color="#98A7CF"
      />
    )}
    <TouchableOpacity
      onPress={onPlay}
      disabled={!isReady}
      style={[{ position: 'absolute' }, isReady && styles.playBtnShadow]}
    >
      <Image
        source={
          isPlaying
            ? require('../../assets/images/pause.png')
            : require('../../assets/images/play.png')
        }
        style={[styles.playBtnImg, !isReady && { opacity: 0.5 }]}
      />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  playBtnContainer: {
    width: 171,
    height: 171,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playBtnShadow: {
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 4,
    shadowOpacity: 0.99,
    elevation: 2,
  },
  playBtnImg: {
    width: 100,
    height: 100,
  },
  gradient: {
    position: 'absolute',
    width: 125,
    height: 125,
  },
});

export default PlayButton;
