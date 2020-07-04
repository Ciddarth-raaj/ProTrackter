import React from 'react';
import { SafeAreaView, ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import Header from '../../components/header';
import Styles from '../../constants/styles';
import HomeCard from '../../components/homeCard';
import TaskCard from '../../components/taskCard';
import AddTaskModal from '../../components/addTaskModal';

import API from '../../api';
import util from '../../util/helper';
import Colors from '../../constants/colors';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {
        pending: {
          title: 'Pending',
          image: require('../../assests/clock.png'),
          color: Colors.purple,
          lightColor: Colors.purpleLight,
          notificationCount: 0,
          tag: 'pending',
        },
        inprogress: {
          title: 'In Progress',
          image: require('../../assests/refresh.png'),
          color: Colors.blue,
          lightColor: Colors.blueLight,
          notificationCount: 0,
          tag: 'inprogress',
        },
        new: {
          title: 'New',
          image: require('../../assests/new.png'),
          color: Colors.green,
          lightColor: Colors.greenLight,
          notificationCount: 0,
          tag: 'new',
        },
        overdue: {
          title: 'Overdue',
          image: require('../../assests/warning.png'),
          color: Colors.red,
          lightColor: Colors.redLight,
          notificationCount: 0,
          tag: 'overdue',
        },
      },
      projects: [],
      taskModal: false,
      tasks: [],
    };
  }

  componentDidMount() {
    this.onFocus = this.props.navigation.addListener('focus', () => {
      this.getTaskStats();
    });

    this.getTasks();
    this.getProjects();
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus', this.onFocus);
  }

  getTaskStats() {
    API.get('/task/stats')
      .then((res) => {
        if (res.data.code === 200) {
          const { items } = this.state;
          for (const key in items) {
            items[key].notificationCount = res.data.stats[key];
          }
          this.setState({ items: items });
        }
      })
      .catch((err) => { });
  }

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

  formatProjects(response) {
    const projects = [];
    projects.push({
      id: 0,
      name: 'Select a Project'
    });

    for (const project of response) {
      projects.push({
        id: project.project_id,
        name: project.label,
      });
    }

    return projects;
  }

  getTasks() {
    API.get('/task/filter?overdue=true&new=true&inprogress=true')
      .then((res) => {
        if (res.data.code === 200) {
          const tasks = util.formatResponse(res.data.tasks);
          this.setState({ tasks: tasks });
        } else {
          alert(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setTaskModal = (val) => {
    this.setState({ taskModal: val });
  }

  getProjects = () => {
    API.get('/project')
      .then((res) => {
        // console.log(res.data.projects);
        if (res.data.code === 200) {
          const projects = this.formatProjects(res.data.projects);
          this.setState({ projects: projects });
        } else {
          alert(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { tasks, items, projects, taskModal } = this.state;
    const { navigation } = this.props;
    return (
      <>
        <SafeAreaView style={{ backgroundColor: Colors.notificationBar }} />

        <AddTaskModal
          visible={taskModal}
          setVisible={this.setTaskModal}
          projects={projects}
          getTasks={this.getTasks}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, backgroundColor: Colors.background, padding: 10 }}>

          <Header navigation={navigation} />

          <Text style={[Styles.headingText, { marginTop: 10 }]}>Today</Text>

          <View style={styles.cardWrapper}>
            {Object.keys(items).map((i) => (
              <HomeCard
                title={items[i].title}
                lightColor={items[i].lightColor}
                color={items[i].color}
                image={items[i].image}
                notificationCount={items[i].notificationCount}
                tag={items[i].tag}
                key={i}
                navigation={this.props.navigation}
              />
            ))}
          </View>

          <View style={[Styles.tasksWrapper, { marginBottom: 10 }]}>
            {tasks.map((t) => (
              <TaskCard
                key={'task-' + t.id}
                id={t.id}
                title={t.title}
                product={t.product}
                assignee={t.assignee}
                color={t.color}
                description={t.description}
                state={t.state}
                status={t.status}
                taskHistory={t.taskHistory}
              />
            ))}
          </View>

        </ScrollView>

        <TouchableOpacity
          style={[styles.addTaskButton, styles.floatingButton]}
          onPress={() => this.setTaskModal(true)}>
          <Text style={styles.addTaskText}>+</Text>
        </TouchableOpacity>
      </>
    );
  }
}

const styles = StyleSheet.create({
  cardWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 10,
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
  addTaskButton: {
    backgroundColor: 'white',
    position: 'absolute',
    right: 10,
    bottom: 30,
  },
  addTaskText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 40,
    paddingBottom: 3,
    color: Colors.addGreen,
  },
});
