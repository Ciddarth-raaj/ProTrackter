import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

import Colors from '../constants/colors';
import Styles from '../constants/styles';
import Header from '../components/header';
import TaskCard from '../components/taskCard';


export default class Tasks extends React.Component {

    types = {
        pending: {
            title: 'Pending',
            color: Colors.purple
        },
        inProgress: {
            title: 'In Progress',
            color: Colors.blue
        },
        new: {
            title: 'New',
            color: Colors.green
        },
        overdue: {
            title: 'Overdue',
            color: Colors.red
        }
    }

    constructor(props) {
        super(props);

        type = this.props.route.params.tag;

        this.state = ({
            title: this.types[type].title,
            color: this.types[type].color,
            tasks: [
                {
                    id: 1,
                    title: 'Add Logo (Change Color. Blah Blah)',
                    product: 'ProTrackter',
                    assignee: 'Ciddarth',
                    color: Colors.blue,
                    description: 'Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah)',
                    status: 1,
                    taskHistory: [
                        {
                            id: 1,
                            title: 'Task1',
                            date: 'Wed Jun 03 2020'
                        },
                        {
                            id: 2,
                            title: 'Task2',
                            date: 'Wed Jun 03 2020'
                        },
                    ]
                },
                {
                    id: 2,
                    title: 'Add Logo (Change Color. Blah Blah)',
                    product: 'ProTrackter',
                    assignee: 'Ciddarth',
                    color: Colors.purple,
                    description: 'Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah)',
                    status: 2,
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
                    id: 3,
                    title: 'Add Logo (Change Color. Blah Blah)',
                    product: 'ProTrackter',
                    assignee: 'Ciddarth',
                    color: Colors.green,
                    description: 'Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah)',
                    status: 3,
                    taskHistory: [
                        {
                            id: 1,
                            title: 'Task5',
                            date: 'Wed Jun 03 2020'
                        },
                        {
                            id: 2,
                            title: 'Task6',
                            date: 'Wed Jun 03 2020'
                        },
                    ]
                },
                {
                    id: 4,
                    title: 'Add Logo (Change Color. Blah Blah)',
                    product: 'ProTrackter',
                    assignee: 'Ciddarth',
                    color: Colors.indigo,
                    description: 'Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah)',
                    status: 1,
                    taskHistory: [
                        {
                            id: 1,
                            title: 'Task7',
                            date: 'Wed Jun 03 2020'
                        },
                        {
                            id: 2,
                            title: 'Task8',
                            date: 'Wed Jun 03 2020'
                        },
                    ]
                }
            ]
        })
    }

    render() {
        const { title, color, tasks } = this.state;
        return (
            <>
                <SafeAreaView style={{ backgroundColor: Colors.notificationBar }} />
                <ScrollView style={{ flex: 1, backgroundColor: Colors.background, padding: 10 }}>
                    <Header image={'https://i.imgur.com/0byOhwQ.jpg'} name={'Ciddarth Raaj'} />

                    <Text style={[Styles.headingText, { color: color, marginTop: 10 }]}>{title}</Text>
                    <Text style={[Styles.headingText, { marginBottom: 10 }]}>{'Today'}</Text>

                    <View style={Styles.tasksWrapper}>
                        {
                            tasks.map((t) => (
                                <TaskCard
                                    id={t.id}
                                    title={t.title}
                                    product={t.product}
                                    assignee={t.assignee}
                                    color={t.color}
                                    description={t.description}
                                    status={t.status}
                                    taskHistory={t.taskHistory}
                                />
                            ))
                        }
                    </View>
                </ScrollView>
            </>
        );
    }
}

// const styles = StyleSheet.create({
// });
