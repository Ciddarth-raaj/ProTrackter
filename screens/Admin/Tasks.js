import React from 'react';
import { SafeAreaView, ScrollView, Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

import Colors from '../../constants/colors';
import Styles from '../../constants/styles';
import TaskCard from '../../components/Admin/taskCard';

export default class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [
                {
                    id: 1,
                    title: 'Project 1',
                    expanded: false,
                    tasks: [
                        {
                            id: 1,
                            title: 'Test',
                            assignedTo: 'Ciddarth',
                            color: Colors.blue,
                            status: 1,
                            description: 'This is test description',
                            taskHistory: [
                                {
                                    id: 1,
                                    title: 'Task3',
                                    date: 'Wed Jun 03 2020'
                                },
                                {
                                    id: 2,
                                    title: 'Task4',
                                    date: 'Wed Jun 03 2020'
                                },
                            ]
                        },
                        {
                            id: 1,
                            title: 'Test 123',
                            assignedTo: 'Ciddarth',
                            color: Colors.orange,
                            status: 3,
                            description: 'This is test description',
                            taskHistory: [
                                {
                                    id: 1,
                                    title: 'Task3',
                                    date: 'Wed Jun 03 2020'
                                },
                                {
                                    id: 2,
                                    title: 'Task4',
                                    date: 'Wed Jun 03 2020'
                                },
                            ]
                        },
                        {
                            id: 1,
                            title: 'Test 123',
                            assignedTo: 'Ciddarth',
                            color: Colors.purple,
                            status: 3,
                            description: 'This is test description',
                            taskHistory: [
                                {
                                    id: 1,
                                    title: 'Task3',
                                    date: 'Wed Jun 03 2020'
                                },
                                {
                                    id: 2,
                                    title: 'Task4',
                                    date: 'Wed Jun 03 2020'
                                },
                            ]
                        }
                    ]
                },
                {
                    id: 2,
                    title: 'Project 2',
                    expanded: false,
                    tasks: [
                        {
                            id: 1,
                            title: 'Test',
                            assignedTo: 'Ciddarth',
                            color: Colors.indigo,
                            status: 1,
                            description: 'This is test description',
                            taskHistory: [
                                {
                                    id: 1,
                                    title: 'Task3',
                                    date: 'Wed Jun 03 2020'
                                },
                                {
                                    id: 2,
                                    title: 'Task4',
                                    date: 'Wed Jun 03 2020'
                                },
                            ]
                        },
                        {
                            id: 1,
                            title: 'Test 123',
                            assignedTo: 'Ciddarth',
                            color: Colors.red,
                            status: 2,
                            description: 'This is test description',
                            taskHistory: [
                                {
                                    id: 1,
                                    title: 'Task3',
                                    date: 'Wed Jun 03 2020'
                                },
                                {
                                    id: 2,
                                    title: 'Task4',
                                    date: 'Wed Jun 03 2020'
                                },
                            ]
                        }
                    ]
                }
            ]
        }
    }

    setExpand(id) {
        const { projects } = this.state;

        for (var i = 0; i < projects.length; i++) {
            if (projects[i].id == id) {
                projects[i].expanded = true;
                break;
            }
        }

        this.setState({ projects: projects });
    }

    render() {
        const { projects } = this.state;
        const { navigation } = this.props;

        return (
            <>
                <SafeAreaView style={{ backgroundColor: Colors.notificationBar }} />
                <ScrollView style={{ flex: 1, backgroundColor: Colors.background, padding: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => navigation.pop()} style={{ alignSelf: 'center', marginRight: 10 }}>
                            <Image source={require("../../assests/back.png")} style={styles.backButton} />
                        </TouchableOpacity>
                        <Text style={[Styles.headingText, { marginTop: 10, marginBottom: 10 }]}>Tasks</Text>
                    </View>

                    {
                        projects.map((p) => (
                            <>
                                <Text style={styles.projectTitle}>{p.title}</Text>
                                <View style={[Styles.tasksWrapper]}>
                                    <TouchableOpacity style={styles.newCard}>
                                        <Text style={styles.newCardText}>ADD TASK</Text>
                                    </TouchableOpacity>
                                    {
                                        p.tasks.map((t, index) => {
                                            if (index < (p.expanded ? p.tasks.length : 2))
                                                return (
                                                    <TaskCard
                                                        title={t.title}
                                                        assignedTo={t.assignedTo}
                                                        color={t.color}
                                                        status={t.status}
                                                        description={t.description}
                                                        taskHistory={t.taskHistory} />
                                                )
                                        })
                                    }
                                    <TouchableOpacity onPress={() => this.setExpand(p.id)}>
                                        <Text style={styles.expandText}>Expand</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        ))
                    }
                </ScrollView>
                <SafeAreaView style={{ backgroundColor: Colors.background }} />
            </>
        );
    }
}

const styles = StyleSheet.create({
    projectTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10
    },
    backButton: {
        width: 20,
        height: 20,
    },
    newCard: {
        width: '100%',
        padding: 10,
        justifyContent: 'center',
        backgroundColor: Colors.addGreen,
        borderRadius: 10,
        marginBottom: 10,
    },
    newCardText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    expandText: {
        color: Colors.darkBlue,
        marginBottom: 20
    }
});
