import { View, Text } from "react-native";
import { useData } from "../dataContext/contextFetchData";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Pokedex() {
    const { data } = useData();

    const getMultiple = async () => {
        
        let values
        try {
            // Utilisez ici un tableau des clés que vous souhaitez récupérer
            const keys = await AsyncStorage.getAllKeys();
            values = await AsyncStorage.multiGet(keys);
        } catch (e) {
            `error ${e}`
        }
        console.log(values);
    }

    getMultiple()

    return (
        <View>
            <Text>Coucou</Text>
        </View>
    )
}