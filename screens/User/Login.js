import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
} from 'react-native';

import API from '../../api';
import Styles from '../../constants/styles';
import Colors from '../../constants/colors';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      btnText: 'LOGIN',
    };
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
    this.setState({ btnText: 'LOGGING IN...' });

    API.post('/user/login', { email: email, password: password })
      .then(async (res) => {
        if (res.data.code === 200) {
          API.updateToken(res.data.data.token);
          const roleId = res.data.data.role_id;

          AsyncStorage.setItem(
            'company_id',
            res.data.data.company_id.toString(),
          );
          AsyncStorage.setItem('role_id', res.data.data.role_id.toString());
          AsyncStorage.setItem('token', res.data.data.token);
          AsyncStorage.setItem('firstName', res.data.data.first_name);
          AsyncStorage.setItem('lastName', res.data.data.last_name);

          if (roleId == 2 || roleId == 1) {
            this.props.navigation.navigate('AdminHome');
          } else if (roleId == 3) {
            this.props.navigation.navigate('Home');
          }
        } else {
          alert(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.setState({ btnText: 'LOGIN' });
      });
  }

  render() {
    const { email, password, btnText } = this.state;
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
            <Text style={styles.heading}>Login</Text>

            <TextInput
              placeholder={'Email'}
              style={Styles.inputBox}
              placeholderTextColor={'white'}
              autoCompleteType={'email'}
              onChangeText={(t) => this.setState({ email: t })}
              value={email}
              autoCapitalize="none"
              selectionColor={'white'}
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
              style={styles.login}
              onPress={() => this.handleLogin()}>
              <Text style={styles.loginText}>{btnText}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <SafeAreaView style={{ backgroundColor: Colors.background }} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  login: {
    backgroundColor: Colors.orange,
    borderRadius: 10,
    padding: 15,
    width: 150,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  loginText: {
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
  },
});
