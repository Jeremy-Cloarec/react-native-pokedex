import { StyleSheet, ActivityIndicator, Text, View, Image, Pressable, ScrollView, StatusBar } from 'react-native';
import { useData } from "../data/contextFetchData";
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { InputSearchPokemons } from '../components/searchBar/InputSearchPokemons';
import { ButtonAfterList } from '../components/ButtonAfterList';
import Filter from '../components/filterModal/Filter';
import { FilterModal } from '../components/filterModal/filterModal';

export default function AllPokemons() {
    const [namePokemon, setNamePokemon] = useState('');
    const insets = useSafeAreaInsets();
    const { isLoading, data, setData, numberItem, setNumberItem, originalData, setOriginalData, setLoading } = useData();
    const navigation = useNavigation();
    const [messageFetchMore, setMessageFetchMore] = useState("Afficher plus");
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTypes, setSelectedTypes] = useState(true);
    const [selectedGenerations, setSelectedGeneration] = useState(false);
    const [generationName, setGenerationName] = useState([]);
    const [typeName, setTypeName] = useState(null);

    const handlePokemonPress = (pokemonName) => {
        navigation.navigate('DetailPokemon', { pokemonName });
    };

    const handlePokemonSearch = (pokemonName) => {
        navigation.navigate('DetailPokemon', {
            pokemonName: pokemonName
        });
    }

    const showModalFilter = () => {
        setModalVisible(true)
    }

    const closeModalFilter = () => {
        setModalVisible(false)
        setSelectedTypes(true);
        setSelectedGeneration(false);
    }

    const showMore = () => {
        if (numberItem <= 898) {
            setNumberItem(numberItem + 60)
        } else {
            setMessageFetchMore("Vous êtes à la fin de la liste")
        }
    }

    const handleType = () => {
        setSelectedTypes(true);
        setSelectedGeneration(false);
    }

    const handleGeneration = () => {
        setSelectedTypes(false);
        setSelectedGeneration(true);
    }

    const applyFilter = () => {
        if (!typeName && generationName.length === 0) {
            console.log('Aucun filtre appliqué');
            return;
        }

        console.log(`TypeName : ${typeName}`);
        console.log(`generationName : ${generationName}`);

        fetchFilterdata();
        setModalVisible(false);
    }

    async function fetchFilterdata() {
        setLoading(true);
        try {
            const url = `https://pokebuildapi.fr/api/v1/pokemon/generation/${generationName}`
            const response = await fetch(url);
            const jsonData = await response.json();
            console.log(url);

            setData(jsonData);


        } catch (error) {
            console.error(error);
        } finally {
            console.log('Filtre appliqué');
            setLoading(false);
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
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            {numberItem <= 120 && isLoading ? (
                <ActivityIndicator style={styles.loaderStyle} />
            ) : (
                <>
                    <FilterModal
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                        handleType={handleType}
                        handleGeneration={handleGeneration}
                        selectedTypes={selectedTypes}
                        selectedGenerations={selectedGenerations}
                        closeModalFilter={closeModalFilter}
                        generationName={generationName}
                        setGenerationName={setGenerationName}
                        typeName={typeName}
                        setTypeName={setTypeName}
                        applyFilter={applyFilter}
                    />
                    <View style={styles.containerSearchFilter}>
                        <InputSearchPokemons
                            onChangeText={setNamePokemon}
                            text={namePokemon}
                            handleInputPressed={() => handlePokemonSearch(namePokemon)}
                        />
                        <Filter
                            showModalFilter={showModalFilter}
                        />
                    </View>
                    <View style={styles.containerAll}>
                        {data.map((item) => (
                            <Pressable key={item.id} onPress={() => handlePokemonPress(item.name)} style={styles.containercard}>
                                <View style={styles.containerImage}>
                                    <Image style={styles.imageCard} source={{ uri: item.image }} />
                                </View>
                                <Text style={styles.textCard}>{item.name}</Text>
                            </Pressable>
                        ))
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

    containerSearchFilter: {
        flexDirection: 'row',
        width: '100%',
        padding: 12,
        gap: 12
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
