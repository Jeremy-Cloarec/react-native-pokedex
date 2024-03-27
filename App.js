import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/HomePokedex';
import Pokedex from './screens/Pokedex';
import AllPokemons from './screens/AllPokemons';
import { DataProvider } from './dataContext/contextFetchData';

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
                        options={{ exemple: "exemple" }}
                    />
                </Stack.Navigator>
            </DataProvider>
        </NavigationContainer>
    );
}
