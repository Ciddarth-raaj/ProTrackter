import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
  TextInput,
  Picker,
} from 'react-native';

import Colors from '../../constants/colors';
import API from '../../api';

export default class AddUserModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      roles: [],
      selectedRoleId: 0,
    };
  }

  componentDidMount() {
    this.getRoles();
  }

  getRoles() {
    API.get('/role')
      .then((res) => {
        if (res.data.code === 200) {
          const roles = res.data.roles;
          this.setState({ roles: roles, selectedRoleId: roles[0].role_id });
        }
      })
      .catch((err) => { });
  }

  handleCreateUser() {
    const { firstName, lastName, email, selectedRoleId } = this.state;

    if (firstName.trim() === '') {
      alert('Enter First name to Continue');
    } else if (lastName.trim() === '') {
      alert('Enter First name to Continue');
    } else if (email.trim() === 0) {
      alert('Enter Email to Continue');
    } else if (selectedRoleId === 0) {
      alert('Select Role');
    } else {
      this.createUser(firstName, lastName, email, selectedRoleId);
    }
  }

  createUser(firstName, lastName, email, roleId) {
    const { onCreate } = this.props;

    API.post('/user', {
      firstName: firstName,
      lastName: lastName,
      email: email,
      roleId: roleId,
    })
      .then(async (res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          this.setState({ firstName: '', lastName: '', email: '' });
          onCreate();
          alert('Successfully Created');
        } else {
          alert(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { email, firstName, lastName, roles, selectedRoleId } = this.state;
    const { visible, setVisible } = this.props;

    return (
      <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={() => { setVisible(false); }}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
          <TouchableOpacity
            style={{ width: '100%', height: '10%', position: 'absolute', top: 0 }}
            onPress={() => setVisible(false)}
          />

          <View style={[styles.container]}>
            <TouchableOpacity
              style={styles.crossButton}
              onPress={() => setVisible(false)}>
              <Image
                source={require('../../assests/cross_black.png')}
                style={{ width: 15, height: 15 }}
              />
            </TouchableOpacity>

            <ScrollView>
              <View
                style={{
                  marginTop: 50,
                  marginBottom: 20,
                  alignSelf: 'center',
                  width: '90%',
                }}>
                <Text style={styles.heading}>Create User</Text>

                <TextInput
                  placeholder={'Email'}
                  style={styles.inputBox}
                  keyboardType="email-address"
                  placeholderTextColor={'white'}
                  value={email}
                  autoCapitalize={false}
                  onChangeText={(text) => {
                    this.setState({ email: text });
                  }}
                />
                <TextInput
                  placeholder={'First name'}
                  style={styles.inputBox}
                  placeholderTextColor={'white'}
                  value={firstName}
                  onChangeText={(text) => {
                    this.setState({ firstName: text });
                  }}
                />
                <TextInput
                  placeholder={'Last name'}
                  style={styles.inputBox}
                  placeholderTextColor={'white'}
                  value={lastName}
                  onChangeText={(text) => {
                    this.setState({ lastName: text });
                  }}
                />
                <Picker
                  selectedValue={selectedRoleId}
                  style={{ marginBottom: 15 }}
                  itemStyle={styles.inputBox}
                  onValueChange={(value) =>
                    this.setState({ selectedRoleId: value })
                  }>
                  {roles.map((r) => (
                    <Picker.Item label={r.label} value={r.role_id} />
                  ))}
                </Picker>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.handleCreateUser()}>
                  <Text style={styles.buttonText}>Create</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '90%',
    width: '100%',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
  },
  crossButton: {
    position: 'absolute',
    top: 15,
    right: 20,
    zIndex: 100,
  },
  inputBox: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: Colors.blue,
    marginBottom: 10,
    color: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: 50,
  },
  button: {
    backgroundColor: Colors.orange,
    borderRadius: 10,
    padding: 15,
    width: 100,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});
