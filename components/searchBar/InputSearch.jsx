import React from "react";
import { TextInput, StyleSheet } from 'react-native';

export function InputSearch({ placeholder, text, onChangeText, handleInputPressed, setIsFocused }) {
    return (
        <TextInput
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={text}
            onSubmitEditing={handleInputPressed}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={styles.input}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        flex: 1,
        width: '100%',
        fontSize: 16,
    },
})