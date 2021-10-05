import React from 'react';
import Lists from './components/Lists';
import Main from './components/Main';
import Pad from './components/Pad';
import './App.css';

function App() {
  return (
    <>
      <Main>
        <Lists />
      </Main>
      <Pad />
    </>
  );
}

export default App;
