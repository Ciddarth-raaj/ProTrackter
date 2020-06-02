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
    }

    render() {
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
                        <TaskCard title={'Add Logo (Change Color. Blah Blah)'} product={'ProTrackter'} assignee={'Ciddarth'} color={Colors.blue} />
                        <TaskCard title={'Add Logo (Change Color. Blah Blah)'} product={'ProTrackter'} assignee={'Ciddarth'} color={Colors.purple} />
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
