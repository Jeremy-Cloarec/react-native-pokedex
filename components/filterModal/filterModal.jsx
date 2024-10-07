import { useState } from "react";
import { Modal, View, Text, StyleSheet, Pressable, Image, TouchableOpacity, ScrollView } from "react-native"
import { ChooseFilter } from "./ChooseFilter";
import { CheckboxInput } from "./CheckboxInput";
import { RadioInput } from "./RadioInput";
import { dataTypes } from "../../data/dataTypes";
import { dataGenerations } from "../../data/dataGenerations";
import { ButtonModal } from "./ButtonModal";
import { useSafeAreaInsets } from 'react-native-safe-area-context';


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
    setTypeName,
    applyFilter,
    resetFilter
}) {
    const insets = useSafeAreaInsets();
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
                    <View style={styles.scrollViewWrapper}>


                        <ScrollView style={styles.containerScroll}>
                            <View style={styles.centeredView}>
                                <View style={styles.header}>
                                    <Text style={styles.headerTitle}>Filtres</Text>
                                    <TouchableOpacity
                                        onPress={closeModalFilter}>
                                        <Image
                                            source={require('../../assets/close.png')}
                                            style={styles.close}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.body}>
                                    <ChooseFilter
                                        types={<CheckboxInput
                                            data={dataTypes}
                                            selectedTypes={selectedTypes}
                                            typeName={typeName}
                                            setTypeName={setTypeName}
                                        />}
                                        generation={<RadioInput
                                            data={dataGenerations}
                                            selectedGenerations={selectedGenerations}
                                            generationName={generationName}
                                            setGenerationName={setGenerationName}
                                        />}
                                        handleType={handleType}
                                        handleGeneration={handleGeneration}
                                        selectedGenerations={selectedGenerations}
                                        selectedTypes={selectedTypes}
                                    />
                                </View>

                                <TouchableOpacity
                                    onPress={resetFilter}
                                    style={styles.resetContainer}
                                >
                                    <Image
                                        source={require('../../assets/reset.png')}
                                        style={styles.restIcon}
                                    />
                                    <Text style={styles.reset}>
                                        Effacer les filtres
                                    </Text>
                                </TouchableOpacity>
                                <ButtonModal
                                    text={'Appliquer les filtres'}
                                    onPress={applyFilter}
                                />
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal >
        </View >
    )
}

const styles = new StyleSheet.create({
    containerModal: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingTop: 24,
        paddingBottom: 80,
        maxHeight: '100%',
    },
    containerScroll: {
        borderRadius: 12,
        borderRadius: 12,
    },

    scrollViewWrapper: {
        borderRadius: 12,
        overflow: 'hidden',
        flex: 1,
        width: '100%',
    },
    centeredView: {
        borderRadius: 12,
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
    },
    resetContainer: {
        flexDirection: 'row',
        padding: 12,
        alignItems: 'center',
        gap: 12,
    },

    reset: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    restIcon: {
        width: 20,
        height: 18,
    }
})