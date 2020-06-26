import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, Text, View } from 'react-native';

import Colors from '../../constants/colors';
import Styles from '../../constants/styles';


export default class Otp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            otp: '',
            password: ''
        };
    }

    handlePress = () => {

    }

    render() {
        const { otp, password } = this.state;
        return (
            <>
                <SafeAreaView style={{ backgroundColor: Colors.notificationBar }} />
                <View
                    style={{
                        backgroundColor: Colors.background,
                        flex: 1,
                        justifyContent: 'center',
                    }}>

                    <View style={{ width: '80%', alignSelf: 'center' }}>

                        <TextInput
                            placeholder={'Enter OTP'}
                            style={Styles.inputBox}
                            placeholderTextColor={'white'}
                            autoCompleteType={'tel'}
                            onChangeText={(t) => this.setState({ otp: t })}
                            value={otp}
                            selectionColor={'white'}
                            maxLength={4}
                            keyboardType='numeric'
                        />

                        <TextInput
                            placeholder={'Password'}
                            style={Styles.inputBox}
                            placeholderTextColor={'white'}
                            secureTextEntry={true}
                            autoCompleteType={'password'}
                            onChangeText={(t) => this.setState({ password: t })}
                            value={password}
                            autoCapitalize="none"
                            selectionColor={'white'}
                        />

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.handlePress()}>
                            <Text style={styles.buttonText}>{"Continue"}</Text>
                        </TouchableOpacity>

                    </View>

                </View>
                <SafeAreaView style={{ backgroundColor: Colors.background }} />
            </>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.orange,
        borderRadius: 10,
        padding: 15,
        width: 150,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        textAlign: 'center',
    },
});
