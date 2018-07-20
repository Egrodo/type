import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import Word from './Word';
import '../css/View.css';

class View extends Component {
  // Handle cursor and active here?
  constructor(props) {
    super(props);

    this.state = {
      cursor: 0,
      active: 0,
      count: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { cursor, active, count } = nextProps;
    this.setState({ cursor, active, count });
    // Highlight cursor and if correct / incorrect display such.
  }

  render() {
    // TODO: Describe ternary to sort active word.
    // The view rerenders every time you type in order to properly display the word correct/incorrectness.
    const { wordList } = this.props;
    const { cursor, active, count } = this.state;
    return (
      <Container className="View">
        <section className="rowContainer">
          <section className="row">
            {wordList[0].map(((word, i) => (cursor <= i ? (
              cursor === i ? (<Word word={word} key={count + i} active={active} />) : (
                <Word word={word} key={count + i} active={3} />
              )
            ) : <Word word={word} key={count + i} />)
            ))}
          </section>
          <section className="row">
            {wordList[1].map(((word, i) => <Word word={word} key={count + i + 12} />))}
          </section>
        </section>
      </Container>
    );
  }
}

View.propTypes = {
  wordList: PropTypes.arrayOf(PropTypes.array),
  count: PropTypes.number,
  cursor: PropTypes.number,
  active: PropTypes.number,
};

View.defaultProps = {
  wordList: [['ERROR'], ['WORDLIST NOT PASSED TO VIEW COMPONENT']],
  count: 0,
  cursor: 0,
  active: 0,
};

export default View;
