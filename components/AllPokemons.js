import { useEffect, useState } from "react";
import {ActivityIndicator, FlatList, Text, View} from 'react-native';


export default function AllPokemons() {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getPokemonsFromPokebuild = async () => {
        try {
            const response = await fetch(
                'https://pokebuildapi.fr/api/v1/pokemon/limit/100',
            );
            const json = await response.json();
            return json.pokemons;
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getPokemonsFromPokebuild();
    }, []);

    return (
        <View style={{ flex: 1, padding: 24 }}>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={({ id }) => id}
                    renderItem={({ item }) => (
                        <Text>
                            {item.title}, {item.releaseYear}
                        </Text>
                    )}
                />
            )}
        </View>
    )
}
