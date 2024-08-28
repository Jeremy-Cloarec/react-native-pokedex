import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';

export function DetailsPokemonDrawer({ pokemon }) {

    const [urlEvolutions, setUrlEvolutions] = useState({});
    const [urlPreEvolutions, setUrlPreEvolutions] = useState('bb');
    const [countEvolutions, setCountEvolutions] = useState(0);
    const [nextEvolution, setNextEvolution] = useState('Evolution suivante');

    useEffect(() => {
        if (pokemon.apiEvolutions) {
            pokemon.apiEvolutions.map((pok) => {
                console.log(`pokemon.apiEvolutions: ${pok.name}`);
                setCountEvolutions(c => c + 1);
            })
        }
    }, [pokemon]);

    useEffect(() => {
        console.log(`countEvolutions: ${countEvolutions}`);
        countEvolutions <= 1 ? setNextEvolution('Evolution suivante') : setNextEvolution('Evolutions suivantes');
    }, [countEvolutions]);

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
                const imageUrl = await fetchOneImage(pokemon.apiPreEvolution.pokedexIdd ? pokemon.apiPreEvolution.pokedexIdd : 1);
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
                            <View style={styles.evolution}>
                                <Text style={styles.textEvolution}>Evolution précedente</Text>
                                <TouchableOpacity style={styles.subEvolution}>
                                    <Image
                                        source={{ uri: urlPreEvolutions }}
                                        style={styles.imageEvolution}
                                    />
                                    <Text>{pokemon.apiPreEvolution.name}</Text>
                                </TouchableOpacity>
                            </View>
                        }
                        {pokemon.apiEvolutions.length > 0 &&
                            <View style={styles.evolution}>
                                <Text style={styles.textEvolution}>{nextEvolution}</Text>
                                <View style={styles.postEvolution}>
                                    {pokemon.apiEvolutions.map((evolution) => (
                                        <TouchableOpacity key={evolution.pokedexId} style={pokemon.id !== 133 ? styles.subEvolution : styles.subEvolutionEvoli}>
                                            <Image
                                                source={{ uri: urlEvolutions[evolution.pokedexId] }}
                                                style={styles.imageEvolution}
                                            />
                                            <Text >{evolution.name}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
    },
    evolution: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        flex: 1,
    },
    postEvolution: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 4,
        flexWrap: 'wrap',
    },
    subEvolution: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        maxWidth: 180,
        flex: 1,
    },
    subEvolutionEvoli: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        maxWidth: 180,
        width: "20%"
    },
    textEvolution: {
        color: "#49454F",
        fontWeight: 'bold',
    },
    imageEvolution: {
        width: '80%',
        height: undefined,
        aspectRatio: 1,
    },
})

