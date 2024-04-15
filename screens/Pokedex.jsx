import { StyleSheet, View, Text, Pressable, Image, ScrollView } from "react-native";
import { useData } from "../dataContext/contextFetchData";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';

export default function Pokedex() {
    const { data } = useData();
    const [arrayIdPokemons, setArrayIdPokemons] = useState([]);

    const getIdsPokemons = useCallback(async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            console.log(keys);
            const values = await AsyncStorage.multiGet(keys);
            console.log(values);

            let arrayPokemon = values
                .map(arrayPokemon => arrayPokemon[1])
                .filter(id => !isNaN(Number(id)));

            setArrayIdPokemons(arrayPokemon);

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
            setArrayIdPokemons([]);
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

    console.log(arrayIdPokemons);

    return (
        <ScrollView style={styles.containerAllPokemons}>
            {arrayIdPokemons.length === 0 ? (
                <Text>Vous n'avez pas encore de pokemon dans votre pokedex</Text>
            ) : (
                <>
                    <Pressable onPress={clearAll}>
                        <Text>Supprimer tous les pokemons</Text>
                    </Pressable>
                    <View style={styles.containerCard}>
                        {arrayIdPokemons.map(id => {
                            id = Number(id) - 1;
                            return (
                                <View key={data[id].id} style={styles.card}>
                                    <View style={styles.cardText}>
                                        <Image style={styles.imageCard} source={{ uri: data[id].image }} />
                                        <View>
                                            <Text style={styles.textCard}>{data[id].name}</Text>
                                            <View style={styles.containerTypes}>
                                                <Text>Types :</Text>
                                                {data[id].apiTypes.map((type, id) => (
                                                    <Text key={id}>{type.name}</Text>
                                                ))}
                                            </View>
                                        </View>
                                    </View>
                                    <Pressable style={styles.pressable} onPress={() => clearOne(data[id].name)}>
                                        <Text>❌</Text>
                                    </Pressable>
                                </View>
                            );
                        })}
                    </View>
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
    containerCard: {
        gap: 8,
        marginTop: 12,
    },
    pressable: {
        paddingRight: 16,
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
    containerImage: {
        width: "100%",
    },
    containerTypes: {
        flexDirection: "row",
        gap: 4,
    },
    textCard: {
        fontWeight: "600",
        fontSize: 22
    },
    imageCard: {
        borderRadius: 10,
        padding: 10,
        resizeMode: "contain",
        height: 130,
        width: 130,
    }
})
