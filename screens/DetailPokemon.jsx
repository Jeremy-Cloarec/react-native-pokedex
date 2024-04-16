import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useData } from '../dataContext/contextFetchData';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function DetailPokemon() {
    const { data } = useData();
    const route = useRoute();
    const { pokemonId } = route.params;
    const navigation = useNavigation();
    const [messagAddPokemon, setMessagePokemon] = useState("Ajouter au pokedex");
    const [checkAdd, setCheckAdd] = useState(false);
    let pokemon = data[pokemonId - 1];

    const checkExistingPokemon = async () => {
        try {
            const value = await AsyncStorage.getItem(pokemon.name);
            if (value !== null) {
                setMessagePokemon(`Bravo ! ${pokemon.name} est bien dans votre pokedex !`);
                setCheckAdd(true);
            }
        } catch (error) {
            // Error retrieving data
        }
    }
    checkExistingPokemon()

    const mergePokemon = async () => {
        try {
            await AsyncStorage.setItem(pokemon.name, JSON.stringify(pokemon));
            setCheckAdd(true);
        } catch (e) {
            console.log("error", e);
        }
    }


    useLayoutEffect(() => {
        navigation.setOptions({ title: pokemon.name });
    }, [navigation, pokemon.name]);

    return (
        <View style={styles.containerDetail}>
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