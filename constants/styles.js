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
    }
});