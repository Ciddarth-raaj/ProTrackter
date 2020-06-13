import constants from './util/api';
import axios from 'axios';

export default axios.create({
  baseURL: constants.BASE_URL,
  transformResponse: [
    (res) => {
      try {
        res = JSON.parse(res)
        if (res.code === 500) {
          throw Error("An Error Occurred !")
        }
        return res;
      } catch (err) {
        console.log(err)
        throw Error(__DEV__ ? res : 'An Error Occurred !');
      }
    },
  ],
});
