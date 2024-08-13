import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export function CheckboxInput({ data }) {
    const [selectedType, setSelectedType] = useState([]);

    const handlePress = (type) => {
        setSelectedType(prevSelectedType => {
            // Si le nombre de types sélectionnés est déjà 2
            if (prevSelectedType.includes(type)) {
                // Si le type est déjà sélectionné, le retirer
                return prevSelectedType.filter(selectedType => selectedType !== type);

            } else if (prevSelectedType.length >= 2) {
                console.log('2 types maximum');
                // Retirer le premier type (le plus ancien) et ajouter le nouveau type
                return [
                    ...prevSelectedType.slice(1), // Retirer le premier type
                    type // Ajouter le nouveau type
                ];

            } else {
                // Sinon, ajouter simplement le nouveau type
                return [
                    ...prevSelectedType,
                    type
                ];
            }
        });
    };

    useEffect(() => {
        console.log(selectedType);
    }, [selectedType])

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
                        selectedType.includes(type.name) && styles.bulletSelected
                    ]}>
                        <Text
                            style={[
                                styles.type,
                                selectedType.includes(type.name) && styles.selectedType
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
        justifyContent: 'center',
        flexWrap: 'wrap',
    },

    type: {
        padding: 6,
        borderRadius: 12,
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },

    selectedType: {
        color: '#E91E63',
    },

    bullet: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 8,
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