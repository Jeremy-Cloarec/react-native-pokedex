import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Button from './components/Button';
import Title from './components/Title';
import ImageViewer from './components/ImageViewer';
import Button2 from './components/Button2';

const PlaceholderImage = require('./assets/pikachu.png')

export default function App() {
  return (
    <View style={styles.container}>
      <Title textHeading={"Pokedex"} />
      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button2 label="Voir votre pokedex" />
        <Button label="Attraper un pokemon" />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191616',
    alignItems: 'center',
    justifyContent:'center',
    gap: 50,
  },

  imageContainer: {
    padding: 5,
  },

  footerContainer: {
    alignItems: 'center',
    width: '100%',
    maxWidth: '400px',
    gap: "16px",
  

  },
});
