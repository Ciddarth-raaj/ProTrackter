import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Clipboard,
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

  copyTelegramId() {
    const { telId } = this.state;
    Clipboard.setString('/setup ' + telId);
    alert('Copied to clipboard');
  }

  generateTelegramId() {
    API.post('/user/telegram')
      .then((res) => {
        if (res.data.code === 200) {
          this.setState({ telId: res.data.uuid });
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
          this.setState({ telId: res.data.telegramId });
        } else {
          this.setState({ telId: null });
        }
      })
      .catch((err) => {
        alert(err);
      });
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
          <Text style={[Styles.headingText, { marginTop: 10, marginBottom: 50 }]}>
            Settings
          </Text>
          <Text style={[Styles.headingText, { fontSize: 20 }]}>Telegram</Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
            }}>

            <TextInput value={telId === null ? 'Token not found' : '*******************'} style={[Styles.inputBox, { width: '50%' }]} secureTextEntry={true} editable={false} />

            <TouchableOpacity
              style={styles.button}
              onPress={() => this.generateTelegramId()}>
              <Text style={styles.buttonText}>Generate</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.copyTelegramId()}>
              <Text style={styles.buttonText}>Copy</Text>
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
            <Text style={{ fontWeight: 'bold' }}>
              app v{VersionNumber.appVersion}
            </Text>
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
    flex: 1,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '700',
    color: 'white',
  },
});
