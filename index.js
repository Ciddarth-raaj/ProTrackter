import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

global.token = null;

AppRegistry.registerComponent(appName, () => App);
