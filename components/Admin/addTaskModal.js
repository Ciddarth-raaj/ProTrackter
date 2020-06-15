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
} from 'react-native';

import Colors from '../../constants/colors';
import API from '../../api';

export default class AddTaskModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      projects: [],
      users: [],
      deadline: new Date(),
    };
  }

  componentDidMount() {
    this.getUsers();
    this.getProjects();
  }

  getUsers() {
    API.get('/user/company')
      .then((res) => {
        if (res.data.code === 200) {
          this.setState({users: res.data.users});
        }
      })
      .catch((err) => {});
  }

  getProjects() {
    API.get('/project')
      .then((res) => {
        if (res.data.code === 200) {
          this.setState({projects: res.data.project});
        }
      })
      .catch((err) => {});
  }

  handleCreateProject() {
    if (title === '') {
      alert('Enter Title to Continue');
    } else {
      createProject(title, description);
    }
  }

  createProject(title, description) {
    API.post('/task', {label: title, description: description})
      .then(async (res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          setTitle('');
          setDescription('');
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
    const {title, description, projects, users, deadline} = this.state;
    const {visible, setVisible} = props;
    return (
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
          <TouchableOpacity
            style={{width: '100%', height: '10%', position: 'absolute', top: 0}}
            onPress={() => setVisible(false)}
          />

          <View style={[styles.container]}>
            <TouchableOpacity
              style={styles.crossButton}
              onPress={() => setVisible(false)}>
              <Image
                source={require('../../assests/cross_black.png')}
                style={{width: 15, height: 15}}
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
                <Text style={styles.heading}>Create Task</Text>

                <TextInput
                  placeholder={'Project Title'}
                  style={styles.inputBox}
                  placeholderTextColor={'white'}
                  value={title}
                  onChangeText={setTitle}
                />

                <TextInput
                  placeholder={'Description'}
                  style={[styles.inputBox, {height: 260, paddingTop: 20}]}
                  placeholderTextColor={'white'}
                  multiline={true}
                  value={description}
                  onChangeText={setDescription}
                />

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleCreateProject()}>
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
