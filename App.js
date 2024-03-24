import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Button from './components/Button';
import Title from './components/Title';
import ImageViewer from './components/ImageViewer';

const PlaceholderImage = require('./assets/pikachu.png')

export default function App() {
  return (
    <View style={styles.container}>
      <Title textHeading={"Pokedex"} />
      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button label="Choose a photo" />
        <Button label="Choose a name" />
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
    justifyContent: 'center',
    gap: 50,
  },

  imageContainer: {
    backgroundColor: "red",
    width:"400px",
    padding: 5,
  },

  footerContainer: {
    alignItems: 'center',
    backgroundColor: 'red',
    width:'100%'
  },
});
