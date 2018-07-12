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
  }

  componentDidMount() {
    // When the component first mounts (or if refreshed), generate two rows.
    // Gonna have to keep track of the cursor.
    this.setState({ wordList: wordP.init(11) });
  }

  loadMore() {
    // Delete the first row, keep generating more until condition hit.
  }

  render() {
    const { wordList } = this.state;
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
