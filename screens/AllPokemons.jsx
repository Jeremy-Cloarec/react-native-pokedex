import { StyleSheet, ActivityIndicator, FlatList, Text, View, Image, Pressable } from 'react-native';
import { useData } from "../dataContext/contextFetchData";
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

export default function AllPokemons() {
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

    console.log("Number of items:", numberItem);  // Mettez ce log ici pour voir la nouvelle valeur

    return (
        <View>
            {numberItem <= 120 && isLoading ? (
                <ActivityIndicator style={styles.loaderStyle} />
            ) : (
                <View style={styles.containerAll}>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => handlePokemonPress(item.id)} style={styles.containercard}>
                                <View style={styles.containerImage}>
                                    <Image style={styles.imageCard} source={{ uri: item.image }} />
                                </View>
                                <Text style={styles.textCard}>{item.name}</Text>
                            </Pressable>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                        contentContainerStyle={styles.containerAllPokemons}
                        ListFooterComponent={() => (
                            <>
                                {numberItem >= 10 && isLoading ? (
                                    <ActivityIndicator style={styles.loaderStyle} />
                                ) : (
                                    <Pressable onPress={showMore} style={styles.showMore}>
                                        <Text style={styles.showMoreTexte}>{messageFetchMore}</Text>
                                    </Pressable>
                                )}
                            </>
                        )}
                    />
                </View>
            )}
        </View>
    )
}
const styles = StyleSheet.create({
    loaderStyle: {
        marginBottom: 50,
        marginTop: 50,
    },

    containerAll: {
        backgroundColor: "#191616",
        //alignItems:"center",
    },
    containerAllPokemons: {
        paddingVertical: 18,
        paddingHorizontal: 10,
        width: '100%',
        maxWidth: 800,
        margin: "auto"
    },

    showMore: {
        marginBottom: 50,
        marginTop: 50,
        textAlign: "center",
        alignItems: "center",
        margin: "auto"
    },

    showMoreTexte: {
        color: "white"
    },

    containercard: {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        margin: 8,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        width: "100%",
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
