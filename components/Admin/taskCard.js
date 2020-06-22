import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

import TaskModal from './taskModal';
import BottomMenu from '../../util/bottomMenu';
import API from '../../api';

export default function Header(props) {
  const statusImage = {
    INPROGRESS: require('../../assests/hourglass.png'),
    COMPLETED: require('../../assests/Tick.png'),
    CLOSED: require('../../assests/cross_red.png'),
    OVERDUE: require('../../assests/hourglass_red.png')
  };
  const { id, title, assignedTo, color, type, description } = props;
  const [visible, setVisible] = React.useState(false);
  const [isOptionsVisible, setOptionsVisible] = React.useState(false);
  const [status, setStatus] = React.useState(props.status);
  const [editable, setEditable] = React.useState(false);
  const [editableTitle, setEditableTitle] = React.useState(props.editable);

  changeState = (val) => {
    if (val == 'CLOSED') url = '/task/close';
    else url = '/task/open';

    API.patch(url, { taskId: id })
      .then(async (res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          setStatus(val);
        } else {
          alert(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <TouchableOpacity
      style={{ width: '100%' }}
      onPress={() => type != 'modal' && setVisible(true)}
      activeOpacity={type == 'modal' ? 1 : 0.8}
      onLongPress={() => type != 'modal' && setOptionsVisible(true)}>

      <BottomMenu
        visible={isOptionsVisible}
        setVisible={setOptionsVisible}
        options={
          [{ title: 'Edit', onPress: () => { setOptionsVisible(false); setEditable(true); setVisible(true); } },
          (status === 'INPROGRESS'
            ? { title: 'Close', onPress: () => changeState('CLOSED') }
            : { title: 'Reopen', onPress: () => changeState('INPROGRESS') })]
        }
      />

      <TaskModal
        visible={visible}
        setVisible={setVisible}
        color={color}
        title={title}
        assignedTo={assignedTo}
        description={description}
        status={status}
        id={id}
        editable={editable}
        setEditable={setEditable}
      />

      <View
        style={[
          styles.container,
          { backgroundColor: type === 'usermodal' ? 'white' : color },
          type == 'modal' && { paddingHorizontal: 0 },
        ]}>
        {type != 'modal' && (
          <Image
            source={require('../../assests/expand.png')}
            style={styles.expandImage}
          />
        )}
        <View style={{ paddingRight: 80 }}>

          {
            editableTitle
              ? <TextInput style={[
                styles.title,
                styles.containerText,
                type === 'usermodal' && { color: 'black' },
              ]}
                selectionColor={'white'}
                value={title}
                onChangeText={props.onTitleChange}
              />

              : <Text
                numberOfLines={type == 'modal' ? 0 : 1}
                style={[
                  styles.title,
                  styles.containerText,
                  type === 'usermodal' && { color: 'black' },
                ]}>
                {title}
              </Text>
          }

          <Text
            style={[
              styles.assignee,
              styles.containerText,
              { marginBottom: 0 },
              type === 'usermodal' && { color: 'black' },
            ]}>
            {assignedTo}
          </Text>
        </View>
        <View style={[styles.imageWrapper]}>
          <Image source={statusImage[status]} style={styles.image} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  containerText: {
    color: 'white',
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  product: {
    fontWeight: '500',
    fontSize: 14,
  },
  assignee: {
    fontWeight: '300',
    fontSize: 14,
  },
  image: {
    width: 40,
    height: 40,
  },
  imageWrapper: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    position: 'absolute',
    right: 20,
  },
  expandImage: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 20,
    height: 20,
  },
});
