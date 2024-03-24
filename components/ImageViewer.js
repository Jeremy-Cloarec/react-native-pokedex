import { StyleSheet, Image } from "react-native";

export default function ImageViewer({ placeholderImageSource }) {
    return (
        <Image source={placeholderImageSource} style={styles.image} />
    )
}

const styles = StyleSheet.create({
    image: {
        backgroundColor: "green",
        width:"100%",
        
    }
})
