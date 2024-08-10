import { StyleSheet, ActivityIndicator, Text, View, Image, Pressable, ScrollView } from 'react-native';
import { useData } from "../dataContext/contextFetchData";
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SearchPokemons } from '../components/InputSearchPokemons';
import { ButtonAfterList } from '../components/ButtonAfterList';

export default function AllPokemons() {
    const [text, onChangeText] = useState('');
    const insets = useSafeAreaInsets();
    const { isLoading, setLoading, data, setData, numberItem, setNumberItem } = useData();
    const navigation = useNavigation();
    const [messageFetchMore, setMessageFetchMore] = useState("Afficher plus");
    const [searchPokemon, setSearchPokemon] = useState(false);

    const handlePokemonPress = (pokemonId) => {
        navigation.navigate('DetailPokemon', { pokemonId });
    };

    async function handleInputPress(text) {
        setLoading(true);
        try {
            const response = await fetch(
                `https://pokebuildapi.fr/api/v1/pokemon/${text}`,
            );
            const jsonData = await response.json();
            console.log(jsonData);
            setData([jsonData])
            setSearchPokemon(true)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const backToList = () => {
        setSearchPokemon(false)
        setData(data)
    }

    useEffect(() => {
        console.log("Data has been updated:", data);
    }, [data]);

    useEffect(() => {
        console.log("Set search Pokemon:", searchPokemon);
    }, [searchPokemon]);

    const showMore = () => {
        if (numberItem <= 898) {
            setNumberItem(numberItem + 60)
        } else {
            setMessageFetchMore("Vous êtes à la fin de la liste")
        }
    }

    return (
        <ScrollView contentContainerStyle={{
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
            flexGrow: 1,
        }}>
            {numberItem <= 120 && isLoading ? (
                <ActivityIndicator style={styles.loaderStyle} />
            ) : (
                <>
                    <SearchPokemons
                        onChangeText={onChangeText}
                        text={text}
                        handleInputPressed={() => handleInputPress(text)}
                    />
                    <View style={styles.containerAll}>
                        {data.map((item) => (
                            <Pressable key={item.id} onPress={() => handlePokemonPress(item.id)} style={styles.containercard}>
                                <View style={styles.containerImage}>
                                    <Image style={styles.imageCard} source={{ uri: item.image }} />
                                </View>
                                <Text style={styles.textCard}>{item.name}</Text>
                            </Pressable>
                        ))
                        }

                        {
                            searchPokemon &&
                            <ButtonAfterList
                                text="Retourner à la liste"
                                onPress={backToList}
                            />
                        }

                        {numberItem >= 10 && isLoading ? (
                            <ActivityIndicator style={styles.loaderStyle} />
                        ) : (
                            <ButtonAfterList
                                text={messageFetchMore}
                                onPress={showMore}
                            />
                        )}
                    </View>
                </>
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    loaderStyle: {
        marginBottom: 50,
        marginTop: 50,
        minWidth: '100%'
    },

    containerAll: {
        paddingVertical: 0,
        paddingHorizontal: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%'
    },

    showMoreTexte: {
        color: "black",
    },

    containercard: {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        margin: 8,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        minWidth: '40%',
        borderRadius: 18,
        gap: 8,
        padding: 6,
    },

    containerImage: {
        width: "100%",
    },

    textCard: {
        fontWeight: "600",
    },

    imageCard: {
        height: 130,
        borderRadius: 10,
        padding: 10,
        resizeMode: "contain",
        width: "100%",
        maxWidth: "100%",
        minWidth: "100%",
    }
})
