import React, { useState } from "react";
import { TextInput, StyleSheet, View, Image } from "react-native";

export function SearchPokemons({ text, onChangeText, handleInputPressed }) {
    return (
        <>
            <View style={styles.containerSearch}>
                <Image
                    style={styles.searchIcon}
                    source={require('../assets/search.png')}
                />
                <TextInput
                    placeholder="Rechercher un pokemon"
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    onSubmitEditing={handleInputPressed}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    containerSearch:{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        paddingHorizontal: 12,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 12,

    },
    input: {
        height: 40,
        padding: 10,
        marginHorizontal: 12,
        marginVertical: 5,
        backgroundColor: 'white'
    },
    searchIcon: {
        width: 24,
        height: 24,
    }
});