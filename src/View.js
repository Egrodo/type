import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import Word from './Word';
import wordP from './wordProcessing';
import './View.css';

/*
  One strategy:
    I can keep generating words until the scrollHeight >== clientHeight.
    Problem there is that I'll need a static height.
*/
class View extends Component {
  constructor() {
    super();
    this.state = {
      wordList: [
        [],
        [],
      ],
    };

    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    // When the component first mounts (or if refreshed), generate two rows.
    // Gonna have to keep track of the cursor.
    this.setState({ wordList: wordP.init(12) });
  }

  loadMore() {
    // Replace first row with second, generate new second row.
    const wordList = [];
    wordList[0] = this.state.wordList[1];
    wordList[1] = wordP.newRow(12);
    this.setState({ wordList });
  }

  render() {
    const { wordList } = this.state;
    return (
      <Container className="View" onClick={this.loadMore}>
        <section className="row">
          {wordList[0].map((word => <Word word={word} />))}
        </section>
        <section className="row">
          {wordList[1].map((word => <Word word={word} />))}
        </section>
      </Container>
    );
  }
}

export default View;
