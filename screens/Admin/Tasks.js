import React from 'react';
import { SafeAreaView, ScrollView, Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

import Colors from '../../constants/colors';
import Styles from '../../constants/styles';
import TaskCard from '../../components/Admin/taskCard';

export default class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: 'Product',
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
            ],
        }
    }

    handleExpand(id, value) {
        const { projects } = this.state;

        for (i = 0; i < projects.length; i++) {
            if (projects[i].id == id) {
                projects[i].expanded = value;
                break;
            }
        }

        this.setState({ projects: projects });
    }

    renderCards(list) {

        return (list.map((l) => (
            <>
                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                    <Text style={styles.mainTitle}>{l.title}</Text>

                    <TouchableOpacity style={{ alignSelf: 'center', position: 'absolute', right: 20 }}
                        onPress={() => this.handleExpand(l.id, !l.expanded)}>
                        <Image source={l.expanded ? require('../../assests/minus.png') : require('../../assests/plus.png')} style={{ width: 15, height: 15 }} />
                    </TouchableOpacity>

                </View>
                {
                    l.expanded && <View style={[Styles.tasksWrapper, { marginBottom: 10 }]}>
                        {
                            l.tasks.map((t, index) => {
                                {/* if (index < (p.expanded ? p.tasks.length : 2)) */ }
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
                }
            </>
        )))
    }

    // handleFilterClick() {
    //     const { filter } = this.state;

    //     if (filter === 'Product')
    //         this.setState({ filter: 'User' })
    //     else
    //         this.setState({ filter: 'Product' })
    // }

    render() {
        const { projects, users, filter } = this.state;
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

                        {/* <View style={{ alignSelf: 'center', position: 'absolute', right: 10, flexDirection: 'row' }}>
                            <Text style={[Styles.filterTitle]}>Filter By</Text>
                            <TouchableOpacity onPress={() => this.handleFilterClick()}>
                                <Text style={[Styles.filterText]}>{filter}</Text>
                            </TouchableOpacity>
                        </View> */}

                    </View>

                    {
                        this.renderCards(projects)
                    }

                </ScrollView>
                {/* <TouchableOpacity style={styles.addProjectButton}>
                    <Text style={styles.addProjectText}>ADD PROJECT</Text>
                </TouchableOpacity> */}
                <TouchableOpacity style={styles.addProjectButton}>
                    <Text style={styles.addProjectText}>+</Text>
                </TouchableOpacity>
                {/* <SafeAreaView style={{ backgroundColor: Colors.background }} /> */}
            </>
        );
    }
}

const styles = StyleSheet.create({
    mainTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        // marginBottom: 10
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
    // addProjectButton: {
    //     backgroundColor: Colors.addGreen,
    //     padding: 15,
    // },
    // addProjectText: {
    //     color: 'white',
    //     fontWeight: 'bold',
    //     fontSize: 18,
    //     textAlign: 'center'
    // }
    addProjectButton: {
        width: 60,
        height: 60,
        backgroundColor: 'white',
        borderRadius: 30,
        justifyContent: 'center',
        position: 'absolute',
        right: 10,
        bottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
    },
    addProjectText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 40,
        paddingBottom: 3,
        color: Colors.addGreen,
    }
});
