import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';


export function RadioInput({ data }) {
    const [selectedGeneration, setSelectedGeneration] = useState(null);

    const handlePress = (type) => {
        setSelectedGeneration(type);
    };
    
    useEffect(() => {
        console.log(selectedGeneration);
    }, [selectedGeneration])

    return (
        <View style={styles.container}>
            {data.map((type, index) => (
                <Pressable
                    key={index}
                    onPress={() => handlePress(type.name)}
                    style={styles.pressable}
                >
                    <View style={[
                        styles.bullet,
                        selectedGeneration === type.name && styles.bulletSelected
                    ]}>
                        <Text
                            style={[
                                styles.type,
                                selectedGeneration === type.name && styles.selectedType
                            ]}
                        >
                            {type.name}
                        </Text>
                    </View>
                </Pressable>
            ))}
        </View>
    )
}

const styles = new StyleSheet.create({
    container: {
        gap: 12,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },

    type: {
        padding: 6,
        borderRadius: 12,
        color: '#000',
        fontSize: 24,
        fontWeight: 'bold',
    },

    selectedType: {
        color: '#E91E63',
    },

    bullet: {
        height: 50,
        width: 50,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 50 / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },

    bulletSelected: {
        borderColor: '#E91E63',
    },

    pressable: {
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center',
    }
})