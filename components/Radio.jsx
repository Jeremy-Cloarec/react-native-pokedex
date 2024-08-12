import { View, Text, StyleSheet } from 'react-native';

export function Radio({ data }) {
    return (
        <View style={styles.container}>
            {data.map((type, index) => (
                <Text key={index} style={styles.type}>{type.name}</Text>
            ))}
        </View>
    )
}

const styles = new StyleSheet.create({
    container: {   
        gap: 12,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    type: {
        padding: 6,
        borderRadius: 12,
        backgroundColor: '#F5F5F5',
        color: '#000',
    }
})