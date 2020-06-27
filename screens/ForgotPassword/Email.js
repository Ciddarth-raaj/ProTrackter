import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, Text, View } from 'react-native';

import Colors from '../../constants/colors';
import Styles from '../../constants/styles';
import API from '../../api';

export default class Phone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };
    }

    handlePress() {
        const { email } = this.state;
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            this.sendOtp(email);
        } else {
            alert('Enter a Valid Email ID!');
        }
    }

    sendOtp(email) {
        API.post('/user/reset_password', { email: email })
            .then(async (res) => {
                if (res.data.code === 200) {
                    this.props.navigation.navigate('Otp');
                } else {
                    alert(res.data.msg);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        const { email } = this.state;
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
                            placeholder={'Enter Email Id'}
                            style={Styles.inputBox}
                            placeholderTextColor={'white'}
                            autoCompleteType={'email'}
                            onChangeText={(t) => this.setState({ email: t })}
                            value={email}
                            selectionColor={'white'}
                            autoCapitalize={false}
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
