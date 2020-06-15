import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';

import Colors from '../../constants/colors';
import Styles from '../../constants/styles';
import UserCard from '../../components/Admin/userCard';
import AddUserModal from '../../components/Admin/addUserModal';

import API from '../../api';

export default class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isUserModalOpen: false,
    };
  }

  componentDidMount() {
    this.getAllUsers();
  }

  formatUsers(users) {
    const formattedUsers = [];
    const colors = [
      Colors.blue,
      Colors.orange,
      Colors.indigo,
      Colors.red,
      Colors.green,
      Colors.purple,
    ];
    let colorIndex = 0;
    for (const user of users) {
      if (colorIndex >= colors.length) {
        colorIndex = 0;
      }
      formattedUsers.push({
        id: user.user_id,
        name: user.first_name + ' ' + user.last_name,
        role: user.role,
        status: user.status,
        activeTasksCount: user.activeTasksCount,
        color: colors[colorIndex++],
      });
    }

    return formattedUsers;
  }

  getAllUsers() {
    API.get('/user/company')
      .then((res) => {
        if (res.data.code === 200) {
          const allUsers = this.formatUsers(res.data.users);
          this.setState({users: allUsers});
        }
      })
      .catch((err) => {});
  }

  render() {
    const {users, isUserModalOpen} = this.state;
    const {navigation} = this.props;
    return (
      <>
        <SafeAreaView style={{backgroundColor: Colors.notificationBar}} />
        <AddUserModal
          visible={isUserModalOpen}
          setVisible={(visible) => {
            this.setState({isUserModalOpen: visible});
          }}
          onCreate={() => {
            this.getAllUsers();
          }}
        />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={{flex: 1, backgroundColor: Colors.background, padding: 10}}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => navigation.pop()}
              style={{alignSelf: 'center', marginRight: 10}}>
              <Image
                source={require('../../assests/back.png')}
                style={styles.backButton}
              />
            </TouchableOpacity>

            <Text
              style={[Styles.headingText, {marginTop: 10, marginBottom: 10}]}>
              Users
            </Text>
          </View>

          <View>
            {users.map((u) => (
              <UserCard
                key={'user-' + u.id}
                id={u.id}
                name={u.name}
                color={u.color}
                status={u.status}
                role={u.role}
                activeTasksCount={u.activeTasksCount}
              />
            ))}
          </View>
        </ScrollView>
        <TouchableOpacity
          style={[styles.addButton, styles.floatingButton]}
          onPress={() => this.setState({isUserModalOpen: true})}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </>
    );
  }
}

const styles = StyleSheet.create({
  mainTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    // marginBottom: 10
  },
  backButton: {
    width: 20,
    height: 20,
  },
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  addButton: {
    backgroundColor: 'white',
    position: 'absolute',
    right: 10,
    bottom: 30,
  },
  addText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 40,
    paddingBottom: 3,
    color: Colors.addGreen,
  },
});
