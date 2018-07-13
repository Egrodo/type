import React, { Component } from 'react';
import View from './components/View';
import Input from './components/TextInput';
import wordP from './wordProcessing';
import './css/App.css';

/*
  Typing test
      TIMER
      VIEW
      INPUT | RESET

      SCORE INFO
  end
  This app container will handle the management of the wpm calculation and such.
  View contains the logic, move that to here so we can control everything.
*/
class App extends Component {
  constructor() {
    super();

    /*
      wordList: a 2d array wherein each array represents a visual row.
      cursor: the index (on the first row/arr) of the word we're currently working with.
      active: a ternary system representing: 0: active (but untouched), 1: active and correct, 2: active and incorrect.
    */
    this.state = {
      wordList: [
        [],
        [],
      ],
      cursor: 0,
      active: 0,
    };

    this.loadMore = this.loadMore.bind(this);
    this.onType = this.onType.bind(this);
  }

  componentDidMount() {
    // When the component first mounts generate two rows of random words.
    this.setState({ wordList: wordP.init(12) });
  }

  // Handle change at Controller level in order to compare against correct.
  onType(word, submit = false) {
    // TODO: Handle row moving up.

    const { wordList, cursor } = this.state;
    const correctWord = wordList[0][cursor];


    if (correctWord.includes(word)) {
      this.setState({ active: 1 });
    } else this.setState({ active: 2 });

    if (submit) {
      // On submit, compare the words and count score, then increment index.
      if (correctWord === word) {
        console.log('Correct!');
      } else console.log('Incorrect!');

      this.setState({ cursor: cursor + 1 });
    }
  }

  loadMore() {
    // Replace first row with second, generate new second row.
    const { wordList } = this.state;
    const newList = [wordList[1], wordP.newRow(12)];
    this.setState({ wordList: newList, cursor: 0 });
  }

  render() {
    const { wordList, cursor, active } = this.state;
    return (
      <div className="App">
        <h1>WPM TEST</h1>
        <View wordList={wordList} loadMore={this.loadMore} cursor={cursor} active={active} />
        <Input onType={this.onType} />
      </div>
    );
  }
}

export default App;
