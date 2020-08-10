import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, Image, TextInput, ScrollView, Picker } from 'react-native';
import moment from 'moment';
import DatePicker from '@react-native-community/datetimepicker';

import Colors from '../../constants/colors';
import API from '../../api';

const DATE_FORMAT = 'DD-MM-YYYY hh:mm:ss';

export default function AddTaskModal(props) {
	const { visible, setVisible, projectId, users, getTasks } = props;
	const [ title, setTitle ] = React.useState('');
	const [ description, setDescription ] = React.useState('');
	const [ userId, setUserId ] = React.useState(0);
	const [ date, setDate ] = React.useState(new Date());
	const [ time, setTime ] = React.useState(new Date());

	const [ dateVisibility, setDateVisibility ] = React.useState(false);
	const [ timeVisibility, setTimeVisibility ] = React.useState(false);

	handleCreateProject = () => {
		if (title === '' || description === '' || userId === 0) {
			alert('Enter All Fields to Continue');
		} else {
			let dateObj = new Date(moment(date).format('YYYY-MM-DD') + 'T' + moment(time).format('hh:mm:ss'));
			createTask(title, description, projectId, userId, dateObj);
		}
	};

	createTask = (title, description, projectId, userId, deadline) => {
		const body = {
			title: title,
			description: description,
			projectId: projectId,
			userId: userId
		};

		if (deadline) {
			body.deadlineAt = moment(deadline, DATE_FORMAT).toDate();
		}

		API.post('/task', body)
			.then(async (res) => {
				console.log(res.data);
				if (res.data.code === 200) {
					setTitle('');
					setDescription('');
					setUserId(0);
					setDate(new Date());
					setTime(new Date());
					alert('Successfully Created');
					getTasks();
					// setVisible(false);
				} else {
					alert(res.data.msg);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

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

				<View style={[ styles.container ]}>
					<TouchableOpacity style={styles.crossButton} onPress={() => setVisible(false)}>
						<Image source={require('../../assests/cross_black.png')} style={{ width: 15, height: 15 }} />
					</TouchableOpacity>

					<ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
						<View
							style={{
								marginTop: 50,
								marginBottom: 20,
								alignSelf: 'center',
								width: '90%'
							}}
						>
							<Text style={styles.heading}>Create Task</Text>

							<TextInput
								placeholder={'Task Title'}
								style={styles.inputBox}
								placeholderTextColor={'white'}
								value={title}
								onChangeText={setTitle}
							/>

							<TextInput
								placeholder={'Description'}
								style={[ styles.inputBox, { height: 260, paddingTop: 20 } ]}
								placeholderTextColor={'white'}
								multiline={true}
								value={description}
								onChangeText={setDescription}
							/>

							<Picker selectedValue={userId} itemStyle={styles.inputBox} onValueChange={setUserId}>
								{users.map((u) => <Picker.Item label={u.name} value={u.id} />)}
							</Picker>

							<View style={{ alignItems: 'center', marginBottom: 15 }}>
								<TouchableOpacity
									onPress={() => setDateVisibility(true)}
									style={[
										styles.button,
										{ backgroundColor: Colors.blue, width: 200, marginBottom: 10 }
									]}
								>
									<Text style={[ styles.buttonText ]}>{'Select Date'}</Text>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={() => setTimeVisibility(true)}
									style={[ styles.button, { backgroundColor: Colors.blue, width: 200 } ]}
								>
									<Text style={[ styles.buttonText ]}>{'Select Time'}</Text>
								</TouchableOpacity>

								<Text style={{ marginTop: 10, fontWeight: 'bold' }}>
									{'Selected Time : '}
									<Text style={{ fontWeight: 'normal' }}>
										{moment(date).format('DD-MM-YYYY') + ' - ' + moment(time).format('hh:mm')}
									</Text>
								</Text>

								{dateVisibility && (
									<DatePicker
										style={{ width: 200 }}
										value={date}
										mode="date"
										display="spinner"
										placeholder="Select Date"
										minimumDate={new Date()}
										confirmBtnText="Confirm"
										cancelBtnText="Cancel"
										onChange={(e, date) => {
											setDateVisibility(false);
											setDate(date);
										}}
									/>
								)}

								{timeVisibility && (
									<DatePicker
										style={{ width: 200 }}
										value={time}
										mode="time"
										display="spinner"
										placeholder="Select Time"
										minimumDate={new Date()}
										confirmBtnText="Confirm"
										cancelBtnText="Cancel"
										onChange={(e, time) => {
											setTimeVisibility(false);
											setTime(time);
										}}
									/>
								)}
							</View>

							<TouchableOpacity style={styles.button} onPress={() => handleCreateProject()}>
								<Text style={styles.buttonText}>Create</Text>
							</TouchableOpacity>
						</View>
					</ScrollView>
				</View>
			</View>
		</Modal>
	);
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
		backgroundColor: 'white'
	},
	crossButton: {
		position: 'absolute',
		top: 15,
		right: 20,
		zIndex: 100
	},
	inputBox: {
		width: '100%',
		borderRadius: 10,
		backgroundColor: Colors.blue,
		marginBottom: 10,
		color: 'white',
		paddingHorizontal: 20,
		paddingVertical: 10,
		height: 50
	},
	button: {
		backgroundColor: Colors.orange,
		borderRadius: 10,
		padding: 15,
		width: 100,
		justifyContent: 'center',
		alignSelf: 'center'
	},
	buttonText: {
		color: 'white',
		fontWeight: '700',
		textAlign: 'center'
	},
	heading: {
		fontSize: 25,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 20
	}
});
