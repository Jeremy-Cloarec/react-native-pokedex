import { StyleSheet, View, Text, Pressable, Image, ScrollView } from "react-native";
import { useData } from "../dataContext/contextFetchData";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";

export default function Pokedex() {
    const { data } = useData();
    const [arrayIdPokemons, setArrayIdPokemons] = useState([]);

    useEffect(() => {
        const getIdsPokemons = async () => {
            try {
                const keys = await AsyncStorage.getAllKeys();
                const values = await AsyncStorage.multiGet(keys);

                let arrayPokemon = values
                    .map(arrayPokemon => arrayPokemon[1])
                    .filter(id => !isNaN(Number(id)));

                setArrayIdPokemons(arrayPokemon);

            } catch (error) {
                console.error("Error", error);
            }
        };
        getIdsPokemons();
    }, []);

    const clearAll = async () => {
        try {
            await AsyncStorage.clear();
            setArrayIdPokemons([]);
        } catch (error) {
            console.error("Error", error);
        }
    };


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
                                    
                                    <Image style={styles.imageCard} source={{ uri: data[id].image }} />
                                    <View>
                                        <Text style={styles.textCard}>{data[id].name}</Text>
                                        <View style={styles.containerTypes}>
                                            <Text>Types :</Text>
                                            {data[id].apiTypes.map((type, id) => (
                                                <Text key={id}>{type.name}</Text>
                                            )
                                            )}
                                        </View>
                                    </View>
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
        marginTop: 12
    },

    card: {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        flex: 1,
        borderRadius: 8,
        padding: 6,
        flexDirection:"row",
        alignItems: "center",
        gap: 16,
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
    },

    imageCard: {
        borderRadius: 10,
        padding: 10,
        resizeMode: "contain",
        width: 100,
        height: 100,
    }
})
