import { useState } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';

export function ChooseFilter({ types, generation}) {
    const [selectedTypes, setSelectedTypes] = useState(false);
    const [selectedGenerations, setSelectedGeneration] = useState(false);

    const handleType = () => {
        setSelectedTypes(true);
        setSelectedGeneration(false);
    }

    const handleGeneration = () => {
        setSelectedTypes(false);
        setSelectedGeneration(true);
    }

    console.log(`selectedTypes: ${selectedTypes}`);
    console.log(`selectedGeneration: ${selectedGenerations}`);
    
    return (
        <>
            <View style={ selectedTypes ? styles.containerTypeSelected : styles.containerType}>
                <Pressable
                    onPress={handleType}
                >
                    <Text style={styles.h2}>
                        Filtrer par types
                    </Text> 
                </Pressable>
                <Text>2 types maximum</Text>
                {types}
            </View>
            <View style={ selectedGenerations ? styles.containerTypeSelected : styles.containerType}>
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
    containerType: {
        gap: 12,
        padding: 12,
        borderRadius: 8,
    },
    containerTypeSelected: {
        gap: 12,
        backgroundColor: '#F5F5F5',
        padding: 12,
        borderRadius: 8,
    }

})