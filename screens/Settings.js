import React from 'react';
import { SafeAreaView, ScrollView, Text, View, StyleSheet } from 'react-native';

import Styles from '../constants/styles';
import Colors from '../constants/colors';

import Header from '../components/header';


export default class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { navigation } = this.props;
        return (
            <>
                <SafeAreaView style={{ backgroundColor: Colors.notificationBar }} />
                <ScrollView
                    style={{ flex: 1, backgroundColor: Colors.background, padding: 10 }}>
                    <Header navigation={navigation} isBack={true} />
                </ScrollView>
                <SafeAreaView style={{ backgroundColor: Colors.background }} />
            </>
        );
    }
}

const styles = StyleSheet.create({});
