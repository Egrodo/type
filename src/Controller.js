import React, { Component } from 'react';
import View from './components/View';
import TextInput from './components/TextInput';
import Timer from './components/Timer';
import wordP from './wordProcessing';
import './css/Controller.css';

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
      active: a ternary where 0: active & untouched, 1: active & correct, 2: active & incorrect.
    */
    this.state = {
      wordList: [
        [],
        [],
      ],
      cursor: 0,
      active: 0,
      correct: 0,
      incorrect: 0,
    };

    this.onType = this.onType.bind(this);
  }

  componentDidMount() {
    // When the component first mounts generate two rows of random words.
    this.setState({ wordList: wordP.init(12) });
  }

  // Handle change at Controller level in order to compare against correct.
  async onType(word, submit = false) {
    const {
      wordList,
      cursor,
      correct,
      incorrect,
    } = this.state;
    const correctWord = wordList[0][cursor];

    // If the input was a spacebar, submit the word.
    if (submit) {
      // TODO: If space pressed before the word is finished, it's incorrect.
      if (correctWord === word) {
        await this.setState({ correct: correct + 1, active: 1 });
      } else {
        await this.setState({ incorrect: incorrect + 1, active: 2 });
      }
      // Check if we're at the end of the row.
      if ((cursor + 1) === wordList[0].length) {
        console.log('new row');
        const newList = [wordList[1], wordP.newRow(12)];
        this.setState({ wordList: newList, cursor: 0 });
      } else {
        await this.setState({ cursor: cursor + 1 });
        this.setState({ active: 0 });

      }
    } else if (correctWord.indexOf(word) === 0) {
      // Otherwise if we're not submitting, check if correct so far.
      this.setState({ active: 1 });
    } else this.setState({ active: 2 });
  }

  render() {
    const {
      wordList,
      cursor,
      active,
      correct,
      incorrect,
    } = this.state;
    return (
      <div className="Controller">
        <h1>WPM TEST</h1>
        <View wordList={wordList} cursor={cursor} active={active} />
        <br />
        <TextInput onType={this.onType} />
        <Timer />
        <div>Correct:{correct} Incorrect: {incorrect}</div>
      </div>
    );
  }
}

export default App;
