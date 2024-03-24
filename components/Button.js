import { StyleSheet, View, Pressable, Text } from "react-native";

export default function Button({ label }){
    return (
        <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={()=> alert(`You press a button`)}>
                <Text style={styles.buttonLabel}>{label}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        height: 68,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent:'center',
        padding: 3,
        backgroundColor:"violet",
        width:'100%',
    }, 
    button: {
        borderRadius: 10,
        width: "100%",
        height: "100%",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor:"orange",

    }, 
    buttonIcon: {
        paddingRight: 8,
    },
    buttonLabel: {
        color: "#fff",
        fontSize: 16,
    }
})
