import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';

export function DetailsPokemonDrawer({ pokemon }) {

    const [urlEvolutions, setUrlEvolutions] = useState({});
    const [urlPreEvolutions, setUrlPreEvolutions] = useState('bb');

    async function fetchOneImage(id) {
        try {
            const response = await fetch(
                `https://pokebuildapi.fr/api/v1/pokemon/${id}`,
            );
            const jsonData = await response.json();
            return jsonData.image;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    useEffect(() => {
        if (pokemon && pokemon.apiEvolutions) {
            // Charger les images pour chaque évolution
            pokemon.apiEvolutions.forEach(async (evolution) => {
                const imageUrl = await fetchOneImage(evolution.pokedexId);
                setUrlEvolutions(prevState => ({
                    ...prevState,
                    [evolution.pokedexId]: imageUrl,
                }));
            });
        }
    }, [pokemon]);

    useEffect(() => {
        if (pokemon && pokemon.apiPreEvolution) {
            (async () => {
                const imageUrl = await fetchOneImage(pokemon.apiPreEvolution.pokedexIdd);
                setUrlPreEvolutions(imageUrl);
            })();  // Appel de la fonction immédiatement
        }
    }, [pokemon]);

    useEffect(() => {
        console.log(`urlPreEvolutions: ${urlPreEvolutions}`);

    }, [urlPreEvolutions]);

    return (
        <ScrollView style={styles.container}>
            {pokemon && pokemon.name &&
                <ScrollView style={styles.subContainer}>
                    <View style={styles.generationText}>
                        <Text style={styles.text}>Génération {pokemon.apiGeneration}</Text>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.containerTypes}>
                        {pokemon.apiTypes.map((type, index) => {
                            return (
                                <View key={index} style={styles.types}>
                                    <Image source={{ uri: type.image }} style={styles.imageType} />
                                    <Text>{type.name}</Text>
                                </View>
                            )
                        })}
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.containerStats}>
                        <View style={styles.stats}>
                            <Image source={require('../assets/attaque.png')} style={styles.imageStatsAttack} />
                            <Text
                                style={pokemon.stats.attack <= 99 ? [styles.textStats, styles.textStatsL] : [styles.textStatsMax, styles.textStatsMaxL]}>
                                {pokemon.stats.attack}
                            </Text>
                        </View>
                        <View style={styles.stats}>
                            <Image source={require('../assets/defense.png')} style={styles.imageStatsDefense} />
                            <Text
                                style={pokemon.stats.defense <= 99 ? [styles.textStats, styles.textStatsR] : [styles.textStatsMax, styles.textStatsMaxR]}>
                                {pokemon.stats.defense}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.line}></View>

                    <View style={styles.containerEvolution}>
                        {pokemon.apiPreEvolution.name &&
                            <View>
                                <Text>Evolution précedente</Text>
                                <Text>{pokemon.apiPreEvolution.name}</Text>
                                <Image
                                    source={{ uri: urlPreEvolutions }}
                                    style={styles.imageType}
                                />
                            </View>
                        }
                        {pokemon.apiEvolutions.length > 0 &&
                            <View >
                                <Text>Evolution suivante</Text>
                                {pokemon.apiEvolutions.map((evolution) => (
                                    <View key={evolution.pokedexId}>
                                        <Text>{evolution.name}</Text>
                                        {urlEvolutions[evolution.pokedexId] ? (
                                            <Image
                                                source={{ uri: urlEvolutions[evolution.pokedexId] }}
                                                style={styles.imageType}
                                            />
                                        ) : (
                                            <Text>Loading...</Text>
                                        )}
                                    </View>
                                ))}
                            </View>
                        }
                    </View>
                </ScrollView>}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        flex: 1,
    },
    subContainer: {
        flex: 1,
    },
    generationText: {
        alignItems: 'center',
    },
    text: {
        color: '#49454F',
        backgroundColor: '#E8E8E8',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 'bold',
    },
    line: {
        height: 1,
        backgroundColor: "black",
        opacity: 0.4,
        width: "62%",
        alignSelf: "center",
        marginVertical: 16,
        borderRadius: 5,
    },
    containerStats: {
        gap: 16,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    stats: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    imageStatsAttack: {
        width: 79.5,
        height: 140,
    },
    imageStatsDefense: {
        width: 90,
        height: 140,
    },
    textStats: {
        position: 'absolute',
        fontSize: 32,
        fontWeight: '800',
        top: 62,
        right: 26,
    },
    textStatsL: {
        right: 20,
    },
    textStatsR: {
        right: 27,
    },
    textStatsMax: {
        position: 'absolute',
        fontSize: 32,
        fontWeight: '800',
        top: 62,
        right: 16,
    },
    textStatsMaxR: {
        right: 18,
    },
    textStatsMaxL: {
        right: 13,
    },
    containerTypes: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },
    types: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
    },
    imageType: {
        width: 70,
        height: 70,
    },
    containerEvolution: {
        backgroundColor: 'pink',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
    },
    textEvolution: {
        color: "#49454F"
    }
})

