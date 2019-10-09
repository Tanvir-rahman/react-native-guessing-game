import React from 'react';
import {View, Text, StyleSheet, Button, Image, Dimensions} from 'react-native';

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>The Game is Over!</Text>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/success.png')}
          style={styles.image}
          resizeMode="cover" 
        />
      </View>
      <Text>Number of Rounds: {props.roundsNumber}</Text>
      <Text>You guessed wrong {props.wrongGuess} times !!</Text>
      <Text>Number was: {props.userNumber}</Text>
      <Button title="New Game" onPress={props.newGame}/>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    borderRadius: Dimensions.get('window').width * 0.7 / 2,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 30,
  },
  image: {
    width: '100%',
    height: '100%',
  }
});

export default GameOverScreen;