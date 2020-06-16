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
          this.setState({projects: projects});
        } else {
          alert(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  setProjectModalVisible = (value) => {
    this.setState({addProjectModalVisible: value});
  };

  renderCards(list) {
    return list.map((l) => (
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
    ));
  }

  render() {
    const {projects, addProjectModalVisible} = this.state;
    const {navigation} = this.props;

    return (
      <>
        <SafeAreaView style={{backgroundColor: Colors.notificationBar}} />

        <AddProjectModal
          visible={addProjectModalVisible}
          setVisible={this.setProjectModalVisible}
          getProjects={this.getProjects}
        />

        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={{flex: 1, backgroundColor: Colors.background, padding: 10}}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => navigation.pop()}
              style={{alignSelf: 'center', marginRight: 10}}>
              <Image
                source={require('../../assests/back.png')}
                style={styles.backButton}
              />
            </TouchableOpacity>
            <Text
              style={[Styles.headingText, {marginTop: 10, marginBottom: 10}]}>
              Projects
            </Text>
          </View>

          {this.renderCards(projects)}
        </ScrollView>
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
