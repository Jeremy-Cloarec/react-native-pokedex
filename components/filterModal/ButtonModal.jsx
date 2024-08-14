import {  Text, StyleSheet, TouchableOpacity } from "react-native";

export function ButtonModal({ onPress, text }) {
    return (
        <TouchableOpacity
            style={styles.showMore}
            onPress={onPress}
        >
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = new StyleSheet.create({
    showMore: {
        backgroundColor: '#E91E63',
        color: 'white',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    }
})