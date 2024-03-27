import { StyleSheet, ActivityIndicator, FlatList, Text, View, Image, Dimensions } from 'react-native';
import { useData } from "../dataContext/contextFetchData";

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function AllPokemons() {

    const windowDimensions = Dimensions.get('window');
    const screenDimensions = Dimensions.get('screen');

    const { isLoading, data } = useData()

    console.log(data);

    return (
        <View>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <FlatList
                    data={data}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.containercard}>
                                <View style={styles.containerImage}>
                                    <Image style={styles.imageCard} source={{ uri: item.image }} />
                                </View>
                                <Text style={styles.textCard}>{item.name}</Text>
                            </View>
                        )
                    }}
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
