import { StyleSheet, View, Text, Pressable, Image, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Pokedex() {
    const insets = useSafeAreaInsets();

    const [values, setValues] = useState([]);
    const [keys, setKeys] = useState([]);

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
        } catch (error) {
            console.error("Error", error);
        }
    }, []);

    console.log(values);
    console.log(keys);

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

    return (
        <ScrollView style={[{
            flex:1,
            flex: 1,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        } ,styles.containerAllPokemons]}>
            {values.length === 0 ? (
                <Text>Vous n'avez pas encore de pokemon dans votre pokedex</Text>
            ) : (
                <>
                    <Pressable onPress={clearAll}>
                        <Text>Supprimer tous les pokemons</Text>
                    </Pressable>
                    <View style={styles.containerCard}>
                        {values.map(pokemon => {
                            return (
                                <View key={pokemon.id} style={styles.card}>
                                    <View style={styles.cardText}>
                                        <Image style={styles.imageCard} source={{ uri: pokemon.image }} />
                                        <View>
                                            <Text style={styles.textCard}>{values.name}</Text>
                                            <View style={styles.containerTypes}>
                                                <Text>Types :</Text>
                                                {pokemon.apiTypes.map((type, id) => (
                                                    <Text key={id}>{type.name}</Text>
                                                ))}
                                            </View>
                                        </View>
                                    </View>
                                    <Pressable style={styles.pressable} onPress={() => clearOne(pokemon.name)}>
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
});
