import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';

import Colors from '../../constants/colors';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <SafeAreaView style={{backgroundColor: Colors.notificationBar}} />
        <View style={{marginTop: 50}}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('AdminHome')}>
            <Text style={styles.menuText}>Admin</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Home')}>
            <Text style={styles.menuText}>User</Text>
          </TouchableOpacity>
        </View>
        <SafeAreaView style={{backgroundColor: Colors.background}} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  menuText: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 20,
  },
});
