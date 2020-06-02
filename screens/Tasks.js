import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

import '../constants/styles';

export default class Tasks extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <SafeAreaView style={{ backgroundColor: '#00CDFF' }} />
                <ScrollView>

                </ScrollView>
                <SafeAreaView style={{ backgroundColor: 'white' }} />
            </>
        );
    }
}

// const styles = StyleSheet.create({
// });
