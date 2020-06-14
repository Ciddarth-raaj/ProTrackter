import constants from './constants/api';
import axios from 'axios';

export default axios.create({
  baseURL: constants.BASE_URL,
  headers: {
    'x-access-token': global.token,
  },
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
