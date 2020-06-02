import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, Image, ScrollView, TextInput } from 'react-native';

import Colors from '../constants/colors';
import Styles from '../constants/styles';
import TaskCard from './taskCard';
import colors from '../constants/colors';

export default function Header(props) {
    const { visible, setVisible, color } = props;
    const { title, product, assignee, description, tastHistory } = props;

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}>
            <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                <TouchableOpacity style={{ width: '100%', height: '10%', position: 'absolute', top: 0 }}
                    onPress={() => setVisible(false)}
                />
                <View style={[styles.container, { backgroundColor: color }]}>
                    <TouchableOpacity style={styles.crossButton}
                        onPress={() => setVisible(false)}>
                        <Image source={require('../assests/cross.png')} style={{ width: 15, height: 15 }} />
                    </TouchableOpacity>

                    <ScrollView style={{ marginTop: 40, paddingHorizontal: 15 }}>
                        <TaskCard title={title} product={product} assignee={assignee} color={color} type={'modal'} />

                        <Text style={[styles.text]} >{description}</Text>

                        <TextInput multiline style={styles.textBox} placeholder="Enter Task Here" placeholderTextColor={Colors.grey} />
                        <TouchableOpacity style={[styles.doneButton]}>
                            <Text style={[styles.doneText, { color: color }]}>DONE</Text>
                        </TouchableOpacity>

                        <View>
                            <Text style={[styles.heading, styles.text]}>Task History</Text>

                            <Text style={[styles.text, styles.tasksHistoryHeading]}>{'Test123'}</Text>
                            <Text style={[styles.text, styles.tasksHistorySub]}>{'20th, Jan, 2020'}</Text>
                            <Text style={[styles.text, styles.tasksHistoryHeading]}>{'Test123'}</Text>
                            <Text style={[styles.text, styles.tasksHistorySub]}>{'20th, Jan, 2020'}</Text>
                            <Text style={[styles.text, styles.tasksHistoryHeading]}>{'Test123'}</Text>
                            <Text style={[styles.text, styles.tasksHistorySub]}>{'20th, Jan, 2020'}</Text>
                            <Text style={[styles.text, styles.tasksHistoryHeading]}>{'Test123'}</Text>
                            <Text style={[styles.text, styles.tasksHistorySub]}>{'20th, Jan, 2020'}</Text>
                            <Text style={[styles.text, styles.tasksHistoryHeading]}>{'Test123'}</Text>
                            <Text style={[styles.text, styles.tasksHistorySub]}>{'20th, Jan, 2020'}</Text>
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
        borderTopRightRadius: 30
    },
    crossButton: {
        position: 'absolute',
        top: 15,
        right: 20
    },
    text: {
        color: 'white'
    },
    textBox: {
        width: '90%',
        height: 170,
        backgroundColor: 'white',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    doneButton: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: 160,
        height: 40,
        alignSelf: 'center',
        marginTop: 10,
        padding: 10,
        justifyContent: 'center'
    },
    doneText: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20,
        marginBottom: 10
    },
    tasksHistoryHeading: {
        fontSize: 16,
        fontWeight: '600'
    },
    tasksHistorySub: {
        fontSize: 16,
        marginBottom: 10
    }
});
