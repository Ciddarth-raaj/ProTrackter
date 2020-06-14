import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';

import UserModal from './userModal';

export default function Header(props) {
  const {id, name, role, color, type, activeTasksCount, status} = props;
  const [visible, setVisible] = React.useState(false);

  return (
    <TouchableOpacity
      style={{width: '100%'}}
      onPress={() => type != 'modal' && setVisible(true)}
      activeOpacity={type != 'modal' ? 0.5 : 1}>
      <UserModal
        visible={visible}
        setVisible={setVisible}
        color={color}
        id={id}
        name={name}
        activeTasksCount={activeTasksCount}
      />

      <View
        style={[
          styles.container,
          {backgroundColor: color},
          type === 'modal' && {paddingHorizontal: 0},
        ]}>
        {type != 'modal' && (
          <Image
            source={require('../../assests/expand.png')}
            style={styles.expandImage}
          />
        )}
        <View>
          <Text style={[styles.containerText, styles.name]}>{name}</Text>
          <Text style={[styles.containerText, styles.status]}>{status}</Text>
        </View>
        <View style={styles.countCircle}>
          <Text style={[styles.countText, {color: color}]}>
            {activeTasksCount}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 10,
    padding: 25,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  containerText: {
    color: 'white',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  status: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  expandImage: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 20,
    height: 20,
  },
  countCircle: {
    width: 50,
    height: 50,
    borderRadius: 30,
    position: 'absolute',
    right: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  countText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
