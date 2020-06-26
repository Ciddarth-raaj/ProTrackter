import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, Text, View } from 'react-native';

import Colors from '../../constants/colors';
import Styles from '../../constants/styles';


export default class Phone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: ''
        };
    }

    handlePress = () => {
        this.props.navigation.navigate('Otp');
    }

    render() {
        const { phone } = this.state;
        return (
            <>
                <SafeAreaView style={{ backgroundColor: Colors.notificationBar }} />
                <View
                    style={{
                        backgroundColor: Colors.background,
                        flex: 1,
                        justifyContent: 'center',
                    }}>

                    <View style={{ width: '80%', alignSelf: 'center' }}>

                        <TextInput
                            placeholder={'Enter Phone Number'}
                            style={Styles.inputBox}
                            placeholderTextColor={'white'}
                            autoCompleteType={'tel'}
                            onChangeText={(t) => this.setState({ phone: t })}
                            value={phone}
                            selectionColor={'white'}
                            maxLength={10}
                            keyboardType='numeric'
                        />

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.handlePress()}>
                            <Text style={styles.buttonText}>{"Continue"}</Text>
                        </TouchableOpacity>

                    </View>

                </View>
                <SafeAreaView style={{ backgroundColor: Colors.background }} />
            </>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.orange,
        borderRadius: 10,
        padding: 15,
        width: 150,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        textAlign: 'center',
    },
});
