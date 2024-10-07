import { TouchableOpacity } from "react-native";
import { View, Text, StyleSheet, Image } from "react-native";

export function FilterButton({ typeName, clearType }) {
    return (
        <View style={styles.containerButton}>
            {typeName.map(type => (
                <TouchableOpacity
                    key={type}
                    onPress={() => clearType(type)}
                    style={styles.button}
                >
                    <Image
                        source={require('../assets/closeFilterButton.png')}
                        style={styles.icon}
                    />
                    <Text style={styles.textButton}>
                        {type}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = new StyleSheet.create({
    containerButton: {
        flexDirection: "row",
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 16,
    },
    button: {
        paddingVertical: 6,
        paddingHorizontal: 18,
        paddingLeft: 16,
        borderRadius: 30,
        backgroundColor: "white",
        borderColor: "#E91E63",
        borderWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    icon: {
        width: 12,
        height: 12,
    },
    textButton: {
        fontSize: 16,
    }
})