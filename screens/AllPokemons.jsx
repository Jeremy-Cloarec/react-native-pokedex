import { StyleSheet, ActivityIndicator, Text, View, Image, Pressable, ScrollView } from 'react-native';
import { useData } from "../dataContext/contextFetchData";
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function AllPokemons() {
    const insets = useSafeAreaInsets();
    const { isLoading, data, numberItem, setNumberItem } = useData();
    const navigation = useNavigation();

    const [messageFetchMore, setMessageFetchMore] = useState("Afficher plus")

    const handlePokemonPress = (pokemonId) => {
        navigation.navigate('DetailPokemon', { pokemonId });
    };

    const showMore = () => {
        if (numberItem <= 898) {
            setNumberItem(numberItem + 60)
        } else {
            setMessageFetchMore("Vous êtes à la fin de la liste")
        }
    }

    console.log("Number of items:", numberItem);

    return (
        <ScrollView contentContainerStyle={{
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
            flexGrow: 1,
        }}>
            {numberItem <= 120 && isLoading ? (
                <ActivityIndicator style={styles.loaderStyle} />
            ) : (
                <View style={styles.containerAll}>
                    {data.map((item) => (
                        <Pressable key={item.id} onPress={() => handlePokemonPress(item.id)} style={styles.containercard}>
                            <View style={styles.containerImage}>
                                <Image style={styles.imageCard} source={{ uri: item.image }} />
                            </View>
                            <Text style={styles.textCard}>{item.name}</Text>
                        </Pressable>
                    ))}


                    {numberItem >= 10 && isLoading ? (
                        <ActivityIndicator style={styles.loaderStyle} />
                    ) : (
                        <Pressable onPress={showMore} style={styles.showMore}>
                            <Text style={styles.showMoreTexte}>{messageFetchMore}</Text>
                        </Pressable>
                    )}
                </View>
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    loaderStyle: {
        marginBottom: 50,
        marginTop: 50,
        minWidth: '100%'
    },

    containerAll: {
        paddingVertical: 18,
        paddingHorizontal: 10,
        maxWidth: 800,
        margin: "auto",
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },

    showMore: {
        marginBottom: 50,
        marginTop: 50,
        textAlign: "center",
        alignItems: "center",
        minWidth: '100%'
    },

    showMoreTexte: {
        color: "black",
    },

    containercard: {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        margin: 8,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        minWidth: '40%',
        borderRadius: 18,
        gap: 8,
        padding: 6,
    },

    containerImage: {
        width: "100%",
    },

    textCard: {
        fontWeight: "600",
    },

    imageCard: {
        height: 130,
        borderRadius: 10,
        padding: 10,
        resizeMode: "contain",
        width: "100%",
        maxWidth: "100%",
        minWidth: "100%",
    }
})
