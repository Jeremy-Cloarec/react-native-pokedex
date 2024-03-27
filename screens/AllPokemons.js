import { StyleSheet, ActivityIndicator, FlatList, Text, View, Image } from 'react-native';
import { useData } from "../dataContext/contextFetchData";
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

export default function AllPokemons() {
    const { isLoading, data } = useData();
    const navigation = useNavigation();

    const handlePokemonPress = (pokemonId) => {
        navigation.navigate('DetailPokemon', { pokemonId });
    };

    return (
        <View>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handlePokemonPress(item.id)} style={styles.containercard}>

                            <View style={styles.containerImage}>
                                <Image style={styles.imageCard} source={{ uri: item.image }} />
                            </View>
                            <Text style={styles.textCard}>{item.name}</Text>

                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    contentContainerStyle={styles.containerAllPokemons}
                />
            )}
        </View>
    )
}
const styles = StyleSheet.create({
    containerAllPokemons: {
        backgroundColor: "#191616",
        paddingVertical: 18,
        paddingHorizontal: 10,
    },

    containercard: {
        backgroundColor: "white",
        margin: 8,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        width: "100%",
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
