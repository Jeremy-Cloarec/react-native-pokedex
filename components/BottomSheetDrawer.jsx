import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const SCREEN_HEIGHT = Dimensions.get("window").height;

export function BottomSheetDrawer () {
    // initiating gesture
    const gesture = Gesture.Pan();

    return (
        <GestureDetector gesture={gesture}>
            <View style={styles.container}></View>
        </GestureDetector>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        height: SCREEN_HEIGHT,
        backgroundColor: "#6b7694",
        width: "100%",
        top: SCREEN_HEIGHT / 1.4,
    },
});