import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../constants/colors';
const NumberContainer = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{props.children}</Text>
    </View>
  );
};

const styles = {
  container: {
    borderWidth: 2,
    borderColor: Colors.danger,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    color: Colors.danger,
    fontSize: 22,
  }
};

export default NumberContainer;