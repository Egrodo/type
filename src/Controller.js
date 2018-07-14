import React, { Component } from 'react';
import View from './components/View';
import UserInterface from './components/UserInterface';
import Results from './components/Results';
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
      finalScore: 0,
    };

    this.onType = this.onType.bind(this);
    this.finish = this.finish.bind(this);
    this.refresh = this.refresh.bind(this);
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

    // If the input was a spacebar submit the word.
    if (submit) {
      // I'm counting the length of the words for each correct / incorrect.
      // This method isn't entirely accurate (won't count the last word if someone is halfway thru one when timer ends).
      if (correctWord === word) {
        await this.setState({ correct: (correct + word.length), active: 1 });
      } else {
        await this.setState({ incorrect: (incorrect + word.length), active: 2 });
      }
      // Check if we're at the end of the row.
      if ((cursor + 1) === wordList[0].length) {
        const newList = [wordList[1], wordP.newRow(12)];
        this.setState({ wordList: newList, cursor: 0 });
      } else {
        await this.setState({ cursor: cursor + 1 });
        this.setState({ active: 0 });
      }
    } else if (correctWord.indexOf(word) === 0) {
      // Else if we're not submitting but it's still correct so far.
      this.setState({ active: 1 });
    } else {
      // Else if we're not submitting and it's not correct so far.
      this.setState({ active: 2 });
    }
  }

  refresh() {
    this.setState({
      wordList: wordP.init(12),
      correct: 0,
      incorrect: 0,
      cursor: 0,
      active: 0,
    });
  }

  finish() {
    // Function to be invoked at the end of the timer.
    const { correct } = this.state;
    const finalScore = Math.round(correct / 5);
    this.setState({ finalScore });
  }

  render() {
    const {
      wordList,
      cursor,
      active,
      correct,
      incorrect,
      finalScore,
    } = this.state;
    return (
      <div className="Controller">
        <h1>WPM TEST</h1>
        <View wordList={wordList} cursor={cursor} active={active} />
        <br />
        <UserInterface onType={this.onType} refresh={this.refresh} finish={this.finish} />
        <div>
          {finalScore ? <Results data={{ correct, incorrect, finalScore }} /> : ''}
        </div>
      </div>
    );
  }
}

export default App;
