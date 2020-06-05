import React from 'react';
import { SafeAreaView, ScrollView, Text, View, StyleSheet } from 'react-native';

import Colors from '../../constants/colors';
import Header from '../../components/header';
import Styles from '../../constants/styles';
import HomeCard from '../../components/homeCard';
import TaskCard from '../../components/taskCard';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            items: [
                {
                    title: 'Tasks',
                    image: require('../../assests/clock.png'),
                    color: Colors.purple,
                    lightColor: Colors.purpleLight,
                    notificationCount: 0,
                    openPage: () => this.props.navigation.navigate('AdminTasks')
                },
                {
                    title: 'Users',
                    image: require('../../assests/refresh.png'),
                    color: Colors.blue,
                    lightColor: Colors.blueLight,
                    notificationCount: 0,
                    openPage: () => this.props.navigation.navigate('AdminUsers')
                },
                {
                    title: 'Reports',
                    image: require('../../assests/new.png'),
                    color: Colors.green,
                    lightColor: Colors.greenLight,
                    notificationCount: 0,
                    openPage: () => this.props.navigation.navigate('Login')
                },
                {
                    title: 'Settings',
                    image: require('../../assests/warning.png'),
                    color: Colors.red,
                    lightColor: Colors.redLight,
                    notificationCount: 0,
                    openPage: () => this.props.navigation.navigate('Login')
                },
            ],
        });
    }

    render() {
        const { items } = this.state;
        return (
            <>
                <SafeAreaView style={{ backgroundColor: Colors.notificationBar }} />
                <ScrollView style={{ flex: 1, backgroundColor: Colors.background, padding: 10 }}>
                    <Header name={'Ciddarth Raaj'} />
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
                                    openPage={i.openPage}
                                    navigation={this.props.navigation}
                                    type={'admin'} />
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
