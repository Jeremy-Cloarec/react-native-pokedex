import { View, Text } from "react-native";
import { useData } from "../dataContext/contextFetchData";


export default function Pokedex() {
    const { data } = useData();

    console.log(data);

    return (
        <View>
            <Text>Coucou</Text>
        </View>
    )
}