import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import Word from './Word';
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
      wordCount: 0,
    };
  }

  componentDidMount() {
    // When the component first mounts (or if refreshed), generate two rows.
    // TODO: Generate all this randomly.
    // Modularize this.
    const words = ['America', 'happy', 'eat', 'carry', 'to', 'list', 'when', 'when', 'page', 'earth', 'letter', 'which', 'found', 'later', 'saw', 'four', 'why', 'or', 'same', 'sentence'];
    const row1 = words.slice(0, 10);
    const row2 = words.slice(10, words.length);
    this.setState({ wordList: [row1, row2] });
  }

  loadMore() {
    // Delete the first row, keep generating more until condition hit.
  }

  render() {
    const { wordList, wordCount } = this.state;
    return (
      <Container className="View" id="TEST">
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
