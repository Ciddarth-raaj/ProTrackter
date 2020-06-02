import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

import Colors from '../constants/colors';
import Styles from '../constants/styles';

export default function Header(props) {
    const { image, name } = props;

    const date = new Date().toDateString();

    return (
        <View style={{ flexDirection: 'row' }}>
            <Image source={{ uri: image }} style={styles.image} />
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
    }
});
