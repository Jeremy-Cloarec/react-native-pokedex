import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';
import Button from '../components/ButtonHome';
import Title from '../components/Title';


export default function HomePokedex({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.containerImageText}>
                <Title textHeading={"Pokedex"} />
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={require('../assets/pikachu.png')} />
                </View>
            </View>
            <View style={styles.footerContainer}>
                <Button
                    navigation={navigation}
                    label="Mon pokedex"
                    link="Pokedex"
                    backgroundColor="rgba(255,255,255, 0.8)"
                />
                <Button
                    navigation={navigation} label="Capturer des pokemons" link="Pokemons"
                    backgroundColor="#FADE83" />
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        backgroundColor: '#191616',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        padding: 16, 
    },
    containerImageText: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 24,
        width: "100%",
        marginTop: 24,
    },

    imageContainer: {
        width: "100%",
        minWidth: "100%",
        width: "100%",
        flex: 1, 
        maxWidth: "100%",
        maxWidth: "100%",
    },

    image: {
        minWidth: "100%",
        width: "100%",
        flex: 1, 
        maxWidth: "100%",
        maxWidth: "100%",
        resizeMode: "contain",
    },

    footerContainer: {
        alignItems: 'center',
        width: '100%',
        gap: 16,
    },
});
