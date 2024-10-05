import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { InputSearch } from "./InputSearch";
import { Icon } from "../Icon";

export function InputSearchPokemons({ text, onChangeText, handleInputPressed }) {
    const [isFocused, setIsFocused] = useState(false);


    return (
        <View style={[
            styles.containerSearch,
            isFocused ? styles.containerSearchFocused : null
        ]}>
            <Icon
                source={require('../../assets/search.png')}
                style={styles.searchIcon}
            />
            <InputSearch
                placeholder="Rechercher un pokemon"
                onChangeText={onChangeText}
                handleInputPressed={handleInputPressed}
                value={text}
                isFocused={isFocused}
                setIsFocused={setIsFocused}
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

    containerSearchFocused: {
        borderColor: '#E91E63',
        borderWidth: 1,
    },

    searchIcon: {
        width: 24,
        height: 24,
        opacity: 1
    }
})
