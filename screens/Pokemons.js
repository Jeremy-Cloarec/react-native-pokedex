import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from 'react-native';


export default function Pokemons() {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getPokemonsFromPokebuild = async () => {
        try {
            const response = await fetch(
                'https://pokebuildapi.fr/api/v1/pokemon/limit/100',
            );
            const json = await response.json();
            setData(json.Pokemons);
            console.log(json.Pokemons);
        
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
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
                            {item.id}
                        </Text>
                    )}
                />
            )}
        </View>
    )
}
