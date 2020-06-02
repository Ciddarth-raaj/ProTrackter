import React from 'react';
import { SafeAreaView, ScrollView, Text, View, StyleSheet } from 'react-native';

import Colors from '../constants/colors';
import Header from '../components/header';
import Styles from '../constants/styles';
import HomeCard from '../components/homeCard';
import TaskCard from '../components/taskCard';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            items: [
                {
                    title: 'Pending',
                    image: require('../assests/clock.png'),
                    color: Colors.purple,
                    lightColor: Colors.purpleLight,
                    notificationCount: 10,
                    tag: 'pending'
                },
                {
                    title: 'In Progress',
                    image: require('../assests/refresh.png'),
                    color: Colors.blue,
                    lightColor: Colors.blueLight,
                    notificationCount: 90,
                    tag: 'inProgress'
                },
                {
                    title: 'New',
                    image: require('../assests/new.png'),
                    color: Colors.green,
                    lightColor: Colors.greenLight,
                    notificationCount: 4,
                    tag: 'new'
                },
                {
                    title: 'Overdue',
                    image: require('../assests/warning.png'),
                    color: Colors.red,
                    lightColor: Colors.redLight,
                    notificationCount: 8,
                    tag: 'overdue'
                },
            ],
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
        });
    }

    render() {
        const { tasks, items } = this.state;
        return (
            <>
                <SafeAreaView style={{ backgroundColor: Colors.notificationBar }} />
                <ScrollView style={{ flex: 1, backgroundColor: Colors.background, padding: 10 }}>
                    <Header image={'https://i.imgur.com/0byOhwQ.jpg'} name={'Ciddarth Raaj'} />
                    <Text style={[Styles.headingText, { marginTop: 10 }]}>Today</Text>
                    <View style={styles.cardWrapper}>
                        {
                            items.map((i) => (
                                <HomeCard
                                    title={i.title}
                                    lightColor={i.lightColor}
                                    color={i.color}
                                    image={i.image}
                                    notificationCount={i.notificationCount}
                                    tag={i.tag}
                                    navigation={this.props.navigation} />
                            ))
                        }
                    </View>

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
                <SafeAreaView style={{ backgroundColor: Colors.background }} />
            </>
        );
    }
}

const styles = StyleSheet.create({
    cardWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 10
    },
});
