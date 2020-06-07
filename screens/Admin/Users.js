import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';

import Colors from '../../constants/colors';
import Styles from '../../constants/styles';

export default class Users extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
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
