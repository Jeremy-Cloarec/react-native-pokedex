import { View, StyleSheet, Text, Pressable } from 'react-native';

export function ChooseFilter({
    types,
    generation,
    selectedGenerations,
    selectedTypes,
    handleType,
    handleGeneration,
}) {

    return (
        <>
            <View style={selectedTypes ? styles.containerTypeSelected : styles.containerType}>
                <Pressable
                    onPress={handleType}
                    style={styles.pressable}
                >
                    <View style={styles.bulletPoint}>
                        {selectedTypes && <View style={styles.point}></View>}
                    </View>

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
                    style={styles.pressable}
                >
                    <View style={styles.bulletPoint}>
                        {selectedGenerations && <View style={styles.point}></View>}
                    </View>
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
    },

    span: {
        fontSize: 12,
        fontWeight: 'normal',
    },

    containerType: {
        gap: 24,
        padding: 12,
    },

    containerTypeSelected: {
        gap: 24,
        padding: 12,
        borderRadius: 8,
        padding: 10,
        borderColor: '#E91E63',
        borderWidth: 2,
        borderRadius: 8,
        backgroundColor: 'white',
    },

    bulletPoint: {
        height: 18,
        width: 18,
        borderRadius: 18 / 2,
        borderColor: '#E91E63',
        borderWidth: 2,
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },

    point: {
        height: 10,
        width: 10,
        borderRadius: 14 / 2,
        backgroundColor: '#E91E63',
    }


})