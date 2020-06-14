import {AsyncStorage} from 'react-native';

import API from '../api';

export default function Splash({navigation}) {
  (async () => {
    const token = await AsyncStorage.getItem('token');
    if (token === undefined) {
      navigation.navigate('Login');
      return;
    }

    API.updateToken(token);
    console.log(API.defaults.headers);

    const roleId = await AsyncStorage.getItem('role_id');
    if (roleId == 2 || roleId == 1) {
      navigation.navigate('AdminHome');
    } else if (roleId == 3) {
      navigation.navigate('Home');
    }
  })();

  return null;
}
