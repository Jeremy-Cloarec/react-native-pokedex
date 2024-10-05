import { StyleSheet, Text, TouchableOpacity } from "react-native";

export function ButtonAfterList({ text, onPress }) {
    return (
        <TouchableOpacity
            style={styles.showMore}
            onPress={onPress}
        >
            <Text>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    showMore: {
        marginBottom: 50,
        marginTop: 50,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 12,
    },
})