import React from 'react';
import { StyleSheet, Dimensions, View, Text, Image, TouchableOpacity } from 'react-native';

// import Colors from '../constants/colors';
// import Styles from '../constants/styles';

export default function HomeCard(props) {
    const { lightColor, color, image, title, notificationCount, id } = props;

    return (
        <TouchableOpacity>
            <View style={[styles.mainLayout, { backgroundColor: lightColor }]}>
                <View style={styles.notificationWrapper}>
                    <Text style={styles.notificationText}>{notificationCount}</Text>
                </View>
                <View>
                    <View style={[styles.imageWrapper, { backgroundColor: color }]}>
                        <Image source={image} style={styles.image} />
                    </View>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    mainLayout: {
        width: Dimensions.get('screen').width / 2 - 40,
        height: Dimensions.get('screen').width / 2 - 40,
        borderRadius: 15,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 55,
        height: 55
    },
    imageWrapper: {
        borderRadius: 50,
        width: 90,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    title: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        fontSize: 20
    },
    notificationText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    notificationWrapper: {
        backgroundColor: 'red',
        width: 30,
        height: 30,
        justifyContent: 'center',
        borderRadius: 15,
        position: 'absolute',
        right: -10,
        top: -10
    }
});
