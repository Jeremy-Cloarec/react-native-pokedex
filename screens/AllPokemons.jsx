import { StyleSheet, ActivityIndicator, View, ScrollView, StatusBar, Text } from 'react-native';
import { useData } from "../data/contextFetchData";
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { InputSearchPokemons } from '../components/searchBar/InputSearchPokemons';
import { ButtonAfterList } from '../components/ButtonAfterList';
import Filter from '../components/filterModal/Filter';
import { FilterModal } from '../components/filterModal/filterModal';
import {PokemonCard}  from '../components/PokemonCard';
import { FilterButton } from '../components/FilterButton';
import { GenerationButton } from '../components/GenerationButton';

export default function AllPokemons() {
    const [namePokemon, setNamePokemon] = useState('');
    const insets = useSafeAreaInsets();
    const { isLoading, data, setData, numberItem, setNumberItem, originalData, setOriginalData, setLoading } = useData();
    const navigation = useNavigation();
    const [messageFetchMore, setMessageFetchMore] = useState("Afficher plus");
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTypes, setSelectedTypes] = useState(true);
    const [selectedGenerations, setSelectedGeneration] = useState(false);
    const [generationName, setGenerationName] = useState(null);
    const [typeName, setTypeName] = useState([]);
    const [urlFilter, setUrlFilter] = useState(null);
    const [isFilterApplied, setIsFilterApplied] = useState(false);
    const [clearTypeBool, setClearType] = useState(false)

    const handlePokemonPress = (pokemonName) => {
        navigation.navigate('DetailPokemon', { pokemonName });
    };

    const handlePokemonSearch = (pokemonName) => {
        if (!pokemonName) {
            return;
        }
        navigation.navigate('DetailPokemon', {
            pokemonName: pokemonName
        });
    }

    const showModalFilter = () => {
        setModalVisible(true)
    }

    const closeModalFilter = () => {
        setModalVisible(false)
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

    const resetFilter = () => {
        setTypeName([]);
        setGenerationName(null);
        setUrlFilter(null);
        setData(originalData);
    }

    const applyFilter = () => {
        if (!generationName && typeName.length === 0) {
            console.log('Aucun filtre appliqué');
            setIsFilterApplied(false);
            closeModalFilter();
            return;
        }

        let newUrlFilter = "";

        if (typeName.length !== 0 && typeName.length === 1) {
            newUrlFilter = `https://pokebuildapi.fr/api/v1/pokemon/type/${typeName}`;
        } else if (typeName.length !== 0 && typeName.length === 2) {
            newUrlFilter = `https://pokebuildapi.fr/api/v1/pokemon/types/${typeName[0]}/${typeName[1]}`
        }

        if (generationName) {
            newUrlFilter = `https://pokebuildapi.fr/api/v1/pokemon/generation/${generationName}`;
        }

        setModalVisible(false);
        setUrlFilter(newUrlFilter);
    }

    useEffect(() => {
        if (urlFilter) {
            console.log('urlFilter', urlFilter);
            fetchFilterdata();
        }
    }, [urlFilter]);

    useEffect(() => {
        console.log(clearTypeBool);
    }, [clearTypeBool]);

    useEffect(() => {
        console.log('typeName:', typeName);
        console.log('generationName:', generationName);

        if (clearTypeBool) {
            // Applique les filtres après la mise à jour de typeName et generationName
            if (typeName.length === 0 && !generationName) {
                resetFilter(); // Si aucun filtre n'est sélectionné, réinitialise les données
            } else {
                applyFilter(); // Applique les nouveaux filtres si présents
            }
            setClearType(false); // Réinitialise clearTypeBool après application des filtres
        }
    }, [typeName, generationName, clearTypeBool]);

    async function fetchFilterdata() {
        setLoading(true);
        try {
            const response = await fetch(urlFilter);
            const jsonData = await response.json();
            console.log(`urlFilter : ${urlFilter}`);
            setData(jsonData);
        } catch (error) {
            console.error(error);
        } finally {
            console.log('Filtre appliqué');
            setIsFilterApplied(true);
            setLoading(false);
        }
    }

    const clearType = (type) => {
        setTypeName((prevTypeName) => {
            const updatedTypeName = prevTypeName.filter((ele) => ele !== type);
            setClearType(true);
            return updatedTypeName;
        });
    };

    const clearGeneration = () => {
        setGenerationName(null);
        setClearType(true);
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
                        resetFilter={resetFilter}
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
                    {!modalVisible &&
                        <View style={styles.containerFilterButton}>
                            {typeName.length > 0 && <FilterButton
                                typeName={typeName}
                                clearType={clearType}
                            />}
                            {generationName && <GenerationButton
                                generationNumber={generationName}
                                clearGeneration={clearGeneration}
                            />}
                        </View>
                    }
                    <View style={styles.containerAll}>
                        {data.map((item) => (
                            <PokemonCard
                                key={item.id}
                                item={item}
                                handlePokemonPress={handlePokemonPress}

                            />
                        ))
                        }
                        {numberItem >= 10 && isLoading ? (
                            <ActivityIndicator style={styles.loaderStyle} />
                        ) : (
                            !isFilterApplied ? (
                                <View style={styles.containerButton}>
                                    <ButtonAfterList
                                        text={messageFetchMore}
                                        onPress={showMore}
                                    />
                                </View>
                            ) : ("")
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
        color: "#49454F",
    },

    containerButton: {
        marginHorizontal: 12,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
})
