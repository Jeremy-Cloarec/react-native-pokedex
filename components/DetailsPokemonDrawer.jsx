import { Text, View, StyleSheet } from 'react-native';

export function DetailsPokemonDrawer({pokemon}) {
    return (
        <View>
            {pokemon && pokemon.name && <View>
                <Text style={styles.container}>{pokemon.name}</Text>
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        color: 'black',
    }
})