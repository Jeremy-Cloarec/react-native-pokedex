import { useEffect, useState } from "react";
import { StyleSheet, ActivityIndicator, FlatList, Text, View, Image } from 'react-native';



export default function AllPokemons() {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getPokemonsFromPokebuild = async () => {
        try {
            const response = await fetch(
                'https://pokebuildapi.fr/api/v1/pokemon/limit/100',
            );
            const data = await response.json();
            setData(data)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPokemonsFromPokebuild();
    }, []);

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
