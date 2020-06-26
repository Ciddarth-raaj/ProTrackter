import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

global.token = null;

import Splash from './screens/Splash';

import Tasks from './screens/User/Tasks';
import Home from './screens/User/Home';
import Login from './screens/User/Login';
import Menu from './screens/User/Menu';

import AdminHome from './screens/Admin/Home';
import AdminProjects from './screens/Admin/Projects';
import AdminTasks from './screens/Admin/Tasks';
import AdminUsers from './screens/Admin/Users';

import Settings from './screens/Settings';

import Otp from './screens/ForgotPassword/Otp';
import Phone from './screens/ForgotPassword/Phone';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <NavigationContainer ref={this.navRef}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdminHome"
          component={AdminHome}
          options={{ headerShown: false }}
        />

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

        <Stack.Screen
          name="AdminTasks"
          component={AdminTasks}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="AdminProjects"
          component={AdminProjects}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="AdminUsers"
          component={AdminUsers}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Otp"
          component={Otp}
          options={{ headerTitle: 'Forgot Password' }}
        />

        <Stack.Screen
          name="Phone"
          component={Phone}
          options={{ headerTitle: 'Forgot Password' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyStack;
