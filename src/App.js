import React, { Component } from 'react';
import View from './components/View';
import UserInterface from './components/UserInterface';
import Results from './components/Results';
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
      count: a count of how many words we've loaded so far.
      cursor: the index (on the first row/arr) of the word we're currently working with.
      active: a ternary where 0: active & untouched, 1: active & correct, 2: active & incorrect.
    */
    this.state = {
      wordList: [
        [],
        [],
      ],
      count: 0,
      cursor: 0,
      active: 0,
      correctWords: 0,
      incorrectWords: 0,
      correctChars: 0,
      incorrectChars: 0,
      completed: false,
    };

    this.onType = this.onType.bind(this);
    this.finish = this.finish.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    // When the component first mounts generate two rows of random words.
    this.setState({ wordList: wordP.init(12) });

    // Listener to capture F5 and handle 10ff style.
    document.addEventListener('keydown', ((e) => {
      if (e.key === 'F5') {
        e.preventDefault();
        this.refresh();
      }
    }), false);
  }

  // Handle change at Controller level in order to compare against correct.
  async onType(word, submit = false) {
    const {
      wordList,
      cursor,
      correctWords,
      incorrectWords,
      correctChars,
      incorrectChars,
    } = this.state;
    const correctWord = wordList[0][cursor];

    // If the input was a spacebar submit the word.
    if (submit) {
      // I'm counting the length of the words for each correct / incorrect plus one for the space.
      if (correctWord === word) {
        await this.setState({
          correctChars: (correctChars + word.length) + 1,
          correctWords: correctWords + 1,
          active: 1,
        });
      } else {
        await this.setState({
          incorrectChars: (incorrectChars + correctWord.length) + 1,
          incorrectWords: incorrectWords + 1,
          active: 2,
        });
      }

      // Check if we're at the end of the row.
      if ((cursor + 1) === wordList[0].length) {
        const newList = [wordList[1], wordP.newRow(12)];
        this.setState({ wordList: newList, cursor: 0 });
        this.setState(prevState => ({ count: prevState.count + 12 }));
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
      cursor: 0,
      count: 0,
      active: 0,
      correctWords: 0,
      incorrectWords: 0,
      correctChars: 0,
      incorrectChars: 0,
    });
  }

  finish() {
    // On finish, save the results to a separate obj and display them.
    const {
      correctWords,
      incorrectWords,
      correctChars,
      incorrectChars,
    } = this.state;

    this.setState({
      completed: {
        correctWords,
        incorrectWords,
        correctChars,
        incorrectChars,
      },
    });
  }

  render() {
    const {
      wordList,
      count,
      cursor,
      active,
      completed,
    } = this.state;

    return (
      <div className="App">
        <h1>Ten-Type <span className="version">(beta)</span></h1>
        <View wordList={wordList} cursor={cursor} active={active} count={count} />
        <UserInterface onType={this.onType} refresh={this.refresh} finish={this.finish} />
        {completed ? <Results data={completed} /> : ''}
        <p className="credits">
          Made by
          <a href="https://github.com/Egrodo" target="_blank" rel="noopener noreferrer">
            Noah Yamamoto
          </a>
          .
        </p>
      </div>
    );
  }
}

export default App;
