import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

import colors from '../constants/colors';
import BottomMenu from '../util/bottomMenu';
import API from '../api';

export default function Header(props) {

    const { id, color, navigation, title, description } = props;

    return (
        <TouchableOpacity
            style={{ width: '100%' }}
            onPress={() => navigation.navigate("AllTasks", { id: id, title: title })}>

            <View style={[styles.container, { backgroundColor: color }]}>
                <Text style={[styles.containerText, styles.title]} >{title}</Text>
                <Text style={[styles.containerText, styles.description]} >{description}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        flex: 1
    },
    containerText: {
        color: 'white',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18
    },
    description: {
        fontWeight: '500',
        fontSize: 14,
        marginTop: 10
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
    }
});
