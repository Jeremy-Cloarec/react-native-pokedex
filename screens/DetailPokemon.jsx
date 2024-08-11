import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function DetailPokemon() {
    const [pokemon, setPokemon] = useState({});
    const route = useRoute();
    const { pokemonName } = route.params;
    const navigation = useNavigation();
    const [messagAddPokemon, setMessagePokemon] = useState("Ajouter au pokedex");
    const [checkAdd, setCheckAdd] = useState(false);
    const [error, setError] = useState(null);

    async function fetchOnePokemon(pokemonName) {
        // setLoading(true);
        try {
            const response = await fetch(
                `https://pokebuildapi.fr/api/v1/pokemon/${(pokemonName)}`,
            );
            const jsonData = await response.json();
            setPokemon(jsonData);
            setError(null);

        } catch (error) {
            console.error(error);
            setError('Pokemon non trouvé')
        } finally {
            // setLoading(false);
        }
    };

    useEffect(() => {
        if (pokemonName) {
            fetchOnePokemon(pokemonName);
        }
    }, [pokemonName]);

    useEffect(() => {
        if (pokemon && pokemon.name) {
            checkExistingPokemon();
            navigation.setOptions({ title: pokemon.name });
        } else {
            navigation.setOptions({ title: "Retour" });
        }
    }, [pokemon]);

    const checkExistingPokemon = async () => {
        try {
            const value = await AsyncStorage.getItem(pokemon.name);
            if (value !== null) {
                setMessagePokemon(`Bravo ! ${pokemon.name} est bien dans votre pokedex !`);
                setCheckAdd(true);
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    const mergePokemon = async () => {
        try {
            await AsyncStorage.setItem(pokemon.name, JSON.stringify(pokemon));
            setCheckAdd(true);
        } catch (e) {
            console.log("error", e);
        }
    }

    return (
        <View style={styles.containerDetail}>
            {error ? <Text>{error}</Text> : (
                <>
                    <View style={styles.containerImage}>
                        <Image style={styles.imageCard} source={{ uri: pokemon.image }} />
                    </View>
                    <View style={styles.containerPressable}>
                        {!checkAdd ? (
                            <Pressable style={styles.containerIcon} onPress={mergePokemon}>
                                <Ionicons
                                    style={styles.iconAdd}
                                    name="add"
                                    size={52}
                                    color="#191616" />
                            </Pressable>) : (<></>)}
                        <Text style={styles.containerMessage}>{messagAddPokemon}</Text>
                    </View>
                </>
            )}

        </View>
    );
}

const styles = StyleSheet.create({

    containerDetail: {
        flex: 1,
    },

    containerImage: {
        flex: 3,
        padding: 6,
    },

    imageCard: {
        resizeMode: "contain",
        flex: 1,
    },

    containerPressable: {
        flex: 1,
        alignContent: "center",
        gap: 8,
    },

    containerIcon: {
        alignItems: "center",
    },

    containerMessage: {
        alignItems: "center",
        textAlign: 'center'
    },

    iconAdd: {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 20,
    },
})