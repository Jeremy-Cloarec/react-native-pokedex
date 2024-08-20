import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";

const SCREEN_HEIGHT = Dimensions.get("window").height;

//Max screen height
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 320

export function BottomSheetDrawer() {
    // storing the value
    const translateY = useSharedValue(0)

    //storing the last value of translationY and using it onStart
    const context = useSharedValue({
        y: 0,
    })

    // initiating gesture
    const gesture = Gesture.Pan()
        // here we have used to make the starting point that is our last translationY value
        .onStart(() => {
            context.value = {
                y: translateY.value
            }
        })
        // and here on update we use the contexte value along with the translationY value to update the height
        .onUpdate((event) => {
            translateY.value = event.translationY + context.value.y;
            // here we limit the max value of translationY
            translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y)
        });

    const rBottomSheetStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: translateY.value
                },
            ],
        };
    });

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.container, rBottomSheetStyles]}>
                <Text>Hello</Text>
            </Animated.View>
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