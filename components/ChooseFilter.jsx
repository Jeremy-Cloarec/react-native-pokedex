import { View, StyleSheet, Text, Pressable } from 'react-native';

export function ChooseFilter({ types, generation, selectedGenerations, selectedTypes, handleType, handleGeneration }) {

    return (
        <>
            <View style={selectedTypes ? styles.containerTypeSelected : styles.containerType}>
                <Pressable
                    onPress={handleType}
                    style={styles.pressable}
                >

                    <Text style={styles.h2}>
                        Filtrer par types
                        <Text style={styles.span}> (2 types maximum)</Text>
                    </Text>

                </Pressable>
                {types}
            </View>
            <View style={selectedGenerations ? styles.containerTypeSelected : styles.containerType}>
                <Pressable
                    onPress={handleGeneration}
                >
                    <Text style={styles.h2}>
                        Filtrer par générations
                    </Text>
                </Pressable>
                {generation}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    h2: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    pressable: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },

    span: {
        fontSize: 12,
        fontWeight: 'normal',

    },

    containerType: {
        gap: 12,
        padding: 12,
    },

    containerTypeSelected: {
        gap: 12,
        padding: 12,
        borderRadius: 8,
        padding: 10,
        borderColor: '#E91E63',
        borderWidth: 2,
        borderRadius: 8,
    }
})