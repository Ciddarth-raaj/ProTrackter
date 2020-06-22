import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

import colors from '../../constants/colors';
import BottomMenu from '../../util/bottomMenu';

export default function Header(props) {

    const { id, color, navigation } = props;
    const [title, setTitle] = React.useState(props.title);
    const [description, setDescription] = React.useState(props.description);
    const [editable, setEditable] = React.useState(false);
    const [isOptionsVisible, setOptionsVisible] = React.useState(false);

    return (
        <TouchableOpacity
            style={{ width: '100%' }}
            onPress={() => navigation.navigate("AdminTasks", { id: id, title: title })}
            onLongPress={() => setOptionsVisible(true)}>

            <BottomMenu
                visible={isOptionsVisible}
                setVisible={setOptionsVisible}
                options={
                    [{ title: 'Edit', onPress: () => { setEditable(true); setOptionsVisible(false) } }]
                }
            />

            <View style={[styles.container, { backgroundColor: color }]}>

                {
                    editable
                        ?
                        <>
                            <TextInput style={[styles.containerText, styles.title]} value={title} selectionColor={'white'} onChangeText={v => setTitle(v)} />
                            <TextInput style={[styles.containerText, styles.description]} value={description} selectionColor={'white'} onChangeText={v => setDescription(v)} multiline />
                            <TouchableOpacity style={[styles.button]}
                                onPress={() => setEditable(false)}>
                                <Text style={[styles.buttonText, { color: color }]}>Done</Text>
                            </TouchableOpacity>
                        </>
                        :
                        <>
                            <Text style={[styles.containerText, styles.title]} >{title}</Text>
                            <Text style={[styles.containerText, styles.description]} >{description}</Text>
                        </>
                }
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
