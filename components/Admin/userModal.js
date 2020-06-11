import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, Image, ScrollView } from 'react-native';

import Colors from '../../constants/colors';
import Styles from '../../constants/styles';
import UserCard from './userCard';
import TaskCard from './taskCard';

export default function TaskModal(props) {
    const { visible, setVisible, color } = props;
    const { id, name, tasks } = props;

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
                        <Image source={require('../../assests/cross.png')} style={{ width: 15, height: 15 }} />
                    </TouchableOpacity>

                    <ScrollView style={{ marginTop: 40, paddingHorizontal: 15 }}>

                        <UserCard id={id} name={name} tasks={tasks} type={'modal'} />

                        <Text style={[styles.text, styles.heading, { marginBottom: 10 }]}>Tasks Assigned</Text>

                        <View style={[Styles.tasksWrapper, { marginBottom: 10 }]}>
                            {
                                tasks.map((t) => {
                                    return (
                                        <TaskCard
                                            title={t.title}
                                            assignedTo={t.assignedTo}
                                            color={t.color}
                                            status={t.status}
                                            description={t.description}
                                            taskHistory={t.taskHistory}
                                            type={'usermodal'} />
                                    )
                                })
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
    heading: {
        fontWeight: 'bold',
        fontSize: 18
    }
});
