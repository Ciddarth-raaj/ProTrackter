import React from 'react';
import { StyleSheet, Modal, Text, TouchableOpacity, View } from 'react-native';

export default function BottomMenu(props) {

    const { visible, setVisible, options } = props;

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => { setVisible(false); }}>
            <TouchableOpacity style={{ backgroundColor: 'rgba(0,0,0,0.5)', width: '100%', height: '100%' }} activeOpacity={1}
                onPress={() => setVisible(false)}>
                <View style={styles.container}>
                    {
                        options.map((o) => (
                            <TouchableOpacity style={styles.optionsWrapper} onPress={() => { o.onPress(); }} activeOpacity={0.8}>
                                <Text style={[styles.optionText]}>{o.title}</Text>
                            </TouchableOpacity>
                        ))
                    }
                    <TouchableOpacity style={[styles.optionsWrapper, { marginBottom: 20 }]} onPress={() => setVisible(false)} activeOpacity={0.8}>
                        <Text style={[styles.optionText, { color: 'red' }]}>{'Cancel'}</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 10,
        justifyContent: 'center',
        width: '100%',
    },
    optionsWrapper: {
        padding: 15,
        width: '80%',
        marginBottom: 10,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 10,
        alignItems: 'center'
    },
    optionText: {
        fontSize: 16
    }
});
