import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Button,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';

import BottomMenu from '../util/bottomMenu';

import Colors from '../constants/colors';
import API from '../api';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: 'Loading...',
      status: 'Loading...',
      date: 'Loading...',

      isStatusModalOpen: false,
      status: 'Loading...',
      allStatus: [],
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('firstName', (err, value) => {
      if (err) {
        return;
      }
      this.setState({fName: value, date: new Date().toDateString()});
    });

    this.getUserDetails();
    this.getAllStatus();
  }

  logout() {
    const {navigation} = this.props;
    AsyncStorage.clear();
    navigation.navigate('Login');
  }

  getUserDetails() {
    API.get('/user/details')
      .then((res) => {
        if (res.data.code === 200) {
          AsyncStorage.setItem('firstName', res.data.details.first_name);
          const userDetails = {
            fName: res.data.details.first_name,
            status: res.data.details.status,
          };

          this.setState(userDetails);
        }
      })
      .catch((err) => {});
  }

  formatStatus(status) {
    const formattedStatus = [];
    for (const stat of status) {
      formattedStatus.push({
        title: stat.label,
        onPress: () => {
          this.setState({isStatusModalOpen: false});
          this.updateStatus({id: stat.status_id, label: stat.label});
        },
      });
    }
    return formattedStatus;
  }

  getAllStatus() {
    API.get('/user/status')
      .then((res) => {
        if (res.data.code === 200) {
          const allStatus = this.formatStatus(res.data.status);
          this.setState({allStatus: allStatus});
        }
      })
      .catch((err) => {});
  }

  updateStatus({id, label}) {
    API.patch('/user/status', {statusId: id}).then((res) => {
      if (res.data.code === 200) {
        this.setState({status: label});
      }
    });
  }

  render() {
    const {fName, status, date, isStatusModalOpen, allStatus} = this.state;
    const {isBack, navigation} = this.props;

    return (
      <View style={{flexDirection: 'row'}}>
        {isBack && (
          <TouchableOpacity
            onPress={() => navigation.pop()}
            style={{alignSelf: 'center', marginRight: 10}}>
            <Image
              source={require('../assests/back.png')}
              style={styles.backButton}
            />
          </TouchableOpacity>
        )}
        <Image
          source={require('../assests/placeholderProfile.jpg')}
          style={styles.image}
        />
        <View style={{justifyContent: 'center', marginLeft: 20}}>
          <Text style={[styles.name, {marginBottom: 5}]}>{`Hi, ${fName}`}</Text>
          <TouchableOpacity
            onPress={() => {
              this.setState({isStatusModalOpen: true});
            }}>
            <Text
              style={[
                styles.status,
                {
                  marginBottom: 5,
                  color: status === 'Online' ? Colors.green : Colors.red,
                },
              ]}>
              {status}
            </Text>
          </TouchableOpacity>
          <Text style={styles.date}>{date}</Text>
        </View>
        <View style={{justifyContent: 'flex-end', flex: 1}}>
          <Button
            title="Logout"
            onPress={() => {
              this.logout();
            }}
          />
        </View>
        <BottomMenu
          visible={isStatusModalOpen}
          setVisible={(isVisible) => {
            this.setState({isStatusModalOpen: isVisible});
          }}
          options={allStatus}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  status: {
    fontWeight: 'bold',
    color: Colors.green,
    fontSize: 17,
  },
  date: {
    fontSize: 15,
    color: Colors.grey,
  },
  backButton: {
    width: 20,
    height: 20,
  },
});
