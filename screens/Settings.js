import React from 'react';
import { SafeAreaView, ScrollView, Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import Styles from '../constants/styles';
import Colors from '../constants/colors';

import Header from '../components/header';


export default class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            telId: '',
        };
    }

    componentDidMount() {
        this.getTelegramId();
    }

    getTelegramId() {
        this.setState({ telId: '1234567890' })
    }

    render() {
        const { navigation } = this.props;
        const { telId } = this.state;
        return (
            <>
                <SafeAreaView style={{ backgroundColor: Colors.notificationBar }} />
                <ScrollView
                    style={{ flex: 1, backgroundColor: Colors.background, padding: 10 }}>
                    <Header navigation={navigation} isBack={true} />
                    <Text style={[Styles.headingText, { marginTop: 10 }]}>Settings</Text>
                    <View style={{ flexDirection: 'row', marginTop: 10, }}>
                        <TextInput placeholder="Enter Telegram ID" style={[Styles.inputBox, { width: '80%' }]} placeholderTextColor={'white'} onChangeText={v => this.setState({ telId: v })} value={telId} />

                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Done</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
                <SafeAreaView style={{ backgroundColor: Colors.background }} />
            </>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        backgroundColor: Colors.orange,
        height: 50,
        alignSelf: 'center',
        marginBottom: 10,
        marginLeft: 10,
        justifyContent: 'center',
        flex: 1
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: '700',
        color: 'white'
    }
});
