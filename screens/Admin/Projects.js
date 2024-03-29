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
import ProjectCard from '../../components/Admin/projectCard';
import AddProjectModal from '../../components/Admin/addProjectModal';
import API from '../../api';

export default class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'Product',
      filterModalVisible: false,
      noFilter: true,
      addProjectModalVisible: false,
      projects: [],
      refreshing: false
    };
  }

  componentDidMount() {
    this.getProjects();
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

    const projects = [];
    let count = 0;

    for (const project of response) {
      if (count >= colors.length) {
        count = 0;
      }

      projects.push({
        id: project.project_id,
        title: project.label,
        description: project.description,
        color: colors[count++],
      });
    }

    return projects;
  }

  getProjects = () => {
    API.get('/project')
      .then((res) => {
        // console.log(res.data.projects);
        if (res.data.code === 200) {
          const projects = this.formatResponse(res.data.projects);
          this.setState({ projects: projects, refreshing: false });
        } else {
          alert(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  setProjectModalVisible = (value) => {
    this.setState({ addProjectModalVisible: value });
  };

  renderCards(l) {
    return (
      <>
        {(this.state.noFilter || l.visible) && (
          <ProjectCard
            key={'project-' + l.id}
            id={l.id}
            title={l.title}
            description={l.description}
            navigation={this.props.navigation}
            color={l.color}
          />
        )}
      </>
    );
  }

  listHeader() {
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
        Projects
  </Text>
    </View>)
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.getProjects();
  }

  render() {
    const { projects, addProjectModalVisible, refreshing } = this.state;
    const { navigation } = this.props;

    return (
      <>
        <SafeAreaView style={{ backgroundColor: Colors.notificationBar }} />

        <AddProjectModal
          visible={addProjectModalVisible}
          setVisible={this.setProjectModalVisible}
          getProjects={this.getProjects}
        />

        <View style={{ backgroundColor: 'white', flex: 1 }}>
          <FlatList
            data={projects}
            renderItem={({ item }) => this.renderCards(item)}
            keyExtractor={item => item.id}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />}
            contentContainerStyle={{ backgroundColor: Colors.background, padding: 10 }}
            ListHeaderComponent={this.listHeader()} />
        </View>

        <TouchableOpacity
          style={[styles.addProjectButton, styles.floatingButton]}
          onPress={() => this.setProjectModalVisible(true)}>
          <Text style={styles.addProjectText}>+</Text>
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
});
