import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetDrawer } from '../components/BottomSheetDrawer';
import { DetailsPokemonDrawer } from '../components/DetailsPokemonDrawer';

export default function DetailPokemon() {
    const [pokemon, setPokemon] = useState({});
    const route = useRoute();
    const { pokemonName } = route.params;
    const navigation = useNavigation();
    const [messagAddPokemon, setMessagePokemon] = useState("Ajouter au pokedex");
    const [checkAdd, setCheckAdd] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);

    async function fetchOnePokemon(pokemonName) {
        setLoading(true);
        try {
            const response = await fetch(
                `https://pokebuildapi.fr/api/v1/pokemon/${pokemonName}`,
            );
            const jsonData = await response.json();
            setPokemon(jsonData);
            setError(null);

        } catch (error) {
            console.error(error);
            setError('Pokemon non trouvé')
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (pokemonName) {
            fetchOnePokemon(pokemonName);
        }
    }, [pokemonName]);

    useEffect(() => {
        console.log(pokemon);
    }, [pokemon]);

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
            checkExistingPokemon();
        } catch (e) {
            console.log("error", e);
        }
    }

    return (
        <GestureHandlerRootView>
            <View style={styles.containerDetail}>
                {error ? <Text>{error}</Text> : (
                    <>
                        {isLoading ? <ActivityIndicator style={styles.loaderStyle} /> :
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
                        }
                    </>
                )}
            </View>
            <BottomSheetDrawer
                detailsPokemonDrawer={
                    <DetailsPokemonDrawer
                        pokemon={pokemon}
                    />}
            />
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({

    loaderStyle: {
        marginBottom: 50,
        marginTop: 50,
        minWidth: '100%'
    },

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

    buttonModal: {
        backgroundColor: "#D3D3D3",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
        margin: 12,
        padding: 10,
    },


    iconAdd: {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 20,
    },
})