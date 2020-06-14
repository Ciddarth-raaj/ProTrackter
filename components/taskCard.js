import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';

import TaskModal from '../components/taskModal';
import BottomMenu from '../util/bottomMenu';
import API from '../api';

const statusImage = {
  INPROGRESS: require('../assests/hourglass.png'),
  COMPLETED: require('../assests/Tick.png'),
  3: require('../assests/hourglass_red.png'),
};

export default class TaskCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOptionsVisible: false,
      isModalVisible: false,
      taskState: this.props.state,
    };
  }

  setTaskState(state) {
    const {id} = this.props;

    API.patch('/task/state', {taskId: id, state: state})
      .then(async (res) => {
        if (res.data.code === 200) {
          this.setState({taskState: state, isOptionsVisible: false});
        } else {
          alert(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const {taskState, isOptionsVisible, isModalVisible} = this.state;

    const {
      id,
      title,
      product,
      assignee,
      color,
      status,
      type,
      description,
    } = this.props;

    const options = [];

    if (taskState === 'STOP') {
      options.push({
        title: 'Start',
        onPress: () => {
          this.setTaskState('START');
        },
      });
    } else {
      options.push({
        title: 'Stop',
        onPress: () => {
          this.setTaskState('STOP');
        },
      });
    }

    return (
      <TouchableOpacity
        style={{width: '100%'}}
        onPress={() => type != 'modal' && this.setState({isModalVisible: true})}
        activeOpacity={type == 'modal' ? 1 : 0.8}
        onLongPress={() => this.setState({isOptionsVisible: true})}>
        <BottomMenu
          visible={isOptionsVisible}
          setVisible={(isVisible) => {
            this.setState({isOptionsVisible: isVisible});
          }}
          options={options}
        />

        <TaskModal
          taskId={id}
          visible={isModalVisible}
          setVisible={(isVisible) => {
            this.setState({isModalVisible: isVisible});
          }}
          color={color}
          title={title}
          product={product}
          assignee={assignee}
          description={description}
          //taskHistory={taskHistory}
          status={status}
        />

        <View
          style={[
            styles.container,
            {backgroundColor: color},
            type == 'modal' && {padding: 0},
          ]}>
          {type != 'modal' && (
            <Image
              source={require('../assests/expand.png')}
              style={styles.expandImage}
            />
          )}
          <View style={{paddingRight: 80}}>
            <Text
              numberOfLines={type == 'modal' ? 0 : 1}
              style={[styles.title, styles.containerText]}>
              {title}
            </Text>
            <Text style={[styles.product, styles.containerText]}>
              {product}
            </Text>
            <Text
              style={[
                styles.assignee,
                styles.containerText,
                {marginBottom: 0},
              ]}>
              {assignee}
            </Text>
          </View>
          <View style={styles.imageWrapper}>
            <Image source={statusImage[status]} style={styles.image} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  containerText: {
    color: 'white',
    marginBottom: 5,
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
