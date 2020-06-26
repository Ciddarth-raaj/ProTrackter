import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import Colors from '../../constants/colors';
import Styles from '../../constants/styles';


export default class Phone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { navigation } = this.props;
        return (
            <>
                <SafeAreaView style={{ backgroundColor: Colors.notificationBar }} />
                <ScrollView
                    style={{ flex: 1, backgroundColor: Colors.background, padding: 10 }}>

                </ScrollView>
                <SafeAreaView style={{ backgroundColor: Colors.background }} />
            </>
        );
    }
}

const styles = StyleSheet.create({

});
