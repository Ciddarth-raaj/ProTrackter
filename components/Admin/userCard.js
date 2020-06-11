import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Header(props) {
    const { id, name, tasks, color } = props;
    const [visible, setVisible] = React.useState(false);

    return (
        <TouchableOpacity
            style={{ width: '100%' }}
            onPress={() => setVisible(true)}>

            <View style={[styles.container, { backgroundColor: color }]}>
                <Image source={require('../../assests/expand.png')} style={styles.expandImage} />
                <Text style={[styles.containerText, styles.name]}>{name}</Text>
                <View style={styles.countCircle}>
                    <Text style={[styles.countText, { color: color }]}>{tasks.length}</Text>
                </View>
            </View>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 10,
        padding: 30,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    containerText: {
        color: 'white',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 18
    },
    expandImage: {
        position: 'absolute',
        top: 5,
        right: 5,
        width: 20,
        height: 20,
    },
    countCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        position: 'absolute',
        right: 30,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    countText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    }
});
