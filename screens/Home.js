import React from 'react';
import { SafeAreaView, ScrollView, Text, View, StyleSheet } from 'react-native';

import Colors from '../constants/colors';
import Header from '../components/header';
import Styles from '../constants/styles';
import HomeCard from '../components/homeCard';
import TaskCard from '../components/taskCard';
import API from '../api';

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
            tasks: []
        });
    }

    formatResponse(response) {
        const colors = [Colors.blue, Colors.orange, Colors.indigo, Colors.red, Colors.green, Colors.purple];
        return new Promise(async (resolve, reject) => {
            const tasks = [];
            let count = 0;

            for (const task of response) {
                tasks.push({
                    id: 1,
                    title: task.title,
                    product: task.label,
                    assignee: 'Ciddarth',
                    color: colors[count++],
                    description: task.description,
                    status: task.status,
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
                });
                if (count == colors.length)
                    count = 0;
            }
            resolve(tasks);
        });
    }

    componentDidMount() {
        this.getTasks();
    }

    getTasks() {
        console.log(global.token);
        API.get('/task/user', {
            headers: {
                'x-access-token': global.token
            }
        })
            .then(async res => {
                console.log(res.data);
                if (res.data.code === 200) {
                    const tasks = await this.formatResponse(res.data.tasks);
                    this.setState({ tasks: tasks });
                }
                else {
                    alert(res.data.msg);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        const { tasks, items } = this.state;
        return (
            <>
                <SafeAreaView style={{ backgroundColor: Colors.notificationBar }} />
                <ScrollView style={{ flex: 1, backgroundColor: Colors.background, padding: 10 }}>
                    <Header name={'Ciddarth Raaj'} />
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

                    <View style={[Styles.tasksWrapper, { marginBottom: 10 }]}>
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

const styles = StyleSheet.create({
    cardWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 10,
    },
});
