import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';

import Colors from '../constants/colors';
import Styles from '../constants/styles';

export default function Header(props) {
    const { image, isBack, navigation } = props;
    const [name, setName] = React.useState('');

    const date = new Date().toDateString();

    getName = async () => {
        let fName = await AsyncStorage.getItem('firstName');
        let lName = await AsyncStorage.getItem('lastName');

        setName(fName);
    }

    getName();

    return (
        <View style={{ flexDirection: 'row' }}>
            {
                isBack &&
                <TouchableOpacity onPress={() => navigation.pop()} style={{ alignSelf: 'center', marginRight: 10 }}>
                    <Image source={require("../assests/back.png")} style={styles.backButton} />
                </TouchableOpacity>
            }
            <Image source={require('../assests/placeholderProfile.jpg')} style={styles.image} />
            <View style={{ justifyContent: 'center', marginLeft: 20 }}>
                <Text style={[styles.name, { marginBottom: 5 }]}>{`Hi, ${name}`}</Text>
                <Text style={styles.date}>{date}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 80,
        height: 80,
        borderRadius: 50
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 15,
        color: Colors.grey
    },
    backButton: {
        width: 20,
        height: 20,
    }
});
