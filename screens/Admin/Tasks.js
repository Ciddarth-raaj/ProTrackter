import React from 'react';
import { SafeAreaView, ScrollView, Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

import Colors from '../../constants/colors';
import Styles from '../../constants/styles';
import TaskCard from '../../components/Admin/taskCard';
import FilterModal from '../../components/Admin/filterModal';
import AddProjectModal from '../../components/Admin/addProjectModal';

export default class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: 'Product',
            filterModalVisible: false,
            noFilter: true,
            addProjectModalVisible: false,
            projects: [
                {
                    id: 1,
                    title: 'Project 1',
                    visible: false,
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
                    visible: false,
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
                },
                {
                    id: 3,
                    title: 'Project 3',
                    visible: false,
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
                    ]
                },
                {
                    id: 4,
                    title: 'Project 4',
                    visible: false,
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
                    ]
                },
            ],
        }
    }

    setModalVisibility = value => {
        this.setState({ filterModalVisible: value });
    }

    setProjectModalVisible = value => {
        this.setState({ addProjectModalVisible: value });
    }

    setProjectVisible = (id, value) => {
        const { projects } = this.state;

        for (i = 0; i < projects.length; i++) {
            if (projects[i].id == id) {
                projects[i].visible = value;
                break;
            }
        }

        this.setState({ projects: projects, noFilter: false });
    }

    clearFilter = () => {
        const { projects } = this.state;

        for (i = 0; i < projects.length; i++) {
            projects[i].visible = false;
        }

        this.setState({ projects: projects, noFilter: true, filterModalVisible: false });
    }

    renderCards(list) {

        return (list.map((l) => (
            <>
                {(this.state.noFilter || l.visible) && <>
                    <Text style={styles.mainTitle}>{l.title}</Text>

                    <View style={[Styles.tasksWrapper, { marginBottom: 10 }]}>

                        <TouchableOpacity style={styles.newCard}>
                            <Text style={styles.newCardText}>Add Task</Text>
                        </TouchableOpacity>

                        {
                            l.tasks.map((t) => {
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
                    </View>
                </>}

            </>
        )))
    }

    render() {
        const { projects, filterModalVisible, addProjectModalVisible } = this.state;
        const { navigation } = this.props;

        return (
            <>
                <SafeAreaView style={{ backgroundColor: Colors.notificationBar }} />

                <AddProjectModal
                    visible={addProjectModalVisible}
                    setVisible={this.setProjectModalVisible}
                />

                <FilterModal
                    visible={filterModalVisible}
                    setVisible={this.setModalVisibility}
                    projects={projects}
                    setProjectVisible={this.setProjectVisible}
                    clearFilter={this.clearFilter} />

                <ScrollView style={{ flex: 1, backgroundColor: Colors.background, padding: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => navigation.pop()} style={{ alignSelf: 'center', marginRight: 10 }}>
                            <Image source={require("../../assests/back.png")} style={styles.backButton} />
                        </TouchableOpacity>
                        <Text style={[Styles.headingText, { marginTop: 10, marginBottom: 10 }]}>Tasks</Text>
                    </View>

                    {
                        this.renderCards(projects)
                    }

                </ScrollView>
                <TouchableOpacity style={[styles.addProjectButton, styles.floatingButton]}
                    onPress={() => this.setProjectModalVisible(true)}>
                    <Text style={styles.addProjectText}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.filterButton, styles.floatingButton]}
                    onPress={() => this.setState({ filterModalVisible: true })}>
                    <Image source={require('../../assests/filter.png')} style={styles.filterImage} />
                </TouchableOpacity>
            </>
        );
    }
}

const styles = StyleSheet.create({
    mainTitle: {
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
    },
    floatingButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    addProjectButton: {
        backgroundColor: 'white',
        position: 'absolute',
        right: 10,
        bottom: 30,
    },
    addProjectText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 40,
        paddingBottom: 3,
        color: Colors.addGreen,
    },
    filterButton: {
        backgroundColor: Colors.blue,
        position: 'absolute',
        left: 10,
        bottom: 30,
    },
    filterImage: {
        width: 30,
        height: 30,
        alignSelf: 'center',
        marginTop: 5
    }
});
