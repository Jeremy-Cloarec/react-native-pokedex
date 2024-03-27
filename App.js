import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/HomePokedex';
import Pokedex from './screens/Pokedex';
import AllPokemons from './screens/AllPokemons';

const Stack = createNativeStackNavigator()

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='="Home'>
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="Pokemons" component={AllPokemons}/>
                <Stack.Screen name="Pokedex" component={Pokedex}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
