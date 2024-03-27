import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/HomePokedex';
import Pokedex from './screens/Pokedex';
import AllPokemons from './screens/AllPokemons';
import { DataProvider } from './dataContext/contextFetchData';
import DetailPokemon from './screens/DetailPokemon';

const Stack = createNativeStackNavigator()

export default function App() {
    return (
        <NavigationContainer>
            <DataProvider>
                <Stack.Navigator initialRouteName='="Home'>
                    <Stack.Screen 
                        name="Home" 
                        component={Home}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen name="Pokemons" component={AllPokemons} />
                    <Stack.Screen
                        name="Pokedex"
                        component={Pokedex}
                    />
                    <Stack.Screen
                        name="DetailPokemon"
                        component={DetailPokemon}
                    />
                </Stack.Navigator>
            </DataProvider>
        </NavigationContainer>
    );
}
