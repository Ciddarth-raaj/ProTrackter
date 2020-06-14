import {AsyncStorage} from 'react-native';

export default function Splash({navigation}) {
  (async () => {
    const token = await AsyncStorage.getItem('token');
    if (token === undefined) {
      navigation.navigate('Login');
      return;
    }

    global.token = token;

    const roleId = await AsyncStorage.getItem('role_id');
    if (roleId == 2 || roleId == 1) {
      navigation.navigate('AdminHome');
    } else if (roleId == 3) {
      navigation.navigate('Home');
    }
  })();

  return null;
}
