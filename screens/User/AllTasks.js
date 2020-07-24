import React from 'react';
import { StyleSheet } from 'react-native';

import Colors from '../../constants/colors';
import Styles from '../../constants/styles';
import Header from '../../components/header';
import TaskCard from '../../components/taskCard';
// import FilterModal from '../../components/filterModal';

import API from '../../api';
import util from '../../util/helper';

export default class Tasks extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: 'Project 1',
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
            filterModal: false
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
                assignedToId: task.user_id ?? 3
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
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    componentDidMount() {
        const loggedIn = localStorage.getItem('token');
        if (loggedIn === 'null') {
            alert('Login to Continue!');
            this.props.history.push('/');
            window.location.href = window.location.href;
        }
        else {
            const id = this.props.location.state.id;
            this.setState({ title: this.props.location.state.title });
            this.getTasks(id);
        }
    }

    selectFilter = (key, val) => {
        const { filters } = this.state;

        filters[key].selected = val;
        this.setState({ filters: filters, filter: true });
    }

    render() {
        const { title, tasks, filters, filter, filterModal } = this.state;

        return (
            <View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    cardWrapper: {
        marginBottom: 10
    },
    filterImg: {
        width: 30,
        height: 30,
        marginTop: 15
    },
})
