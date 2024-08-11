import React, { useState } from "react";
import { TextInput, StyleSheet, View, Image } from "react-native";
import { InputSearch } from "./InputSearch";
import { Icon } from "./Icon";
import Filter from "./Filter";

export function InputSearchPokemons({ text, onChangeText, handleInputPressed }) {
    return (
        <View style={styles.containerSearch}>
            <Icon
                source={require('../assets/search.png')}
                style={styles.searchIcon}
            />
            <InputSearch
                placeholder="Rechercher un pokemon"
                onChangeText={onChangeText}
                handleInputPressed={handleInputPressed}
                value={text}
            />
        </View>
    );
}

const styles = StyleSheet.create({

    containerSearch: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        borderColor: '#B6B6B6',
        borderWidth: 1,
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 12,
        flex: 1,
    },

    searchIcon: {
        width: 24,
        height: 24,
        opacity: 0.6
    }
})
