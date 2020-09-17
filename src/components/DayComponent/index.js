import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { formatDuration } from '../../utils/textUtils';
import PlayButton from '../PlayButton';

class DayComponent extends Component {
  render() {
    const {
      day,
      title,
      isPlaying,
      isReady,
      duration,
      current,
      onPlay,
    } = this.props;
    let progress = 0;
    if (duration) {
      progress = current / duration;
    }
    return (
      <View style={styles.container}>
        <Image
          source={
            day === 'YESTERDAY'
              ? require('../../assets/images/bg2.png')
              : day === 'TODAY'
              ? require('../../assets/images/bg3.png')
              : require('../../assets/images/bg4.png')
          }
          style={styles.background}
        />
        <Text style={styles.day}>{day}</Text>
        <Text style={styles.title}>{title}</Text>
        <PlayButton
          progress={1 - progress}
          onPlay={onPlay}
          isReady={isReady}
          isPlaying={isPlaying}
        />
        <Text style={styles.duration}>
          {isReady
            ? `${formatDuration(current)} / ${formatDuration(duration)}`
            : 'Loading...'}
        </Text>
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
    position: 'absolute',
    width: '100%',
  },
  day: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 28,
    letterSpacing: 3.2,
    color: '#FFFFFF',
  },
  title: {
    marginTop: 6,
    fontSize: 17,
    lineHeight: 20,
    letterSpacing: -0.4,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  duration: {
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.24,
    color: '#FFFFFF',
  },
});

export default DayComponent;
