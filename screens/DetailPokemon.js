import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useData } from '../dataContext/contextFetchData';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function DetailPokemon() {
    const { data } = useData();
    const route = useRoute();
    const { pokemonId } = route.params;
    const navigation = useNavigation();

    let pokemon = data[pokemonId - 1];

    const storeData = async (pokemon) => {
        try {
            const jsonValue = JSON.stringify(pokemon);
            await AsyncStorage.setItem('pokemon', jsonValue);
        } catch (e) {
            // saving error
        }
    };

    const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('pokemon');
          return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
          // error reading value
        }
      };

    useLayoutEffect(() => {
        navigation.setOptions({ title: pokemon.name });
    }, [navigation, pokemon.name]);

    return (
        <View style={styles.containerDetail}>
            <View style={styles.containerImage}>
                <Image style={styles.imageCard} source={{ uri: pokemon.image }} />
            </View>
            <View style={styles.containerPressable}>
                <Pressable style={styles.containerIcon}>
                    <Ionicons
                        style={styles.iconAdd}
                        name="add"
                        size={52}
                        color="#191616" />
                    <Text> Ajouter au pokedex</Text>
                </Pressable>
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
        // alignItems: "center",
        // justifyContent: "center",
    },
    containerIcon: {
        alignItems: "center",
        gap: 8,
    },
    iconAdd: {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 20,

    }

})