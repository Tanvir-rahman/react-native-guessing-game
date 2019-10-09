import React, {
  useState, 
  useEffect,
} from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  Button,
  Alert,
  Dimensions,
} from 'react-native';
import { ScreenOrientation } from 'expo';

import colors from '../constants/colors';
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';

const StartGameScreen = props => {
  // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

  // Restrict invalid value
  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };

  // Reset value
  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  }

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get('window').width / 4);
    };
    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    }
  });


  // For resetting input and confirm selected number
  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid Number !',
        'Number should be between 1 to 99',
        [{
          text: 'Okay',
          style: 'destructive',
          onPress: resetInputHandler,
        }]
      );
      return;
    } else {
      setConfirmed(true);
      setEnteredValue('');
      setSelectedNumber(parseInt(enteredValue));
    }
    Keyboard.dismiss();
  }

  let confirmedOutput;
  if(confirmed) {
    confirmedOutput = 
    <Card style={styles.confirmation}>
      <Text>You Selected</Text>
      <NumberContainer>{selectedNumber}</NumberContainer>

      <Button title="Start Game" onPress={() => props.onStartGame(selectedNumber)}/>
    </Card>;
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback
          onPress={() => Keyboard.dismiss()}>
          <View style={styles.innerScreen}>
            <Text style={styles.title}>Start Game</Text>
            <Card style={styles.inputContainer}>
              <Text>Select a Number</Text>
              <Input
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={2}
                style={styles.input}
                onChangeText={numberInputHandler}
                value={enteredValue}
              />
              <View style={styles.buttonContainer}>
                <View style={
                  {...styles.button, ...styles.danger, width: buttonWidth}
                }>
                  <Button title="Reset" color="white"
                    onPress={resetInputHandler}
                  />
                </View>
                <View style={{...styles.button, width: buttonWidth}}>
                  <Button title="Confirm" color="white"
                    onPress={confirmInputHandler} />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  innerScreen: {
    alignItems: 'center',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: '80%',
    maxWidth: '95%',
    minWidth: 300,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  button: {
    color: '#ffffff',
    backgroundColor: colors.primary,
  },
  danger: {
    backgroundColor: colors.danger,
  },
  input: {
    width: '40%',
  },
  confirmation: {
    marginVertical: 10,
    textAlign: 'center',
    alignItems: 'center',
  }
});

export default StartGameScreen;