import { StyleSheet, Image } from "react-native";

export default function ImageViewer({ placeholderImageSource }) {
    return (
        <Image source={placeholderImageSource} />
    )
}
