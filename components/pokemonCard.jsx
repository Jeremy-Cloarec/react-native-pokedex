import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native"

export function PokemonCard({ item, handlePokemonPress }) {
    return (
        <TouchableOpacity onPress={() => handlePokemonPress(item.name)} style={styles.containercard}>
            <View style={styles.containerImage}>
                <Image style={styles.imageCard} source={{ uri: item.image }} />
            </View>
            <Text style={styles.textCard}>{item.name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    containercard: {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        margin: 8,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        minWidth: '40%',
        maxWidth: '47%',
        maxHeight: 200,
        borderRadius: 18,
        gap: 8,
        padding: 6,

    },
    containerImage: {
        width: '100%',
    },
    imageCard: {
        height: 130,
        borderRadius: 10,
        padding: 10,
        resizeMode: "contain",
        width: "100%",
        maxWidth: "100%",
        minWidth: "100%",
    },
    textCard: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})
