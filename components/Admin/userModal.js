import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, Image, ScrollView } from 'react-native';

import Styles from '../../constants/styles';
import UserCard from './userCard';
import TaskCard from './taskCard';

import API from '../../api';
import utils from '../../util/helper';

export default class TaskModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: []
		};
	}

	UNSAFE_componentWillReceiveProps(newProps) {
		if (newProps.visible) {
			this.getTasks();
		}
	}

	getTasks() {
		const { id } = this.props;
		API.get('/task/user?userId=' + id)
			.then((res) => {
				if (res.data.code === 200) {
					const formattedTasks = utils.formatResponse(res.data.tasks);
					this.setState({ tasks: formattedTasks });
				}
			})
			.then(() => {});
	}

	render() {
		const { tasks } = this.state;

		const { visible, setVisible, color } = this.props;
		const { id, name, activeTasksCount } = this.props;
		return (
			<Modal
				animationType="slide"
				transparent={true}
				visible={visible}
				onRequestClose={() => {
					setVisible(false);
				}}
			>
				<View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
					<TouchableOpacity
						style={{ width: '100%', height: '10%', position: 'absolute', top: 0 }}
						onPress={() => setVisible(false)}
					/>
					<View style={[ styles.container, { backgroundColor: color } ]}>
						<TouchableOpacity style={styles.crossButton} onPress={() => setVisible(false)}>
							<Image source={require('../../assests/cross.png')} style={{ width: 15, height: 15 }} />
						</TouchableOpacity>

						<ScrollView style={{ marginTop: 40, paddingHorizontal: 15 }}>
							<UserCard
								id={id}
								name={name}
								tasks={tasks}
								type={'modal'}
								activeTasksCount={activeTasksCount}
							/>

							<Text style={[ styles.text, styles.heading, { marginBottom: 10 } ]}>Active Tasks</Text>

							<View style={[ Styles.tasksWrapper, { marginBottom: 10 } ]}>
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
										/>
									);
								})}
							</View>
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
		borderTopRightRadius: 30
	},
	crossButton: {
		position: 'absolute',
		top: 15,
		right: 20
	},
	text: {
		color: 'white'
	},
	heading: {
		fontWeight: 'bold',
		fontSize: 18
	}
});
