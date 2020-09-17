import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const LoginInput = ({
  placeholder = '',
  style,
  secureTextEntry = false,
  value,
  onChangeText,
  keyboardType = 'default',
  autoCapitalize = 'words',
}) => (
  <TextInput
    style={[styles.inputContainer, style]}
    placeholder={placeholder}
    secureTextEntry={secureTextEntry}
    value={value}
    onChangeText={onChangeText}
    keyboardType={keyboardType}
    autoCapitalize={autoCapitalize}
  />
);

const styles = StyleSheet.create({
  inputContainer: {
    width: '80%',
    height: '4.7%',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 28,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '600',
  },
});

export default LoginInput;
