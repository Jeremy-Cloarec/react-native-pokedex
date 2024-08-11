import { Image, StyleSheet } from 'react-native';


export function Icon({ source, style }) {
    return (
        <Image
            style={style}
            source={source}
        />
    )
}

