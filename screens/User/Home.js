import React from 'react';
import {SafeAreaView, ScrollView, Text, View, StyleSheet} from 'react-native';

import Colors from '../../constants/colors';
import Header from '../../components/header';
import Styles from '../../constants/styles';
import HomeCard from '../../components/homeCard';
import TaskCard from '../../components/taskCard';
import API from '../../api';

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
          tag: 'inProgress',
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
      tasks: [],
    };
  }

  formatResponse(response) {
    const colors = [
      Colors.blue,
      Colors.orange,
      Colors.indigo,
      Colors.red,
      Colors.green,
      Colors.purple,
    ];

    const tasks = [];
    let count = 0;

    for (const task of response) {
      tasks.push({
        id: task.task_id,
        title: task.title,
        product: task.label,
        assignee: 'Ciddarth',
        color: colors[count++],
        description: task.description,
        status: task.status,
      });
      if (count == colors.length) count = 0;
    }
    return tasks;
  }

  componentDidMount() {
    this.getTaskStats();
    this.getTasks();
  }

  getTaskStats() {
    API.get('/task/stats')
      .then((res) => {
        if (res.data.code === 200) {
          const {items} = this.state;
          for (const key in items) {
            items[key].notificationCount = res.data.stats[key];
          }
          this.setState({items: items});
        }
      })
      .catch((err) => {});
  }

  getTasks() {
    API.get('/task/user')
      .then((res) => {
        if (res.data.code === 200) {
          const tasks = this.formatResponse(res.data.tasks);
          this.setState({tasks: tasks});
        } else {
          alert(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const {tasks, items} = this.state;
    return (
      <>
        <SafeAreaView style={{backgroundColor: Colors.notificationBar}} />
        <ScrollView
          style={{flex: 1, backgroundColor: Colors.background, padding: 10}}>
          <Header />
          <Text style={[Styles.headingText, {marginTop: 10}]}>Today</Text>
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

          <View style={[Styles.tasksWrapper, {marginBottom: 10}]}>
            {tasks.map((t) => (
              <TaskCard
                id={t.id}
                title={t.title}
                product={t.product}
                assignee={t.assignee}
                color={t.color}
                description={t.description}
                status={t.status}
                taskHistory={t.taskHistory}
              />
            ))}
          </View>
        </ScrollView>
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
});
