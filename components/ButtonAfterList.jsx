import { Pressable, StyleSheet, Text } from "react-native";

export function ButtonAfterList({ text, onPress }) {
    return (
        <Pressable
            style={styles.showMore}
            onPress={onPress}
        >
            <Text>{text}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    showMore: {
        marginBottom: 50,
        marginTop: 50,
        textAlign: "center",
        alignItems: "center",
        minWidth: '100%',
        backgroundColor: "rgba(255, 255, 255, 0.8)",
    },
})