import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import colors from '../../constants/colors';

export default function Header(props) {

    const { id, title, description, color, navigation } = props;

    return (
        <TouchableOpacity
            style={{ width: '100%' }}
            onPress={() => navigation.navigate("AdminTasks", { id: id })}>

            <View style={[styles.container, { backgroundColor: color }]}>
                <View>
                    <Text style={[styles.containerText, styles.title]} >{title}</Text>
                    <Text style={[styles.containerText, styles.description]} >{description}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 10,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
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
});
