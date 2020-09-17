import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const FBButton = ({ title, style, onPress }) => (
  <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: '80%',
    height: '4.7%',
    backgroundColor: '#58BED3',
    borderRadius: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default FBButton;
