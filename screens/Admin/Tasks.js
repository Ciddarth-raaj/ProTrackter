import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl
} from 'react-native';

import Colors from '../../constants/colors';
import Styles from '../../constants/styles';
import TaskCard from '../../components/Admin/taskCard';
import FilterModal from '../../components/Admin/filterModal';
import AddTaskModal from '../../components/Admin/addTaskModal';
import API from '../../api';

export default class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterModalVisible: false,
      noFilter: true,
      addTaskModalVisible: false,
      title: 'Tasks',
      users: [],
      tasks: [],
      refreshing: false
    };
  }

  filterTasks = (status, val) => {
    const { tasks } = this.state;

    tasks.forEach((t) => {
      if (t.status == status) t.visible = val;
    });

    this.setState({ tasks: tasks, noFilter: false });
  };

  componentDidMount() {
    params = this.props.route.params;
    this.setState({ title: params.title });

    this.getUsers();
    this.getTasks(params.id);
  }

  setModalVisibility = (value) => {
    this.setState({ filterModalVisible: value });
  };

  setTaskModalVisible = (value) => {
    this.setState({ addTaskModalVisible: value });
  };

  clearFilter = () => {
    const { tasks } = this.state;

    tasks.forEach((t) => (t.visible = false));

    this.setState({
      tasks: tasks,
      noFilter: true,
      filterModalVisible: false,
    });
  };

  formatTasks(res) {
    const colors = [
      Colors.blue,
      Colors.orange,
      Colors.indigo,
      Colors.red,
      Colors.green,
      Colors.purple,
    ];

    let count = 0;
    const tasks = [];

    for (const task of res) {
      if (count >= colors.length) {
        count = 0;
      }
      tasks.push({
        id: task.task_id,
        title: task.title,
        assignedTo: task.first_name,
        visible: false,
        color: colors[count++],
        status: task.status,
        description: task.description,
        assignedToId: task.user_id,
        state: task.state,
        deadline: task.deadline_at
      });
    }

    return tasks;
  }

  getTasks = () => {
    id = this.props.route.params.id;
    API.get('/task/company?project_id=' + id)
      .then(async (res) => {
        if (res.data.code === 200) {
          console.log(res.data);
          tasks = this.formatTasks(res.data.tasks);
          this.setState({ tasks: tasks, refreshing: false });
        } else {
          alert(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  formatUsers(response) {
    const users = [];
    users.push({
      id: 0,
      name: 'Select an User',
    });
    for (const user of response) {
      users.push({
        id: user.user_id,
        name: user.first_name + ' ' + user.last_name,
      });
    }

    return users;
  }

  getUsers() {
    API.get('/user/company')
      .then(async (res) => {
        if (res.data.code === 200) {
          users = await this.formatUsers(res.data.users);
          this.setState({ users: users });
        } else {
          alert('Error Getting Users. Try Again Later');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  listHeader() {
    const { title } = this.state;
    const { navigation } = this.props;

    return (<View style={{ flexDirection: 'row' }}>
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
    </View>);
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.getTasks(this.props.route.id);
  }

  renderCards(t) {
    return (this.state.noFilter || t.visible) && (
      <TaskCard
        key={'task-' + t.id}
        id={t.id}
        title={t.title}
        assignedTo={t.assignedTo}
        color={t.color}
        status={t.status}
        description={t.description}
        users={this.state.users}
        assignedToId={t.assignedToId}
        state={t.state}
        deadline={t.deadline}
      />
    );
  }

  render() {
    const {
      tasks,
      filterModalVisible,
      addTaskModalVisible,
      users,
    } = this.state;
    const { navigation } = this.props;

    return (
      <>
        <SafeAreaView style={{ backgroundColor: Colors.notificationBar }} />

        <AddTaskModal
          visible={addTaskModalVisible}
          setVisible={this.setTaskModalVisible}
          projectId={this.props.route.params.id}
          users={users}
          getTasks={this.getTasks}
        />

        <FilterModal
          visible={filterModalVisible}
          setVisible={this.setModalVisibility}
          filterTasks={this.filterTasks}
          clearFilter={this.clearFilter}
        />

        <View style={{ backgroundColor: 'white', flex: 1 }}>
          <FlatList
            data={tasks}
            renderItem={({ item }) => this.renderCards(item)}
            keyExtractor={item => item.id}
            refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}
            contentContainerStyle={{ backgroundColor: Colors.background, padding: 10 }}
            ListHeaderComponent={this.listHeader()} />
        </View>

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
