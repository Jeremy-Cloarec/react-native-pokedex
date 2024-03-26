
import { StyleSheet, Text, Pressable } from "react-native";

export default function ButtonHome({ navigation, label, link, backgroundColor }) {

    return (
        <Pressable style={[styles.button, {backgroundColor : backgroundColor}]} onPress={() => navigation.navigate(link)} >
            <Text style= {styles.textButton}>{label}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 16,
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8, 
    
    },
    textButton: {
        fontSize: 20,
        fontWeight: "bold",
    }
})
