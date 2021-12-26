import React from 'react';
import { StyleSheet, Text, View, Share } from 'react-native';
import { Button } from 'react-native-elements';

import { saveQuizzResult } from '../utils/history';
import theme from '../utils/theme.js';

export default ({navigation, rightAnswersCount, quizzLength}) => {
  let message;
  if(rightAnswersCount === quizzLength){
    message = 'Bravo !';
  } else if (rightAnswersCount / quizzLength > 0.5) {
    message = 'Pas si mal, encore un effort !';
  } else if (rightAnswersCount / quizzLength > 0.2) {
    message = 'Il y a encore du boulot';
  } else {
    message = "C'est pas top...";
  }

  const share = async () => {
    try {
      const result = await Share.share({
        message: `J'ai obtenu ${rightAnswersCount} / ${quizzLength} sur un quizz sur les règles de l'ultimate`,
        title: "Règles de l'ultimate",
      })
    } catch (error) {
      console.log('Error sharing result', error)
    }
  }

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.report}>Bilan</Text>
      </View>
      <Text>{rightAnswersCount} bonnes réponses pour {quizzLength} questions</Text>
      <Text>Mon commentaire :</Text>
      <View style={styles.result}>
        <Text>{message}</Text>
      </View>
      <Button
        containerStyle={styles.buttonContainer}
        title="Partager mon résultat"
        onPress={share}
        type="outline"
      />
      <Button
        containerStyle={styles.buttonContainer}
        title="Retourner à l'accueil"
        onPress={() => {
          saveQuizzResult({ rightAnswersCount, quizzLength, createdAt: new Date() });
          navigation.navigate('HomeScreen')
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  report: {
    fontSize: theme.FONT_SIZE_XL,
  },
  header: {
    paddingBottom: 10,
  },
  result: {
    marginVertical: 10,
    marginLeft: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
});