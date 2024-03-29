import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, Image, ScrollView, TextInput } from 'react-native';
import DatePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import Colors from '../../constants/colors';
import Styles from '../../constants/styles';
import TaskCard from './taskCard';
import API from '../../api';

const DATE_FORMAT = 'DD-MM-YYYY hh:mm:ss';

export default class TaskModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			taskHistory: [],
			description: props.description,
			title: props.title,
			id: props.id,
			selectedUserId: undefined,
			dateVisibility: false,
			timeVisibility: false,
			date: undefined,
			time: undefined
		};
	}

	setDateTime() {
		const date = moment(this.props.deadline).format('MM-DD-YYYY');
		const time = moment(this.props.deadline).format('hh:mm:ss');
		this.setState({
			date: new Date(date),
			time: time
		});

		console.log(this.state.date + ' - Date');
		console.log(time + ' - Time\n\n');
	}

	getTaskHistory() {
		API.get('/taskprogress?taskId=' + this.props.id)
			.then((res) => {
				if (res.data.code === 200) {
					this.setState({ taskHistory: res.data.tasks });
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	UNSAFE_componentWillReceiveProps(newProps) {
		if (newProps.visible) {
			this.getTaskHistory();
		}

		if (newProps.editable) {
			this.setState({
				date: newProps.deadline,
				time: newProps.deadline,
				selectedUserId: newProps.assignedToId
			});
		}
	}

	updateTask = () => {
		const { id, title, description, selectedUserId, date, time } = this.state;

		let dateObj = undefined;
		dateObj = new Date(moment(date).format('YYYY-MM-DD') + 'T' + moment(time).format('hh:mm:ss'));

		const params = { taskId: id, title: title, description: description, assignedTo: selectedUserId };

		if (dateObj) {
			params.deadlineAt = moment(dateObj, DATE_FORMAT).toDate();
		}

		API.put('/task', params)
			.then((res) => {
				if (res.data.code === 200) {
					alert('Successfully Updated!');
					this.props.setEditable(false);
				} else {
					alert(res.data.msg);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	render() {
		const { taskHistory, selectedUserId, dateVisibility, timeVisibility, date, time } = this.state;

		const { visible, setVisible, color, state, deadline } = this.props;
		const { title, product, assignedTo, description, status, editable } = this.props;

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
						onPress={() => {
							this.props.setEditable(false);
							setVisible(false);
						}}
					/>
					<View style={[ styles.container, { backgroundColor: color } ]}>
						<TouchableOpacity
							style={styles.crossButton}
							onPress={() => {
								this.props.setEditable(false);
								setVisible(false);
							}}
						>
							<Image source={require('../../assests/cross.png')} style={{ width: 15, height: 15 }} />
						</TouchableOpacity>

						<ScrollView
							style={{ marginTop: 40, paddingHorizontal: 15 }}
							showsHorizontalScrollIndicator={false}
							showsVerticalScrollIndicator={false}
						>
							<TaskCard
								title={this.state.title}
								product={product}
								assignedTo={assignedTo}
								color={color}
								type={'modal'}
								status={status}
								editable={editable}
								onTitleChange={(v) => this.setState({ title: v })}
								selectedUserId={selectedUserId}
								setUserId={(userId) => {
									this.setState({ selectedUserId: userId });
								}}
								users={this.props.users}
								assignedToId={this.props.assignedToId}
								state={state}
							/>

							{editable ? (
								<TextInput
									style={[ styles.text ]}
									multiline
									value={this.state.description}
									onChangeText={(v) => this.setState({ description: v })}
									selectionColor={'white'}
								/>
							) : (
								<Text style={[ styles.text ]}>{this.state.description}</Text>
							)}

							{editable && (
								<View>
									<TouchableOpacity
										onPress={() => this.setState({ dateVisibility: true })}
										style={[
											styles.button,
											{ backgroundColor: 'white', width: 200, marginBottom: 10 }
										]}
									>
										<Text style={[ styles.buttonText ]}>{'Select Date'}</Text>
									</TouchableOpacity>

									<TouchableOpacity
										onPress={() => this.setState({ timeVisibility: true })}
										style={[ styles.button, { backgroundColor: 'white', width: 200 } ]}
									>
										<Text style={[ styles.buttonText ]}>{'Select Time'}</Text>
									</TouchableOpacity>
								</View>
							)}

							{dateVisibility && (
								<DatePicker
									style={{ width: 200 }}
									value={new Date(date)}
									mode="date"
									display="spinner"
									placeholder="Select Date"
									minDate={new Date()}
									confirmBtnText="Confirm"
									cancelBtnText="Cancel"
									onChange={(e, date) => {
										this.setState({ date: date, timeVisibility: true, dateVisibility: false });
									}}
								/>
							)}

							{timeVisibility && (
								<DatePicker
									style={{ width: 200 }}
									value={new Date(time)}
									mode="time"
									display="spinner"
									placeholder="Select Time"
									minDate={new Date()}
									confirmBtnText="Confirm"
									cancelBtnText="Cancel"
									onChange={(e, time) => {
										this.setState({ time: time, timeVisibility: false });
									}}
								/>
							)}

							<Text style={[ styles.text, styles.deadlineText ]}>
								{`Due on ${new Date(deadline).toLocaleString()}`}
							</Text>

							{editable && (
								<TouchableOpacity style={[ styles.button ]} onPress={() => this.updateTask()}>
									<Text style={[ styles.buttonText, { color: color } ]}>Done</Text>
								</TouchableOpacity>
							)}

							<View>
								<Text style={[ styles.heading, styles.text ]}>Task History</Text>

								{taskHistory.map((t) => (
									<View>
										<Text style={[ styles.text, styles.tasksHistoryHeading ]}>{t.progress}</Text>
										<Text style={[ styles.text, styles.tasksHistorySub ]}>{t.created_at}</Text>
									</View>
								))}
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
	textBox: {
		width: '90%',
		height: 170,
		backgroundColor: 'white',
		alignSelf: 'center',
		marginTop: 20,
		borderRadius: 10,
		paddingHorizontal: 10,
		textAlignVertical: 'top',
		paddingTop: 10,
		paddingBottom: 10
	},
	doneButton: {
		backgroundColor: 'white',
		borderRadius: 10,
		width: 160,
		height: 40,
		alignSelf: 'center',
		marginTop: 10,
		padding: 10,
		justifyContent: 'center'
	},
	doneText: {
		textAlign: 'center',
		fontWeight: 'bold'
	},
	heading: {
		fontWeight: 'bold',
		fontSize: 18,
		marginTop: 20,
		marginBottom: 10
	},
	tasksHistoryHeading: {
		fontSize: 16,
		fontWeight: '600'
	},
	tasksHistorySub: {
		fontSize: 16,
		marginBottom: 10
	},
	button: {
		backgroundColor: 'white',
		borderRadius: 10,
		justifyContent: 'center',
		width: 100,
		padding: 10,
		marginTop: 10,
		alignSelf: 'center'
	},
	buttonText: {
		textAlign: 'center',
		fontWeight: '700'
	},
	deadlineText: {
		marginTop: 10,
		fontWeight: '500'
	}
});
