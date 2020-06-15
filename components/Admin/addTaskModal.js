import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  TextInput,
  Picker,
} from 'react-native';
import DatePicker from 'react-native-datepicker';

import Colors from '../../constants/colors';
import API from '../../api';

export default function AddTaskModal(props) {
  const {visible, setVisible, projectId, users, getTasks} = props;
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [userId, setUserId] = React.useState(0);
  const [date, setDate] = React.useState();

  handleCreateProject = () => {
    if (title === '' || description === '' || userId === 0) {
      alert('Enter All Fields to Continue');
    } else {
      createTask(title, description, projectId, userId, date);
    }
  };

  createTask = (title, description, projectId, userId, deadline) => {
    console.log(deadline);
    API.post(
      '/task',
      deadline === undefined
        ? {
            title: title,
            description: description,
            projectId: projectId,
            userId: userId,
          }
        : {
            title: title,
            description: description,
            projectId: projectId,
            userId: userId,
            deadlineAt: new Date(deadline),
          },
    )
      .then(async (res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          setTitle('');
          setDescription('');
          setUserId(0);
          setDate();
          alert('Successfully Created');
          getTasks();
          // setVisible(false);
        } else {
          alert(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
                placeholder={'Task Title'}
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

              <Picker
                selectedValue={userId}
                itemStyle={styles.inputBox}
                onValueChange={setUserId}>
                {users.map((u) => (
                  <Picker.Item label={u.name} value={u.id} />
                ))}
              </Picker>

              <View style={{alignItems: 'center', marginBottom: 15}}>
                <View style={{flexDirection: 'row'}}>
                  <DatePicker
                    style={{width: 200}}
                    date={date}
                    mode="date"
                    placeholder="Select Date (Optional)"
                    format="DD-MM-YYYY"
                    minDate={new Date()}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    showIcon={false}
                    customStyles={{
                      dateInput: {
                        marginTop: 0,
                        borderColor: Colors.blue,
                        borderWidth: 2,
                        borderRadius: 10,
                      },
                    }}
                    onDateChange={(date) => {
                      setDate(date);
                    }}
                  />

                  <TouchableOpacity
                    style={{alignSelf: 'center', marginLeft: 10}}
                    onPress={() => setDate('')}>
                    <Text style={{color: Colors.grey}}>Clear</Text>
                  </TouchableOpacity>
                </View>
              </View>

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
