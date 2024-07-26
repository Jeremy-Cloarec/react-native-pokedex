import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MapPokemons() {
    const insets = useSafeAreaInsets();
    return (
        <View style={[{
            flex: 1,
            flex: 1,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        }, styles.container]}>
            <MapView style={styles.map} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});