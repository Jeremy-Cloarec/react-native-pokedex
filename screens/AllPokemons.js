import { StyleSheet, ActivityIndicator, FlatList, Text, View, Image } from 'react-native';
import { useData } from "../dataContext/contextFetchData";


export default function AllPokemons() {

    const {isLoading, data} = useData()

    console.log(data);

    return (
        <View>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <View  style={styles.containerAllPokemons}>
                    <FlatList style={styles.containerAllPokemons2}
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
                    />
                </View>
            )}
        </View>
    )
}
const styles = StyleSheet.create({
    containerAllPokemons: {
        backgroundColor: "green",
        padding: 5,
        margin: 5,
        flexDirection: "row"

    },
    containerAllPokemons2: {
        backgroundColor: "black",
        padding: 5,
        margin: 5,
        flexDirection: "row",
        width: ""

    },
    containercard: {
        backgroundColor: "blue",
        padding: 5,
        margin:5,

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
