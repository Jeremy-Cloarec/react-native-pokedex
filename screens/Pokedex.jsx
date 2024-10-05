import { StyleSheet, View, Text, Pressable, Image, ScrollView, TouchableOpacity, PanResponder, Animated } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export default function Pokedex() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const [values, setValues] = useState([]);
    const [keys, setKeys] = useState([]);
    const [translateXValues, setTranslateXValues] = useState([]);

    const createPanResponder = (index) => {
        return PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gestureState) => {
                if (gestureState.dx < 0) {
                    translateXValues[index].setValue(gestureState.dx);
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dx < -50) {
                    console.log("delete");
                    Animated.spring(translateXValues[index], {
                        toValue: -100,
                        useNativeDriver: true
                    }).start();
                } else {
                    Animated.spring(translateXValues[index], {
                        toValue: 0,
                        useNativeDriver: true
                    }).start();
                }
            },
        });
    };

    const getIdsPokemons = useCallback(async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            setKeys(keys);

            const values = await AsyncStorage.multiGet(keys);
            const parsedValues = values
                .filter((item) => {
                    try {
                        JSON.parse(item[1]);
                        return true;
                    } catch (e) {
                        return false;
                    }
                })
                .map((item) => JSON.parse(item[1]));

            setValues(parsedValues);
            // Initialiser les valeurs animées pour chaque Pokémon
            setTranslateXValues(parsedValues.map(() => new Animated.Value(0)));
        } catch (error) {
            console.error("Error", error);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            getIdsPokemons();
        }, [])
    );

    useEffect(() => {
        getIdsPokemons();
    }, [getIdsPokemons]);

    const clearAll = async () => {
        try {
            await AsyncStorage.clear();
            setValues([]);
            setTranslateXValues([]); // Réinitialiser les valeurs animées
        } catch (error) {
            console.error("Error", error);
        }
    };

    const clearOne = async (name) => {
        try {
            await AsyncStorage.removeItem(name);
            getIdsPokemons();
        } catch (error) {
            console.error("Error", error);
        }
    };

    const handlePokemonSearch = (pokemonName) => {
        navigation.navigate('DetailPokemon', {
            pokemonName: pokemonName
        });
    };

    return (
        <ScrollView style={[{
            flex: 1,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        }, styles.containerAllPokemons]}>
            {values.length === 0 ? (
                <View style={styles.containerNoPokemon}>
                    <Text style={styles.textNoPokemon}>Vous n'avez pas encore de pokemon dans votre pokedex</Text>
                </View>

            ) : (
                <>
                    <View style={styles.containerCard}>
                        <Text style={styles.textTitle}>Pokedex</Text>
                        <Text style={styles.subTextTitle}>Vous avez {values.length} pokemons dans votre pokedex</Text>
                        {values.map((pokemon, index) => {

                            const translateX = translateXValues[index]; // Récupère la valeur animée

                            if (!translateX) {
                                return null; // Ou un composant de remplacement
                            }

                            return (
                                <View key={pokemon.id} style={styles.card}>
                                    <Animated.View style={{
                                        flex: 1,
                                        transform: [{ translateX: translateXValues[index] }]
                                    }}>
                                        <View style={styles.cardText} {...createPanResponder(index).panHandlers}>
                                            <TouchableOpacity
                                                style={styles.imagePoke}
                                                onPress={() => handlePokemonSearch(pokemon.name)}
                                            >
                                                <Image style={styles.imageCard} source={{ uri: pokemon.image }} />
                                            </TouchableOpacity>
                                            <View style={styles.containerText}>
                                                <Text style={styles.textCard}>{pokemon.name}</Text>
                                                <View style={styles.containerTypes}>
                                                    {pokemon.apiTypes.map((type, id) => (
                                                        <View key={id} style={styles.subContainerTypes}>
                                                            <Image source={{ uri: type.image }} style={styles.imageType} />
                                                            <Text key={id} style={styles.textType}>{type.name}</Text>
                                                        </View>
                                                    ))}
                                                </View>
                                            </View>
                                            <Pressable style={styles.deletePokemon} onPress={() => clearOne(pokemon.name)}>
                                                <Image source={require('../assets/lock.png')} style={styles.imageLock} />
                                                <Text style={styles.textDeletePokemon}>Relacher</Text>
                                            </Pressable>
                                        </View>
                                    </Animated.View>
                                </View>
                            );
                        })}
                    </View>
                    <Pressable onPress={clearAll} style={styles.buttonClear}>
                        <Text style={styles.textButtonClear}>Relâcher tous les pokémons</Text>
                    </Pressable>
                </>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    containerAllPokemons: {
        paddingVertical: 18,
        paddingHorizontal: 10,
    },
    containerNoPokemon: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 60
    },
    textNoPokemon: {
        fontSize: 16,
        textAlign: "center",
        marginTop: 12,
    },
    textTitle: {
        fontSize: 24,
        fontWeight: "600",
        textAlign: "center",
        marginTop: 12,
    },
    subTextTitle: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 12,
    },
    containerCard: {
        gap: 12,
        marginTop: 12,
        marginHorizontal: 12,
    },
    deletePokemon: {
        minHeight: "100%",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        right: -100,
        borderRadius: 8,
        paddingRight: 20,
        gap: 4,
    },
    textDeletePokemon: {
        fontSize: 16,
    },
    imageLock: {
        width: 52,
        height: 52,
    },
    card: {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        flex: 1,
        borderRadius: 8,
        padding: 6,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
    },
    cardText: {
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
    },
    containerText: {
        gap: 6,
        flex: 1,
    },
    containerTypes: {
        flexDirection: "row",
        gap: 12,
    },
    subContainerTypes: {
        flexDirection: "row",
        gap: 4,
    },
    textType: {
        fontSize: 18
    },
    textCard: {
        fontWeight: "600",
        fontSize: 28
    },
    imageCard: {
        borderRadius: 10,
        padding: 10,
        resizeMode: "contain",
        height: 130,
        width: 130,
    },
    imageType: {
        width: 22,
        height: 22,
    },
    buttonClear: {
        marginVertical: 24,
        marginHorizontal: 12,
        backgroundColor: "#EBB4C7",
        textAlign: "center",
        padding: 12,
        borderRadius: 8,
    },
    textButtonClear: {
        textAlign: "center",
        fontSize: 16
    },
});
