import { Pressable, StyleSheet } from "react-native";
import { Icon } from "../Icon";

export default function Filter({ showModalFilter }) {
    return (
        <Pressable style={styles.pressable}
            onPress={showModalFilter}
        >
            <Icon
                source={require('../../assets/filter.png')}
                style={styles.Icon}
            />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    pressable: {
        backgroundColor: 'white',
        paddingHorizontal: 12,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#B6B6B6',
        borderWidth: 1,
    },

    Icon: {
        width: 32,
        height: 24,
        opacity: 0.6
    }
})