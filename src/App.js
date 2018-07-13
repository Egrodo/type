import React, { Component } from 'react';
import View from './components/View';
import Input from './components/Input';
import './css/App.css';

/*
  Typing test
      TIMER
      VIEW
      INPUT | RESET

      SCORE INFO
  end
  This app container will do the management of the wpm calculation and such.
*/
class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>WPM TEST</h1>
        <View />
        <Input />
      </div>
    );
  }
}

export default App;
