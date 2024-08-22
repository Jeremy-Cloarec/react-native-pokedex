import { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export function CheckboxInput({
    data,
    selectedTypes,
    typeName,
    setTypeName
}) {

    const handlePress = (type) => {
        setTypeName(prevSelectedType => {
            // Si le nombre de types sélectionnés est déjà 2
            if (prevSelectedType.includes(type)) {
                // Si le type est déjà sélectionné, le retirer
                return prevSelectedType.filter(selected => selected !== type);

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
                    ...prevSelectedType, // Ajouter les types déjà sélectionnés
                    type
                ];
            }
        });
    };

    const removeSelected = () => {
        if (!selectedTypes) setTypeName([]);
    }

    useEffect(() => {
        removeSelected();
    }, [selectedTypes])

    return (
        <View style={styles.container}>
            {data.map((type, index) => (
                <Pressable
                    key={index}
                    onPress={() => selectedTypes && handlePress(type.name)}
                    style={styles.pressable}
                >
                    <View style={[
                        styles.bullet,
                        typeName && typeName.includes(type.name) && styles.bulletSelected
                    ]}>
                        <Text
                            style={[
                                styles.type,
                                typeName && typeName.includes(type.name) && styles.selectedType
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
        borderColor: '#49454F',
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