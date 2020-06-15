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
// import FilterModal from '../../components/Admin/filterModal';
import AddProjectModal from '../../components/Admin/addProjectModal';

export default class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'Product',
      filterModalVisible: false,
      noFilter: true,
      addProjectModalVisible: false,
      projects: [
        {
          id: 1,
          title: 'Project 1',
          description: 'Thi is test desc'
        },
        {
          id: 1,
          title: 'Project 1',
          description: 'Thi is test desc'
        },
        {
          id: 1,
          title: 'Project 1',
          description: 'Thi is test desc'
        },
        {
          id: 1,
          title: 'Project 1',
          description: 'Thi is test desc'
        }
      ],
    };
  }

  formatResponse = () => {
    const colors = [
      Colors.blue,
      Colors.orange,
      Colors.indigo,
      Colors.red,
      Colors.green,
      Colors.purple,
    ];
  }

  setModalVisibility = (value) => {
    this.setState({ filterModalVisible: value });
  };

  setProjectModalVisible = (value) => {
    this.setState({ addProjectModalVisible: value });
  };

  setProjectVisible = (id, value) => {
    const { projects } = this.state;

    for (i = 0; i < projects.length; i++) {
      if (projects[i].id == id) {
        projects[i].visible = value;
        break;
      }
    }

    this.setState({ projects: projects, noFilter: false });
  };

  clearFilter = () => {
    const { projects } = this.state;

    for (i = 0; i < projects.length; i++) {
      projects[i].visible = false;
    }

    this.setState({
      projects: projects,
      noFilter: true,
      filterModalVisible: false,
    });
  };

  renderCards(list) {
    return list.map((l) => (
      <>
        {(this.state.noFilter || l.visible) && (
          <ProjectCard id={l.id} title={l.title} description={l.description} navigation={this.props.navigation} color={Colors.blue} />
        )}
      </>
    ));
  }

  render() {
    const { projects, filterModalVisible, addProjectModalVisible } = this.state;
    const { navigation } = this.props;

    return (
      <>
        <SafeAreaView style={{ backgroundColor: Colors.notificationBar }} />

        <AddProjectModal
          visible={addProjectModalVisible}
          setVisible={this.setProjectModalVisible}
        />

        {/* <FilterModal
          visible={filterModalVisible}
          setVisible={this.setModalVisibility}
          projects={projects}
          setProjectVisible={this.setProjectVisible}
          clearFilter={this.clearFilter}
        /> */}

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

        {/* <TouchableOpacity
          style={[styles.filterButton, styles.floatingButton]}
          onPress={() => this.setState({ filterModalVisible: true })}>
          <Image
            source={require('../../assests/filter.png')}
            style={styles.filterImage}
          />
        </TouchableOpacity> */}
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
  // newCard: {
  //   width: '100%',
  //   padding: 10,
  //   justifyContent: 'center',
  //   backgroundColor: Colors.addGreen,
  //   borderRadius: 10,
  //   marginBottom: 10,
  // },
  // newCardText: {
  //   color: 'white',
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
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
  // filterButton: {
  //   backgroundColor: Colors.blue,
  //   position: 'absolute',
  //   left: 10,
  //   bottom: 30,
  // },
  // filterImage: {
  //   width: 30,
  //   height: 30,
  //   alignSelf: 'center',
  //   marginTop: 5,
  // },
});
