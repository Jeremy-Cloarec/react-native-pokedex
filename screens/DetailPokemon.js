import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function DetailPokemon() {
    const route = useRoute();
    const { pokemonId } = route.params;
    return (
        <View>
            <Text>Detail Pokemon Page</Text>
            <Text>Pokemon ID: {pokemonId}</Text>
        </View>
    );
}