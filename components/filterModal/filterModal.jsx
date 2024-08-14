import { useState } from "react";
import { Modal, View, Text, StyleSheet, Pressable, Image } from "react-native"
import { ChooseFilter } from "./ChooseFilter";
import { CheckboxInput } from "./CheckboxInput";
import { RadioInput } from "./RadioInput";
import { dataTypes } from "../../data/dataTypes";
import { dataGenerations } from "../../data/dataGenerations";


export function FilterModal({
    modalVisible,
    setModalVisible,
    handleType,
    handleGeneration,
    selectedGenerations,
    selectedTypes,
    closeModalFilter,
    generationName,
    setGenerationName,
    typeName,
    setTypeName
}) {
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
                                onPress={closeModalFilter}>
                                <Image
                                    source={require('../../assets/close.png')}
                                    style={styles.close}
                                />
                            </Pressable>
                        </View>
                        <View style={styles.body}>
                            <ChooseFilter
                                types={<CheckboxInput
                                    data={dataTypes}
                                    selectedTypes={selectedTypes}
                                    generationName={generationName}
                                    setGenerationName={setGenerationName}
                                />}
                                generation={<RadioInput
                                    data={dataGenerations}
                                    selectedGenerations={selectedGenerations}
                                    typeName={typeName}
                                    setTypeName={setTypeName}
                                />}
                                handleType={handleType}
                                handleGeneration={handleGeneration}
                                selectedGenerations={selectedGenerations}
                                selectedTypes={selectedTypes}
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
        backgroundColor: '#EDEDED',
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
        width: 18,
        height: 18,
    },

    body: {
        gap: 24,
    }
})