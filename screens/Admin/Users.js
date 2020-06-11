import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';

import Colors from '../../constants/colors';
import Styles from '../../constants/styles';
import UserCard from '../../components/Admin/userCard';

export default class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [
                {
                    id: 1,
                    name: 'Ciddarth Raaj',
                    color: Colors.purple,
                    tasks: [
                    ]
                },
                {
                    id: 2,
                    name: 'Vinoth Raaj',
                    color: Colors.orange,
                    tasks: [
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
                            color: Colors.indigo,
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
                    ]
                }
            ]
        }
    }

    render() {
        const { users } = this.state;
        const { navigation } = this.props;
        return (
            <>
                <SafeAreaView style={{ backgroundColor: Colors.notificationBar }} />
                <ScrollView style={{ flex: 1, backgroundColor: Colors.background, padding: 10 }}>

                    <View style={{ flexDirection: 'row' }}>

                        <TouchableOpacity onPress={() => navigation.pop()} style={{ alignSelf: 'center', marginRight: 10 }}>
                            <Image source={require("../../assests/back.png")} style={styles.backButton} />
                        </TouchableOpacity>

                        <Text style={[Styles.headingText, { marginTop: 10, marginBottom: 10 }]}>Users</Text>

                    </View>

                    <View>
                        {
                            users.map((u) => (
                                <UserCard id={u.id} name={u.name} color={u.color} tasks={u.tasks} />
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
    mainTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        // marginBottom: 10
    },
    backButton: {
        width: 20,
        height: 20,
    },
});
