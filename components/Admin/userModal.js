import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal,
    Image,
    ScrollView,
} from 'react-native';
import moment from 'moment';
import DatePicker from '@react-native-community/datetimepicker';

import Styles from '../../constants/styles';
import UserCard from './userCard';
import TaskCard from './taskCard';

import API from '../../api';
import utils from '../../util/helper';

export default class TaskModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            allUserLog: [],
            userLog: [],
            date: new Date(),
            selectDateVisibility: false,
        };
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        if (newProps.visible) {
            this.getTasks();
            this.getUserLog();
        }
    }

    getTasks() {
        const {id} = this.props;
        API.get('/task/user?userId=' + id)
            .then((res) => {
                if (res.data.code === 200) {
                    const formattedTasks = utils.formatResponse(res.data.tasks);
                    this.setState({tasks: formattedTasks});
                }
            })
            .then(() => {});
    }

    formatResponse(response) {
        const logs = [];
        for (const log of response) {
            logs.push({
                label: log.label,
                time: log.created_at,
                by_admin: log.by_admin,
            });
        }
        return logs;
    }

    getUserLog() {
        const {id} = this.props;
        API.get('/user/status_history?userId=' + id)
            .then((res) => {
                console.log(res.data);
                if (res.data.code === 200) {
                    const formattedLogs = this.formatResponse(
                        res.data.reocords,
                    );
                    this.setState({allUserLog: formattedLogs});
                    this.sortLog(this.state.date);
                }
            })
            .then(() => {});
    }

    sortLog(date) {
        const {allUserLog} = this.state;
        const timeLog = [];

        allUserLog.forEach((l) => {
            if (new Date(l.time).getDate() === date.getDate()) timeLog.push(l);
        });

        this.setState({userLog: timeLog});
    }

    changeDate(e, date) {
        this.setState({
            selectDateVisibility: false,
            date: date,
        });
        this.sortLog(date);
    }

    render() {
        const {tasks, userLog, date, selectDateVisibility} = this.state;

        const {
            visible,
            setVisible,
            color,
            id,
            name,
            activeTasksCount,
            showLog,
            showTasks,
        } = this.props;
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    setVisible(false);
                }}>
                <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
                    <TouchableOpacity
                        style={{
                            width: '100%',
                            height: '10%',
                            position: 'absolute',
                            top: 0,
                        }}
                        onPress={() => setVisible(false)}
                    />
                    <View style={[styles.container, {backgroundColor: color}]}>
                        <TouchableOpacity
                            style={styles.crossButton}
                            onPress={() => setVisible(false)}>
                            <Image
                                source={require('../../assests/cross.png')}
                                style={{width: 15, height: 15}}
                            />
                        </TouchableOpacity>

                        <ScrollView
                            style={{marginTop: 40, paddingHorizontal: 15}}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}>
                            <UserCard
                                id={id}
                                name={name}
                                tasks={tasks}
                                type={'modal'}
                                activeTasksCount={activeTasksCount}
                            />

                            {showTasks && (
                                <View>
                                    <Text
                                        style={[
                                            styles.text,
                                            styles.heading,
                                            {marginBottom: 10},
                                        ]}>
                                        Active Tasks
                                    </Text>

                                    <View
                                        style={[
                                            Styles.tasksWrapper,
                                            {marginBottom: 10},
                                        ]}>
                                        {tasks.map((t) => {
                                            return (
                                                <TaskCard
                                                    title={t.title}
                                                    assignedTo={t.assignedTo}
                                                    color={t.color}
                                                    status={t.status}
                                                    description={t.description}
                                                    type={'usermodal'}
                                                    key={'task-' + t.id}
                                                    id={t.id}
                                                    state={t.state}
                                                    deadline={t.deadline}
                                                />
                                            );
                                        })}
                                    </View>
                                </View>
                            )}

                            {showLog && (
                                <View>
                                    <Text
                                        style={[
                                            styles.text,
                                            styles.heading,
                                            {marginBottom: 10},
                                        ]}>
                                        Status History
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() =>
                                            this.setState({
                                                selectDateVisibility: true,
                                            })
                                        }
                                        style={styles.button}>
                                        <Text>
                                            {'Select Date - ' +
                                                moment(date).format('DD MMM')}
                                        </Text>
                                    </TouchableOpacity>

                                    {selectDateVisibility && (
                                        <DatePicker
                                            style={{width: 200}}
                                            value={date}
                                            mode="date"
                                            display="spinner"
                                            placeholder="Select Date"
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
                                            onChange={(e, date) => {
                                                this.changeDate(e, date);
                                            }}
                                        />
                                    )}

                                    {userLog.length === 0 ? (
                                        <Text
                                            style={[
                                                styles.text,
                                                {textAlign: 'center'},
                                            ]}>
                                            {'No Records Found'}
                                        </Text>
                                    ) : (
                                        userLog.map((l) => (
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    marginBottom: 10,
                                                }}>
                                                <Text
                                                    style={[
                                                        styles.text,
                                                        {
                                                            fontWeight: 'bold',
                                                            marginRight: 10,
                                                        },
                                                    ]}>{`${moment(
                                                    new Date(l.time),
                                                ).format('hh:mm A')}`}</Text>
                                                <Text
                                                    style={[
                                                        styles.text,
                                                        l.by_admin && {
                                                            color: 'red',
                                                        },
                                                    ]}>
                                                    {l.label === 'Online'
                                                        ? 'Logged In'
                                                        : 'Logged Out'}
                                                </Text>
                                            </View>
                                        ))
                                    )}
                                </View>
                            )}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '90%',
        width: '100%',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    crossButton: {
        position: 'absolute',
        top: 15,
        right: 20,
    },
    text: {
        color: 'white',
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    button: {
        backgroundColor: 'white',
        padding: 10,
        width: '80%',
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 10,
    },
});
