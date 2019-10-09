import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import colors from '../constants/colors';

const Header = props => {
  return (
    <View style={{
      ...styles.headerBase,
      ...Platform.select({
        ios: styles.headerIOS,
        android: styles.headerAndroid,
      })
    }}>
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBase: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIOS: {
    backgroundColor: 'white',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  headerAndroid: {
    backgroundColor: colors.primary,
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,
  },
  headerTitle: {
    color: 'black',
    fontSize: 18,
  }
});

export default Header;