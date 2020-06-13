import React from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';

import Colors from '../constants/colors';
import API from '../api';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleLogin() {
        const { email, password } = this.state;

        if (email === '') {
            alert('Enter Email ID to Continue');
        } else if (password === '') {
            alert('Enter Password to Continue');
        } else {
            this.checkLogin(email, password);
        }
    }

    checkLogin(email, password) {
        API.post('/user/login', { email: email, password: password })
            .then(async res => {
                console.log(res.data);
                if (res.data.code === 200) {
                    AsyncStorage.setItem('company_id', res.data.data.company_id + '');
                    AsyncStorage.setItem('role_id', res.data.data.role_id + '');
                    AsyncStorage.setItem('token', res.data.data.token);
                    AsyncStorage.setItem('firstName', res.data.data.first_name);
                    AsyncStorage.setItem('lastName', res.data.data.last_name);
                    global.token = res.data.data.token;
                    if (res.data.data.role_id === 2) {
                        this.props.navigation.navigate('AdminHome');
                    } else if (res.data.data.role_id === 3) {
                        this.props.navigation.navigate('Home');
                    }
                }
                else {
                    alert(res.data.msg);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <>
                <SafeAreaView style={{ backgroundColor: Colors.notificationBar }} />
                <View style={{ backgroundColor: Colors.background, flex: 1, justifyContent: 'center' }}>
                    <View style={{ width: '80%', alignSelf: 'center' }}>
                        <Text style={styles.heading}>Login</Text>

                        <TextInput
                            placeholder={'Email'}
                            style={styles.inputBox}
                            placeholderTextColor={'white'}
                            autoCompleteType={'email'}
                            onChangeText={(t) => this.setState({ email: t })}
                            autoCapitalize="none"
                            selectionColor={'white'} />

                        <TextInput
                            placeholder={'Password'}
                            style={styles.inputBox}
                            placeholderTextColor={'white'}
                            secureTextEntry={true}
                            autoCompleteType={'password'}
                            onChangeText={(t) => this.setState({ password: t })}
                            autoCapitalize="none"
                            selectionColor={'white'} />

                        <TouchableOpacity style={styles.login} onPress={() => this.handleLogin()}>
                            <Text style={styles.loginText}>LOGIN</Text>
                        </TouchableOpacity>

                    </View>
                </View>
                <SafeAreaView style={{ backgroundColor: Colors.background }} />
            </>
        );
    }
}

const styles = StyleSheet.create({
    inputBox: {
        width: '100%',
        borderRadius: 10,
        backgroundColor: Colors.blue,
        marginBottom: 10,
        color: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        height: 50
    },
    heading: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    },
    login: {
        backgroundColor: Colors.orange,
        borderRadius: 10,
        padding: 15,
        width: 100,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    loginText: {
        color: 'white',
        fontWeight: '700',
        textAlign: 'center'
    }
});
