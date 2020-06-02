import React from 'react';
import { SafeAreaView, ScrollView, Text, View, StyleSheet } from 'react-native';

import Colors from '../constants/colors';
import Header from '../components/header';
import Styles from '../constants/styles';
import HomeCard from '../components/homeCard';
import TaskCard from '../components/taskCard';
import colors from '../constants/colors';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            tasks: [
                {
                    id: 1,
                    title: 'Add Logo (Change Color. Blah Blah)',
                    product: 'ProTrackter',
                    assignee: 'Ciddarth',
                    color: colors.blue,
                    description: 'Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah)',
                    status: 1
                },
                {
                    id: 2,
                    title: 'Add Logo (Change Color. Blah Blah)',
                    product: 'ProTrackter',
                    assignee: 'Ciddarth',
                    color: colors.purple,
                    description: 'Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah)',
                    status: 2
                },
                {
                    id: 3,
                    title: 'Add Logo (Change Color. Blah Blah)',
                    product: 'ProTrackter',
                    assignee: 'Ciddarth',
                    color: colors.green,
                    description: 'Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah)',
                    status: 3
                },
                {
                    id: 4,
                    title: 'Add Logo (Change Color. Blah Blah)',
                    product: 'ProTrackter',
                    assignee: 'Ciddarth',
                    color: colors.indigo,
                    description: 'Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah) Add Logo (Change Color. Blah Blah)',
                    status: 1
                }
            ]
        });
    }

    render() {
        const { tasks } = this.state;
        return (
            <>
                <SafeAreaView style={{ backgroundColor: Colors.notificationBar }} />
                <ScrollView style={{ flex: 1, backgroundColor: Colors.background, padding: 10 }}>
                    <Header image={'https://i.imgur.com/0byOhwQ.jpg'} name={'Ciddarth Raaj'} />
                    <Text style={[Styles.headingText, { marginTop: 10 }]}>Today</Text>
                    <View style={styles.cardWrapper}>
                        <HomeCard title={'Pending'} lightColor={Colors.purpleLight} color={Colors.purple} image={require('../assests/clock.png')} notificationCount={10} />
                        <HomeCard title={'In Progress'} lightColor={Colors.blueLight} color={Colors.blue} image={require('../assests/refresh.png')} notificationCount={10} />
                        <HomeCard title={'New'} lightColor={Colors.greenLight} color={Colors.green} image={require('../assests/new.png')} notificationCount={10} />
                        <HomeCard title={'Overdue'} lightColor={Colors.redLight} color={Colors.red} image={require('../assests/warning.png')} notificationCount={10} />
                    </View>

                    <View style={Styles.tasksWrapper}>
                        {
                            tasks.map((t) => (
                                <TaskCard id={t.id} title={t.title} product={t.product} assignee={t.assignee} color={t.color} description={t.description} status={t.status} />
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
