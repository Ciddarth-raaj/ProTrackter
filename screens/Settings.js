import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import VersionNumber from 'react-native-version-number';

import Styles from '../constants/styles';
import Colors from '../constants/colors';
import API from '../api';
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

  putTelegramId() {
    API.patch('/user/telegram', {telegramId: this.state.telId})
      .then((res) => {
        if (res.data.code === 200) {
          alert('Successfully Added!');
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  getTelegramId() {
    API.get('/user/telegram')
      .then((res) => {
        if (res.data.code === 200) {
          this.setState({telId: res.data.telegramId});
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  render() {
    const {navigation} = this.props;
    const {telId} = this.state;
    return (
      <>
        <SafeAreaView style={{backgroundColor: Colors.notificationBar}} />
        <ScrollView
          style={{flex: 1, backgroundColor: Colors.background, padding: 10}}>
          <Header navigation={navigation} isBack={true} />
          <Text style={[Styles.headingText, {marginTop: 10}]}>Settings</Text>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <TextInput
              placeholder="Enter Telegram ID"
              style={[Styles.inputBox, {width: '80%'}]}
              placeholderTextColor={'white'}
              onChangeText={(v) => this.setState({telId: v})}
              value={telId}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => this.putTelegramId()}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              paddingTop: 15,
              alignItems: 'center',
              borderTopColor: 'black',
              borderTopWidth: 1,
            }}>
            <Text style={{fontWeight: 'bold'}}>
              app v{VersionNumber.appVersion}
            </Text>
          </View>
        </ScrollView>
        <SafeAreaView style={{backgroundColor: Colors.background}} />
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
    flex: 1,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '700',
    color: 'white',
  },
});
