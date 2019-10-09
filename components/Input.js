import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import { black } from 'ansi-colors';

const Input = props => {
  return <TextInput {...props} style={{ ...styles.input, ...props.style }} />
};

const styles = StyleSheet.create({
  input: {
    height: 30,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginVertical: 10,
  }
});

export default Input;