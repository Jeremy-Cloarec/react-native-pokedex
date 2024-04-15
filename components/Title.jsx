import { StyleSheet, Text } from "react-native";

export default function Title({textHeading}) {
    return (
        <Text style={styles.textH1}>{textHeading}</Text>
    )
}

const styles = StyleSheet.create({
    textH1: {
        color: '#fff',
        fontSize: 30,
    }
})