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
      oldPass: '',
      newPass: ''
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

  handlePassChange() {
    const { oldPass, newPass } = this.state;

    alert(oldPass + ' ' + newPass);
  }

  render() {
    const { navigation } = this.props;
    const { telId, oldPass, newPass } = this.state;
    return (
      <>
        <SafeAreaView style={{ backgroundColor: Colors.notificationBar }} />
        <ScrollView
          style={{ flex: 1, backgroundColor: Colors.background, padding: 10 }}>
          <Header navigation={navigation} isBack={true} />
          <Text style={[Styles.headingText, { marginTop: 10, marginBottom: 20 }]}>
            Settings
          </Text>

          <View>
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
                borderTopColor: Colors.grey,
                borderTopWidth: 1,
              }}>
            </View>
          </View>


          <View>
            <Text style={[Styles.headingText, { fontSize: 20 }]}>Change Password</Text>

            <View style={{ marginTop: 10 }}>

              <TextInput value={oldPass} placeholder={'Enter Old Password'} style={[Styles.inputBox]} placeholderTextColor={'white'} secureTextEntry={true} onChangeText={v => this.setState({ oldPass: v })} />
              <TextInput value={newPass} placeholder={'Enter New Password'} style={[Styles.inputBox]} placeholderTextColor={'white'} secureTextEntry={true} onChangeText={v => this.setState({ newPass: v })} />

              <TouchableOpacity
                style={[Styles.button, { marginBottom: 10 }]}
                onPress={() => this.handlePassChange()}>
                <Text style={[Styles.buttonText]}>Done</Text>
              </TouchableOpacity>

            </View>

            <View
              style={{
                flex: 1,
                paddingTop: 15,
                alignItems: 'center',
                borderTopColor: Colors.grey,
                borderTopWidth: 1,
              }}>
            </View>
          </View>

          <Text style={{ fontWeight: 'bold' }}>
            ProTracktor v{VersionNumber.appVersion}
          </Text>

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
