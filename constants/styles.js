import { StyleSheet } from 'react-native';
import Colors from './colors';

export default styles = StyleSheet.create({
    headingText: {
        fontWeight: 'bold',
        fontSize: 30
    },
    tasksWrapper: {
        alignItems: 'center',
    },
    filterTitle: {
        fontSize: 16,
    },
    filterText: {
        fontSize: 16,
        marginLeft: 5,
        fontWeight: 'bold'
    },
    inputBox: {
        width: '100%',
        borderRadius: 10,
        backgroundColor: Colors.blue,
        marginBottom: 10,
        color: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        height: 50,
    },
})