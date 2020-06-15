import React from 'react';
import { SafeAreaView, ScrollView, Text, View, StyleSheet } from 'react-native';

import Header from '../../components/header';
import Styles from '../../constants/styles';
import HomeCard from '../../components/homeCard';
import TaskCard from '../../components/taskCard';

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
      tasks: [],
    };
  }

  componentDidMount() {
    this.getTaskStats();
    this.getTasks();
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

  getTasks() {
    API.get('/task/filter')
      .then((res) => {
        console.log(res.data.tasks);
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

  render() {
    const { tasks, items } = this.state;
    return (
      <>
        <SafeAreaView style={{ backgroundColor: Colors.notificationBar }} />
        <ScrollView
          style={{ flex: 1, backgroundColor: Colors.background, padding: 10 }}>
          <Header />
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
