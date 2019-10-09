import React, {useState, useRef, useEffect} from 'react';
import { View, Text, Button, StyleSheet, Alert, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';

// Generating random number with min(include), max(exclude) and excluded number
const generateRandomBetween = (min ,max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  const randomNumber = Math.floor(Math.random() * (max-min)) + min;

  if(randomNumber === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randomNumber;
  }
};

// For showing rounds data
const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    <Text>#{ listLength - itemData.index }</Text>
    <Text>{itemData.item}</Text>
  </View>
);


const GameScreen = props => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const [wrongGuess, setWrongGuess] = useState(0);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const {userChoice, onGameOver, setWrongGuesses} = props;

  // Win Condition check
  useEffect(() => {
    if(currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
      setWrongGuesses(wrongGuess);
    }
  }, [currentGuess, userChoice, onGameOver]);
  
  const nextGuessHandler = direction => {
    // Checking if user choice(Start game screen) is lower than current guess
    // 5 < 6, if lower button press it should be invalid
    // Similarly condition checked for greater
    if((direction === 'lower' && currentGuess < props.userChoice) || 
      direction === 'greater' && currentGuess > props.userChoice
    ) {
      Alert.alert(
        'Wrong Guess !!',
        'You have chosen wrong answer',
        [{text: 'Try Again!', style: 'cancel'}]);  
      setWrongGuess(wrongGuess => wrongGuess + 1);
      return;
    }

    // if guess is correct then making boundary on that guess
    // 3(Current Guess) < 2(User Selected number) -> Making current guess as Higher Boundary
    if(direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    setPastGuesses(pastGuesses => [nextNumber.toString(), ...pastGuesses])
  }
  
  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        {/* <Ionicons name="md-remove" size={24} color="black"/> */}
        <Button title="LOWER" onPress={nextGuessHandler.bind(this,'lower')} />
        <Button title="GREATER" onPress={nextGuessHandler.bind(this,'greater')}/>
      </Card>
      <View style={styles.listContainer}>
      <FlatList
        keyExtractor={item => item}
        data={pastGuesses}
        renderItem={renderListItem.bind(this, pastGuesses.length)}
        contentContainerStyle={styles.list}
      /></View>
    </View>
  ); 
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    width: 300,
    maxWidth: '80%',
  },
  listContainer: {
    flex: 1,
    width: '60%',
  },
  list: {
    flexGrow: 1,
    // alignItems: 'center',
    justifyContent: 'flex-start',
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  }
});

export default GameScreen;