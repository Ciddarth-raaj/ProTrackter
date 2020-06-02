import React from 'react';

import Home from './screens/Home';
import { StatusBar } from 'react-native';

function App() {
  return (
    <>
      <StatusBar backgroundColor='#FFFFFF' barStyle='dark-content' />
      <Home />
    </>
  )
}

export default App;