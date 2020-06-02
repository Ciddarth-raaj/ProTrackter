import React from 'react';
import { StatusBar } from 'react-native';

import Tasks from './screens/Tasks';
import Home from './screens/Home';

function App() {
  return (
    <>
      <StatusBar backgroundColor='#FFFFFF' barStyle='dark-content' />
      <Home />
    </>
  )
}

export default App;