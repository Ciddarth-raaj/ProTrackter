import constants from './constants/api';
import axios from 'axios';

const custom = axios.create({
  baseURL: constants.BASE_URL,
  transformResponse: [
    (res) => {
      try {
        res = JSON.parse(res);
        if (res.code === 500) {
          throw Error('An Error Occurred !');
        }
        return res;
      } catch (err) {
        console.log(err);
        throw Error(__DEV__ ? res : 'An Error Occurred !');
      }
    },
  ],
});

custom.defaults.headers.common['x-access-token'] = global.token;

export default custom;
