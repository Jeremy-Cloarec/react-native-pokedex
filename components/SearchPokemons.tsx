import React, { useState } from "react";
import { TextInput, StyleSheet } from "react-native";

export function SearchPokemons({text, onChangeText, handleInputPressed}) {
    return (
        <TextInput
            placeholder="Rechercher un pokemon"
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            onSubmitEditing={handleInputPressed}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        borderRadius: 18,
        marginHorizontal: 12,
        marginVertical: 5,
        backgroundColor: 'white'
    },
});