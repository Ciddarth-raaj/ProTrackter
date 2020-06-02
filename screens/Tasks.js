import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

import Colors from '../constants/colors';
import Styles from '../constants/styles';


export default class Tasks extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <SafeAreaView style={{ backgroundColor: Colors.notificationBar }} />
                <ScrollView style={{ flex: 1, backgroundColor: Colors.background, padding: 10 }}>
                </ScrollView>
            </>
        );
    }
}

// const styles = StyleSheet.create({
// });
