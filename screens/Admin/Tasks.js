import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import Colors from '../../constants/colors';
import Styles from '../../constants/styles';
import TaskCard from '../../components/Admin/taskCard';
import FilterModal from '../../components/Admin/filterModal';
import AddTaskModal from '../../components/Admin/addTaskModal';

export default class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterModalVisible: false,
      noFilter: true,
      addTaskModalVisible: false,
      title: 'Tasks',
      tasks: [
        {
          id: 1,
          title: 'Test',
          assignedTo: 'Ciddarth',
          color: Colors.blue,
          status: 'INPROGRESS',
          visible: false,
          description: 'This is test description',
          taskHistory: [
            {
              id: 1,
              title: 'Task3',
              date: 'Wed Jun 03 2020',
            },
            {
              id: 2,
              title: 'Task4',
              date: 'Wed Jun 03 2020',
            },
          ],
        },
        {
          id: 1,
          title: 'Test 123',
          assignedTo: 'Ciddarth',
          visible: false,
          color: Colors.orange,
          status: 'INPROGRESS',
          description: 'This is test description',
          taskHistory: [
            {
              id: 1,
              title: 'Task3',
              date: 'Wed Jun 03 2020',
            },
            {
              id: 2,
              title: 'Task4',
              date: 'Wed Jun 03 2020',
            },
          ],
        },
        {
          id: 1,
          title: 'Test 123',
          assignedTo: 'Ciddarth',
          visible: false,
          color: Colors.purple,
          status: 'COMPLETED',
          description: 'This is test description',
          taskHistory: [
            {
              id: 1,
              title: 'Task3',
              date: 'Wed Jun 03 2020',
            },
            {
              id: 2,
              title: 'Task4',
              date: 'Wed Jun 03 2020',
            },
          ],
        },
      ],
    };
  }

  filterTasks = (status, val) => {
    const { tasks } = this.state;

    tasks.forEach((t) => {
      if (t.status == status)
        t.visible = val;
    });

    this.setState({ tasks: tasks, noFilter: false });
  }

  componentDidMount() {
    params = this.props.route.params;
    this.setState({ title: params.title });
  }

  setModalVisibility = (value) => {
    this.setState({ filterModalVisible: value });
  };

  setTaskModalVisible = (value) => {
    this.setState({ addTaskModalVisible: value });
  };

  clearFilter = () => {
    const { tasks } = this.state;

    tasks.forEach((t) => t.visible = false)

    this.setState({
      tasks: tasks,
      noFilter: true,
      filterModalVisible: false,
    });
  };

  renderCards(list) {
    return list.map((t) => (
      (this.state.noFilter || t.visible) &&
      <TaskCard
        title={t.title}
        assignedTo={t.assignedTo}
        color={t.color}
        status={t.status}
        description={t.description}
        taskHistory={t.taskHistory}
      />
    ));
  }

  render() {
    const { tasks, filterModalVisible, addTaskModalVisible, title } = this.state;
    const { navigation } = this.props;

    return (
      <>
        <SafeAreaView style={{ backgroundColor: Colors.notificationBar }} />

        <AddTaskModal visible={addTaskModalVisible} setVisible={this.setTaskModalVisible} />

        <FilterModal
          visible={filterModalVisible}
          setVisible={this.setModalVisibility}
          filterTasks={this.filterTasks}
          clearFilter={this.clearFilter}
        />

        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={{ flex: 1, backgroundColor: Colors.background, padding: 10 }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => navigation.pop()}
              style={{ alignSelf: 'center', marginRight: 10 }}>
              <Image
                source={require('../../assests/back.png')}
                style={styles.backButton}
              />
            </TouchableOpacity>
            <Text
              style={[Styles.headingText, { marginTop: 10, marginBottom: 10 }]}>
              {title}
            </Text>
          </View>

          <View style={[Styles.tasksWrapper, { marginBottom: 10 }]}>
            {this.renderCards(tasks)}
          </View>

        </ScrollView>
        <TouchableOpacity
          style={[styles.addProjectButton, styles.floatingButton]}
          onPress={() => this.setTaskModalVisible(true)}>
          <Text style={styles.addProjectText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, styles.floatingButton]}
          onPress={() => this.setState({ filterModalVisible: true })}>
          <Image
            source={require('../../assests/filter.png')}
            style={styles.filterImage}
          />
        </TouchableOpacity>
      </>
    );
  }
}

const styles = StyleSheet.create({
  mainTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  backButton: {
    width: 20,
    height: 20,
  },
  newCard: {
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    backgroundColor: Colors.addGreen,
    borderRadius: 10,
    marginBottom: 10,
  },
  newCardText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  expandText: {
    color: Colors.darkBlue,
    marginBottom: 20,
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
  addProjectButton: {
    backgroundColor: 'white',
    position: 'absolute',
    right: 10,
    bottom: 30,
  },
  addProjectText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 40,
    paddingBottom: 3,
    color: Colors.addGreen,
  },
  filterButton: {
    backgroundColor: Colors.blue,
    position: 'absolute',
    left: 10,
    bottom: 30,
  },
  filterImage: {
    width: 30,
    height: 30,
    alignSelf: 'center',
    marginTop: 5,
  },
});
