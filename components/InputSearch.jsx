import { TextInput, StyleSheet } from 'react-native';

export function InputSearch({ placeholder, text, onChangeText, handleInputPressed }) {
    return (
        <TextInput
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={text}
        
            onSubmitEditing={() => {
                console.log("onSubmitEditing déclenché");
                handleInputPressed;
            }}
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