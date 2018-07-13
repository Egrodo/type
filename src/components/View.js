import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import Word from './Word';
import wordP from '../wordProcessing';
import '../css/View.css';

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
    const { wordList } = this.state;
    const newList = [wordList[1], wordP.newRow(12)];
    this.setState({ wordList: newList });
  }

  render() {
    // We're passing down the index for later highlighting.
    const { wordList } = this.state;
    return (
      <Container className="View" onClick={this.loadMore}>
        <section className="row">
          {wordList[0].map(((word, i) => <Word word={word} index={i} />))}
        </section>
        <section className="row">
          {wordList[1].map((word => <Word word={word} />))}
        </section>
      </Container>
    );
  }
}

export default View;
