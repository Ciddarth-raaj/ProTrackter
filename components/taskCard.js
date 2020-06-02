import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

import TaskModal from '../components/taskModal';

export default function Header(props) {
    const statusImage = {
        1: require('../assests/hourglass.png'),
        2: require('../assests/Tick.png'),
        3: require('../assests/hourglass_red.png')
    };
    const { title, product, assignee, color, status, type, description, taskHistory } = props;
    const [visible, setVisible] = React.useState(false);

    return (
        <TouchableOpacity
            onPress={() => type != 'modal' && setVisible(true)}>

            <TaskModal
                visible={visible}
                setVisible={setVisible}
                color={color}
                title={title}
                product={product}
                assignee={assignee}
                description={description}
                taskHistory={taskHistory}
                status={status}
            />

            <View style={[styles.container, { backgroundColor: color }, type == 'modal' && { padding: 0 }]}>
                {
                    type != 'modal' && <Image source={require('../assests/expand.png')} style={styles.expandImage} />
                }
                <View style={{ paddingRight: 80 }}>
                    <Text numberOfLines={type == 'modal' ? 0 : 1} style={[styles.title, styles.containerText]}>{title}</Text>
                    <Text style={[styles.product, styles.containerText]}>{product}</Text>
                    <Text style={[styles.assignee, styles.containerText, { marginBottom: 0 }]}>{assignee}</Text>
                </View>
                <View style={styles.imageWrapper}>
                    <Image source={statusImage[status]} style={styles.image} />
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
        marginBottom: 5
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18
    },
    product: {
        fontWeight: '500',
        fontSize: 14
    },
    assignee: {
        fontWeight: '300',
        fontSize: 14
    },
    image: {
        width: 40,
        height: 40
    },
    imageWrapper: {
        width: 60,
        height: 60,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        position: 'absolute',
        right: 20
    },
    expandImage: {
        position: 'absolute',
        top: 5,
        right: 5,
        width: 20,
        height: 20
    }
});
