import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Tasks from './screens/Tasks';
import Home from './screens/Home';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <NavigationContainer ref={this.navRef}>
      <StatusBar backgroundColor='#FFFFFF' barStyle='dark-content' />
      <Stack.Navigator>

        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Tasks"
          component={Tasks}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyStack;