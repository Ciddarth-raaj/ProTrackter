import React from 'react';
import { SafeAreaView, ScrollView, Text, View, FlatList, RefreshControl } from 'react-native';

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
      refreshing: false
    };
  }

  getTasks() {
    const tag = this.props.route.params.tag;
    API.get(`/task/filter?${tag}=true`)
      .then((res) => {
        if (res.data.code === 200) {
          console.log(res.data.tasks);
          const tasks = util.formatResponse(res.data.tasks);
          this.setState({ tasks: tasks, refreshing: false });
        } else {
          alert(res.data.msg);
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  componentDidMount() {
    this.getTasks();
  }

  renderCards(t) {
    return (
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
    )
  }

  listHeader() {
    const { title, color } = this.state;
    return (
      <>
        <Header isBack={true} navigation={this.props.navigation} />

        <Text style={[Styles.headingText, { color: color, marginTop: 10 }]}>
          {title}
        </Text>
        <Text style={[Styles.headingText, { marginBottom: 10 }]}>
          {'Today'}
        </Text>
      </>
    )
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.getTasks();
  }

  render() {
    const { title, color, tasks, refreshing } = this.state;
    return (
      <>
        <SafeAreaView style={{ backgroundColor: Colors.notificationBar }} />

        <View style={{ backgroundColor: 'white', flex: 1 }}>
          <FlatList
            data={tasks}
            renderItem={({ item }) => this.renderCards(item)}
            keyExtractor={item => item.id}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />}
            contentContainerStyle={{ backgroundColor: Colors.background, padding: 10 }}
            ListHeaderComponent={this.listHeader()} />
        </View>
      </>
    );
  }
}
