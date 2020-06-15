import React from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';

import Colors from '../../constants/colors';
import Styles from '../../constants/styles';
import Header from '../../components/header';
import TaskCard from '../../components/taskCard';

import API from '../../api';
import util from '../../util/helper';

const types = {
  pending: {
    title: 'Pending',
    color: Colors.purple,
  },
  inprogress: {
    title: 'In Progress',
    color: Colors.blue,
  },
  new: {
    title: 'New',
    color: Colors.green,
  },
  overdue: {
    title: 'Overdue',
    color: Colors.red,
  },
};

export default class Tasks extends React.Component {
  constructor(props) {
    super(props);

    const type = this.props.route.params.tag;
    this.state = {
      title: types[type].title,
      color: types[type].color,
      tasks: [],
    };
  }

  componentDidMount() {
    const tag = this.props.route.params.tag;
    API.get(`/task/filter?${tag}=true`)
      .then((res) => {
        if (res.data.code === 200) {
          const tasks = util.formatResponse(res.data.tasks);
          this.setState({tasks: tasks});
        } else {
          alert(res.data.msg);
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  render() {
    const {title, color, tasks} = this.state;
    return (
      <>
        <SafeAreaView style={{backgroundColor: Colors.notificationBar}} />
        <ScrollView
          style={{flex: 1, backgroundColor: Colors.background, padding: 10}}>
          <Header isBack={true} navigation={this.props.navigation} />

          <Text style={[Styles.headingText, {color: color, marginTop: 10}]}>
            {title}
          </Text>
          <Text style={[Styles.headingText, {marginBottom: 10}]}>
            {'Today'}
          </Text>

          <View style={Styles.tasksWrapper}>
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
              />
            ))}
          </View>
        </ScrollView>
      </>
    );
  }
}
