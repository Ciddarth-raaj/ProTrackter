import React from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text, View, RefreshControl, TouchableOpacity, Image } from 'react-native';

import Colors from '../../constants/colors';
import Styles from '../../constants/styles';
import Header from '../../components/header';
import TaskCard from '../../components/taskCard';
import FilterModal from '../../components/filterModal';

import API from '../../api';

export default class Tasks extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            tasks: [],
            filters: {
                INPROGRESS: {
                    title: 'In Progress',
                    selected: false,
                    key: 'INPROGRESS'
                },
                PENDING: {
                    title: 'Pending',
                    selected: false,
                    key: 'PENDING'
                },
                NEW: {
                    title: 'New',
                    selected: false,
                    key: 'NEW'
                },
                OVERDUE: {
                    title: 'Overdue',
                    selected: false,
                    key: 'OVERDUE'
                },
                CLOSED: {
                    title: 'Closed',
                    selected: false,
                    key: 'CLOSED'
                }
            },
            filter: false,
            filterModal: false,
            refreshing: false
        };
    }

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
                product: this.state.title,
                assignee: task.first_name
            });
        }

        return tasks;
    }

    getTasks(id) {
        API.get('/task/company?project_id=' + id)
            .then(async (res) => {
                if (res.data.code === 200) {
                    const tasks = this.formatTasks(res.data.tasks);
                    this.setState({ tasks: tasks, refreshing: false });
                } else {
                    alert(res.data.msg);
                    this.setState({ refreshing: false })
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    componentDidMount() {
        const params = this.props.route.params;
        this.setState({ title: params.title });
        this.getTasks(params.id);
    }

    renderCards(t) {
        const { filters, filter } = this.state;
        return (
            (!filter || filters[t.status].selected) && <TaskCard
                key={'task-' + t.id}
                id={t.id}
                title={t.title}
                product={t.product}
                assignee={t.assignee}
                color={t.color}
                description={t.description}
                state={t.state}
                status={t.status}
                product={t.product}
            />
        )
    }

    listHeader() {
        const { title, color } = this.state;
        return (
            <>
                <Header isBack={true} navigation={this.props.navigation} />

                <Text style={[Styles.headingText, { color: color, marginTop: 10, marginBottom: 10 }]}>
                    {title}
                </Text>
            </>
        )
    }

    selectFilter = (key, val) => {
        const { filters } = this.state;

        filters[key].selected = val;
        this.setState({ filters: filters, filter: true });
    }

    onRefresh = () => {
        this.setState({ refreshing: true });
        this.getTasks();
    }

    clearFilter = () => {
        const { filters } = this.state;

        Object.keys(filters).forEach(i => (filters[i].selected = false))
        this.setState({ filter: false, filters: filters });
    }

    render() {
        const { tasks, filterModal, refreshing, filters } = this.state;
        const { navigation } = this.state;

        return (
            <>
                <SafeAreaView style={{ backgroundColor: Colors.notificationBar }} />

                <FilterModal visible={filterModal} setVisible={v => this.setState({ filterModal: v })} filters={filters} selectFilter={this.selectFilter} clearFilter={() => this.clearFilter()} />

                <View style={{ backgroundColor: 'white', flex: 1 }}>
                    <FlatList
                        data={tasks}
                        renderItem={({ item }) => this.renderCards(item)}
                        keyExtractor={item => item.id}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />}
                        contentContainerStyle={{ backgroundColor: Colors.background, padding: 10 }}
                        ListHeaderComponent={this.listHeader()} />
                </View>

                <TouchableOpacity
                    style={[styles.filterButton, styles.floatingButton]}
                    onPress={() => this.setState({ filterModal: true })}>
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

