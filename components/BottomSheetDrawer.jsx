import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { Children, useEffect } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from "react-native-reanimated";

const SCREEN_HEIGHT = Dimensions.get("window").height ;
//Max screen height
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 70
//Min screen height
const START_TRANSLATE_Y = -SCREEN_HEIGHT / 5.3

export function BottomSheetDrawer({detailsPokemonDrawer}) {
    // storing the value
    const translateY = useSharedValue(START_TRANSLATE_Y)
    //storing the last value of translationY and using it onStart
    const context = useSharedValue({ y: 0, })

    // initiating gesture
    const gesture = Gesture.Pan()
        // here we have used to make the starting point that is our last translationY value
        .onStart(() => {
            context.value = { y: translateY.value }
        })
        // and here on update we use the contexte value along with the translationY value to update the height
        .onUpdate((event) => {
            translateY.value = event.translationY + context.value.y;
            // here we limit the max value of translationY
            translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y)
            // here we limit the min value of translationY
            translateY.value = Math.min(translateY.value, START_TRANSLATE_Y)
        })
        .onEnd((event) => {
            // Apply velocity and ensure translateY stays within bounds
            let finalTranslateY = translateY.value + event.velocityY / 10;
            // Clamp finalTranslateY to ensure it stays within the defined bounds
            finalTranslateY = Math.max(finalTranslateY, MAX_TRANSLATE_Y);
            finalTranslateY = Math.min(finalTranslateY, START_TRANSLATE_Y);

            translateY.value = withSpring(finalTranslateY, {
                damping: 15,
                stiffness: 120,
                velocity: event.velocityY, // Applying velocity for more realistic spring
            });
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

    useEffect(() => {
        translateY.value = withSpring(START_TRANSLATE_Y, {
            damping: 15,
            stiffness: 120,
        });
    })

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.container, rBottomSheetStyles]}>
                <View style={styles.line}></View>
                {detailsPokemonDrawer}
            </Animated.View>
        </GestureDetector>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        height: SCREEN_HEIGHT ,
        backgroundColor: "white",
        width: "100%",
        top: SCREEN_HEIGHT,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderColor: "#CCCCCC",
        borderWidth: 2,
    },
    
    line: {
        height: 4,
        backgroundColor: "#49454F",
        width: "28%",
        alignSelf: "center",
        marginVertical: 16,
        borderRadius: 5,
    }
});