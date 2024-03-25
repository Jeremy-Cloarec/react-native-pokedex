import { StyleSheet, View, Pressable, Text } from "react-native";

export default function Button2({ label }){
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
        padding: 0,
        width:"100%",
    }, 
    button: {
        borderRadius: 10,
        width: "100%",
        height: "100%",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor:"rgba(255, 255, 255, 0.8)",
        color:"black",
        width:"100%",
        flex: 1

    }, 
    buttonIcon: {
        paddingRight: 8,
    },
    buttonLabel: {
        color: "rgb(25, 22, 22)",
        fontSize: 16,
        textAlign:"center",
        flex: 1,
        fontWeight: "bold",
    }
})
