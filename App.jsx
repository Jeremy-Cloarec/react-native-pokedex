import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/HomePokedex';
import Pokedex from './screens/Pokedex';
import AllPokemons from './screens/AllPokemons';
import { DataProvider } from './dataContext/contextFetchData';
import DetailPokemon from './screens/DetailPokemon';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function PokemonStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="AllPokemons" component={AllPokemons} options={{ headerShown: false }} />
            <Stack.Screen name="DetailPokemon" component={DetailPokemon} />
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <DataProvider>
                <Tab.Navigator
                    initialRouteName='Pokemons'
                    screenOptions={{
                        tabBarActiveTintColor: '#e91e63',
                        tabBarInactiveTintColor: 'black',
                        tabBarStyle: {
                         
                                position: 'relative',
                                bottom: 0,
                                maxWidth: '100%',
                                height: 60,
                                backgroundColor: 'rgba(255, 255, 255, 1)',
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                            },
                            tabBarLabelStyle: {
                                fontSize: 16,
                                fontWeight: 'bold',

                            },
                            
                        }
                    } >
                    <Tab.Screen name="Pokemons" component={PokemonStack} options={{ headerShown: false }} />
                    <Tab.Screen name="Pokedex" component={Pokedex} options={{ headerShown: false }} />
                </Tab.Navigator>
        </DataProvider>
        </NavigationContainer >
    );
}
