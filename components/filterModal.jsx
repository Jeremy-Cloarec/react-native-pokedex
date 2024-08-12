import { useState } from "react";
import { Modal, View, Text, StyleSheet, Pressable, Image } from "react-native"
import { ChooseFilter } from "./ChooseFilter";
import { Checkbox } from "./Checkbox";
import { Radio } from "./Radio";

const dataType = [
    { name: 'Plante' },
    { name: 'Feu' },
    { name: 'Eau' },
    { name: 'Insecte' },
    { name: 'Normal' },
    { name: 'Electrik' },
    { name: 'Poison' },
    { name: 'Fée' },
    { name: 'Vol' },
    { name: 'Combat' },
    { name: 'Psy' },
    { name: 'Sol' },
    { name: 'Roche' },
    { name: 'Spectre' },
    { name: 'Acier' },
    { name: 'Glace' },
    { name: 'Dragon' },
    { name: 'Ténèbres' },
]

const dataGeneration = [
    { name: 'Génération 1' },
    { name: 'Génération 2' },
    { name: 'Génération 3' },
    { name: 'Génération 4' },
    { name: 'Génération 5' },
    { name: 'Génération 6' },
    { name: 'Génération 7' },
    { name: 'Génération 8' },

]


export function FilterModal({ modalVisible, setModalVisible }) {
    return (
        <View>
            <Modal
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.containerModal}>
                    <View style={styles.centeredView}>
                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>Filtres</Text>
                            <Pressable
                                onPress={() => setModalVisible(false)}>
                                <Image
                                    source={require('../assets/close.png')}
                                    style={styles.close}
                                />
                            </Pressable>
                        </View>
                        <View style={styles.body}>
                            <ChooseFilter
                                types={<Checkbox data={dataType} />}
                                generation={<Radio data={dataGeneration} />}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = new StyleSheet.create({
    containerModal: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },

    centeredView: {
        borderRadius: 12,
        backgroundColor: 'white',
        padding: 12,
        minWidth: '40%',
        gap: 24,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    close: {
        width: 24,
        height: 24,
    },

    body:{
        gap: 24,
    }
})