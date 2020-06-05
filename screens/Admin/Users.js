import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

import Colors from '../../constants/colors';

export default class Users extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <SafeAreaView style={{ backgroundColor: Colors.notificationBar }} />
                <ScrollView style={{ flex: 1, backgroundColor: Colors.background }}>

                </ScrollView>
                <SafeAreaView style={{ backgroundColor: Colors.background }} />
            </>
        );
    }
}

// const styles = StyleSheet.create({
// });
