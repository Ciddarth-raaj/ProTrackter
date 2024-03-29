import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, Image, ScrollView, TextInput } from 'react-native';

import Colors from '../constants/colors';
import Styles from '../constants/styles';

export default function FilterModal(props) {
    const { visible, setVisible, selectFilter, clearFilter, filters } = props;

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => { setVisible(false); }}>
            <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>

                <TouchableOpacity style={{ width: '100%', height: '10%', position: 'absolute', top: 0 }}
                    onPress={() => setVisible(false)}
                />

                <View style={[styles.container]}>

                    <TouchableOpacity style={styles.crossButton}
                        onPress={() => setVisible(false)}>
                        <Image source={require('../assests/cross_black.png')} style={{ width: 15, height: 15 }} />
                    </TouchableOpacity>

                    <ScrollView>
                        <View style={{ marginTop: 50, marginBottom: 20 }}>
                            <Text style={styles.heading}>Filter</Text>
                            <TouchableOpacity onPress={() => clearFilter()}>
                                <Text style={{ textAlign: 'center', color: 'red' }}>Clear</Text>
                            </TouchableOpacity>

                            {
                                Object.keys(filters).map(i => (
                                    <TouchableOpacity style={styles.projectTitleWrapper}
                                        onPress={() => { selectFilter(filters[i].key, !filters[i].selected) }}>
                                        <Text style={styles.projectTitle}>{filters[i].title}</Text>
                                        {
                                            filters[i].selected && <Image source={require('../assests/tick_blue.png')} style={styles.tick} />
                                        }
                                    </TouchableOpacity>
                                ))
                            }

                        </View>
                    </ScrollView>

                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '90%',
        width: '100%',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: 'white'
    },
    crossButton: {
        position: 'absolute',
        top: 15,
        right: 20,
        zIndex: 100
    },
    projectTitle: {
        marginBottom: 10,
        fontSize: 16,
    },
    projectTitleWrapper: {
        borderBottomColor: '#e7e7e7',
        borderBottomWidth: 2,
        margin: 10,
        flexDirection: 'row'
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    },
    tick: {
        width: 15,
        height: 15,
        position: 'absolute',
        right: 20
    }
});
