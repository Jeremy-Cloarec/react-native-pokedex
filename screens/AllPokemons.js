import { StyleSheet, ActivityIndicator, FlatList, Text, View, Image, Dimensions } from 'react-native';
import { useData } from "../dataContext/contextFetchData";

const windowWidth = Dimensions.get('window').width;

export default function AllPokemons() {

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
                                <Text>{item.name}</Text>
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
        backgroundColor: "green",
        padding: 5,
        margin: 5,
    },

    containercard: {
        backgroundColor: "blue",
        margin: 5,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        padding: 10,
        height: 150, // Adjust this as needed
        width: (windowWidth - 20) / 2 - 10,

    },
    containerImage: {
        backgroundColor: "violet",
        padding: 5,
    },

    imageCard: {
        flexDirection: "row",
        backgroundColor: "black",
        width: 50,
        height: 50,
    }
})
