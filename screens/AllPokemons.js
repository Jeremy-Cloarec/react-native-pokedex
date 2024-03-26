import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from 'react-native';


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
        }finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPokemonsFromPokebuild();
    }, []);

    return (
        <View>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <FlatList
                    data={data}
                    renderItem={({ item }) => {
                        return (
                            <View>
                                <Text>{item.name}</Text>
                                <Text>Helo</Text>

                            </View>
                        )
                    }}
                />
            )}
        </View>
       
    )
}
